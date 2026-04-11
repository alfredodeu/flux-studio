import { useEffect, useRef } from "react";

export function useSSE(
  url: string | null,
  onMessage: (data: unknown) => void,
  onClose?: () => void
) {
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!url) return;

    const es = new EventSource(url);
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        onMessage(JSON.parse(e.data));
      } catch {
        // ignore
      }
    };

    es.onerror = () => {
      es.close();
      onClose?.();
    };

    return () => {
      es.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return () => esRef.current?.close();
}
