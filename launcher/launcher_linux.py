"""
Flux Studio Launcher – Linux
Startet ComfyUI + Flux Studio (Next.js) und beendet alles sauber beim Schließen.
"""

import tkinter as tk
from tkinter import scrolledtext
import subprocess
import threading
import webbrowser
import socket
import signal
import time
import sys
import os
from pathlib import Path

# ── Konfiguration ─────────────────────────────────────────────────────────────
HOME         = Path.home()
COMFYUI_DIR  = os.environ.get("COMFYUI_DIR",  str(HOME / "ComfyUI"))
FLUX_DIR     = os.environ.get("FLUX_DIR",     str(Path(__file__).parent.parent))
COMFYUI_PORT = 8188
FLUX_PORT    = 3000
BROWSER_URL  = "http://localhost:3000"

# ── Farben (dunkles Theme passend zu Flux Studio) ────────────────────────────
BG          = "#0f0f0f"
BG_CARD     = "#1a1a1a"
BG_LOG      = "#111111"
FG          = "#e5e5e5"
FG_DIM      = "#6b7280"
GREEN       = "#22c55e"
RED         = "#ef4444"
YELLOW      = "#f59e0b"
BLUE        = "#3b82f6"
BTN_START   = "#16a34a"
BTN_START_H = "#15803d"
BTN_STOP    = "#b91c1c"
BTN_STOP_H  = "#991b1b"


# ── Hilfsfunktion: prüft ob ein Port offen ist ───────────────────────────────
def port_open(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", port)) == 0


def kill_proc(proc: subprocess.Popen, name: str):
    """Beendet einen Prozess inkl. aller Kindprozesse (POSIX)."""
    if proc and proc.poll() is None:
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
        except ProcessLookupError:
            pass
        except Exception:
            try:
                proc.kill()
            except Exception:
                pass


# ── Launcher-App ─────────────────────────────────────────────────────────────
class FluxLauncher:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.proc_comfyui: subprocess.Popen | None = None
        self.proc_flux:    subprocess.Popen | None = None
        self.running = False

        self._build_ui()
        self.root.protocol("WM_DELETE_WINDOW", self._on_close)

    # ── UI aufbauen ──────────────────────────────────────────────────────────
    def _build_ui(self):
        self.root.title("Flux Studio Launcher")
        self.root.configure(bg=BG)
        self.root.resizable(False, False)
        self.root.geometry("620x520")

        # Header
        header = tk.Frame(self.root, bg=BG, pady=18)
        header.pack(fill="x", padx=24)
        tk.Label(header, text="Flux Studio", font=("DejaVu Sans", 22, "bold"),
                 bg=BG, fg=FG).pack(side="left")
        tk.Label(header, text="Launcher", font=("DejaVu Sans", 22),
                 bg=BG, fg=FG_DIM).pack(side="left", padx=(6, 0))

        # Status-Karten
        card_frame = tk.Frame(self.root, bg=BG)
        card_frame.pack(fill="x", padx=24, pady=(0, 12))

        self.dot_comfy,   self.lbl_comfy   = self._status_row(card_frame, "ComfyUI")
        self.dot_flux,    self.lbl_flux    = self._status_row(card_frame, "Flux Studio")
        self.dot_browser, self.lbl_browser = self._status_row(card_frame, "Browser")

        self._set_status(self.dot_comfy,   self.lbl_comfy,   "Gestoppt", YELLOW
                         if port_open(COMFYUI_PORT) else RED,
                         "Läuft (extern)" if port_open(COMFYUI_PORT) else "Gestoppt")
        self._set_status(self.dot_flux,    self.lbl_flux,    "Gestoppt", RED)
        self._set_status(self.dot_browser, self.lbl_browser, "—",        FG_DIM)

        # Buttons
        btn_frame = tk.Frame(self.root, bg=BG)
        btn_frame.pack(fill="x", padx=24, pady=(4, 16))

        self.btn_start = self._button(btn_frame, "▶  Alles starten",
                                      BTN_START, BTN_START_H, self._start_all)
        self.btn_start.pack(side="left", padx=(0, 10))

        self.btn_stop = self._button(btn_frame, "■  Alles beenden",
                                     BTN_STOP, BTN_STOP_H, self._stop_all)
        self.btn_stop.pack(side="left")
        self.btn_stop.config(state="disabled")

        # Log
        log_frame = tk.Frame(self.root, bg=BG_CARD, bd=0)
        log_frame.pack(fill="both", expand=True, padx=24, pady=(0, 20))

        tk.Label(log_frame, text="Log", font=("DejaVu Sans", 9, "bold"),
                 bg=BG_CARD, fg=FG_DIM, anchor="w").pack(fill="x", padx=10, pady=(8, 2))

        self.log = scrolledtext.ScrolledText(
            log_frame, bg=BG_LOG, fg=FG_DIM, font=("Monospace", 9),
            bd=0, relief="flat", state="disabled", wrap="word",
            insertbackground=FG, selectbackground=BLUE)
        self.log.pack(fill="both", expand=True, padx=10, pady=(0, 10))

    def _status_row(self, parent, label: str):
        row = tk.Frame(parent, bg=BG_CARD, pady=10, padx=14)
        row.pack(fill="x", pady=3)
        dot = tk.Label(row, text="●", font=("DejaVu Sans", 14), bg=BG_CARD, fg=RED)
        dot.pack(side="left")
        tk.Label(row, text=label, font=("DejaVu Sans", 11, "bold"),
                 bg=BG_CARD, fg=FG, width=14, anchor="w").pack(side="left", padx=8)
        lbl = tk.Label(row, text="Gestoppt", font=("DejaVu Sans", 10),
                       bg=BG_CARD, fg=FG_DIM)
        lbl.pack(side="left")
        return dot, lbl

    def _button(self, parent, text, color, hover_color, command):
        btn = tk.Button(
            parent, text=text, command=command,
            bg=color, fg="white", activebackground=hover_color,
            activeforeground="white", relief="flat", bd=0, padx=18, pady=8,
            font=("DejaVu Sans", 10, "bold"), cursor="hand2")
        btn.bind("<Enter>", lambda e: btn.config(bg=hover_color))
        btn.bind("<Leave>", lambda e: btn.config(bg=color))
        return btn

    def _set_status(self, dot, lbl, text, color, label_text=None):
        dot.config(fg=color)
        lbl.config(text=label_text or text, fg=color if color != FG_DIM else FG_DIM)

    def _log(self, msg: str, color=None):
        def _write():
            self.log.config(state="normal")
            tag = f"color_{id(msg)}"
            self.log.tag_config(tag, foreground=color or FG_DIM)
            self.log.insert("end", msg + "\n", tag)
            self.log.see("end")
            self.log.config(state="disabled")
        self.root.after(0, _write)

    # ── Start ────────────────────────────────────────────────────────────────
    def _start_all(self):
        self.btn_start.config(state="disabled")
        self.running = True
        threading.Thread(target=self._launch_sequence, daemon=True).start()

    def _launch_sequence(self):
        # ComfyUI
        if port_open(COMFYUI_PORT):
            self._log("ComfyUI läuft bereits (externer Prozess).", YELLOW)
            self.root.after(0, lambda: self._set_status(
                self.dot_comfy, self.lbl_comfy, "Läuft (extern)", YELLOW))
        else:
            self._log(f"Starte ComfyUI aus: {COMFYUI_DIR}", FG)
            self.root.after(0, lambda: self._set_status(
                self.dot_comfy, self.lbl_comfy, "Startet …", YELLOW))
            try:
                self.proc_comfyui = subprocess.Popen(
                    ["python3", "main.py"],
                    cwd=COMFYUI_DIR,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT,
                    start_new_session=True,
                    text=True, encoding="utf-8", errors="replace")
                threading.Thread(
                    target=self._pipe_to_log,
                    args=(self.proc_comfyui, "ComfyUI"), daemon=True).start()

                # Auf Port warten (max. 120 s)
                for _ in range(240):
                    if port_open(COMFYUI_PORT):
                        break
                    time.sleep(0.5)

                if port_open(COMFYUI_PORT):
                    self._log("ComfyUI bereit.", GREEN)
                    self.root.after(0, lambda: self._set_status(
                        self.dot_comfy, self.lbl_comfy, "Läuft", GREEN))
                else:
                    self._log("ComfyUI antwortet nicht auf Port 8188.", RED)
                    self.root.after(0, lambda: self._set_status(
                        self.dot_comfy, self.lbl_comfy, "Fehler", RED))
            except Exception as e:
                self._log(f"ComfyUI Fehler: {e}", RED)
                self.root.after(0, lambda: self._set_status(
                    self.dot_comfy, self.lbl_comfy, "Fehler", RED))

        # Flux Studio
        self._log(f"Starte Flux Studio aus: {FLUX_DIR}", FG)
        self.root.after(0, lambda: self._set_status(
            self.dot_flux, self.lbl_flux, "Startet …", YELLOW))
        try:
            self.proc_flux = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=FLUX_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                start_new_session=True,
                text=True, encoding="utf-8", errors="replace")
            threading.Thread(
                target=self._pipe_to_log,
                args=(self.proc_flux, "Flux"), daemon=True).start()

            # Auf Port 3000 warten (max. 60 s)
            for _ in range(120):
                if port_open(FLUX_PORT):
                    break
                time.sleep(0.5)

            if port_open(FLUX_PORT):
                self._log("Flux Studio bereit.", GREEN)
                self.root.after(0, lambda: self._set_status(
                    self.dot_flux, self.lbl_flux, "Läuft", GREEN))

                # Browser öffnen
                self._log(f"Öffne Browser: {BROWSER_URL}", BLUE)
                self.root.after(0, lambda: self._set_status(
                    self.dot_browser, self.lbl_browser, BROWSER_URL, BLUE))
                webbrowser.open(BROWSER_URL)
            else:
                self._log("Flux Studio antwortet nicht auf Port 3000.", RED)
                self.root.after(0, lambda: self._set_status(
                    self.dot_flux, self.lbl_flux, "Fehler", RED))

        except Exception as e:
            self._log(f"Flux Studio Fehler: {e}", RED)
            self.root.after(0, lambda: self._set_status(
                self.dot_flux, self.lbl_flux, "Fehler", RED))

        self.root.after(0, lambda: self.btn_stop.config(state="normal"))

    def _pipe_to_log(self, proc: subprocess.Popen, prefix: str):
        """Liest stdout eines Prozesses und schreibt ins Log-Widget."""
        try:
            for line in proc.stdout:
                line = line.rstrip()
                if line:
                    self._log(f"[{prefix}] {line}")
        except Exception:
            pass

    # ── Stop ─────────────────────────────────────────────────────────────────
    def _stop_all(self):
        self.running = False
        self._log("Beende alle Prozesse …", YELLOW)

        kill_proc(self.proc_flux,    "Flux Studio")
        kill_proc(self.proc_comfyui, "ComfyUI")
        self._log("Flux Studio beendet.", FG_DIM)
        self._log("ComfyUI beendet.",     FG_DIM)
        self.proc_flux    = None
        self.proc_comfyui = None

        self.root.after(0, self._reset_ui)

    def _reset_ui(self):
        self._set_status(self.dot_comfy,   self.lbl_comfy,   "Gestoppt", RED)
        self._set_status(self.dot_flux,    self.lbl_flux,    "Gestoppt", RED)
        self._set_status(self.dot_browser, self.lbl_browser, "—",        FG_DIM)
        self.btn_start.config(state="normal")
        self.btn_stop.config(state="disabled")
        self._log("Alle Prozesse beendet.", GREEN)

    def _on_close(self):
        self._stop_all()
        time.sleep(0.5)
        self.root.destroy()


# ── Main ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    root = tk.Tk()
    app = FluxLauncher(root)
    root.mainloop()
