import { NextRequest } from "next/server";

const COMFYUI_WS = process.env.COMFYUI_WS_URL ?? "ws://127.0.0.1:8188";

export async function GET(req: NextRequest) {
  const promptId = req.nextUrl.searchParams.get("promptId");
  const clientId = req.nextUrl.searchParams.get("clientId");

  if (!promptId || !clientId) {
    return new Response("promptId und clientId erforderlich", { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const { default: WebSocket } = await import("ws");
      const ws = new WebSocket(`${COMFYUI_WS}/ws?clientId=${clientId}`);

      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          // Stream bereits geschlossen
        }
      };

      ws.on("open", () => {
        send({ type: "connected" });
      });

      ws.on("message", (raw) => {
        if (typeof raw !== "string" && !Buffer.isBuffer(raw)) return;
        try {
          const msg = JSON.parse(raw.toString());
          const relevant = [
            "executing",
            "progress",
            "execution_start",
            "execution_success",
            "execution_error",
            "execution_cached",
          ];
          if (relevant.includes(msg.type)) {
            send(msg);
            if (
              msg.type === "execution_success" &&
              msg.data?.prompt_id === promptId
            ) {
              ws.close();
              controller.close();
            }
            if (msg.type === "execution_error") {
              ws.close();
              controller.close();
            }
          }
        } catch {
          // Binäre Preview-Nachrichten ignorieren
        }
      });

      ws.on("error", (err) => {
        send({ type: "error", data: { message: err.message } });
        controller.close();
      });

      ws.on("close", () => {
        try {
          controller.close();
        } catch {
          // bereits geschlossen
        }
      });

      req.signal.addEventListener("abort", () => {
        ws.close();
        try {
          controller.close();
        } catch {
          // bereits geschlossen
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
