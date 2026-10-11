from __future__ import annotations

import shutil
import subprocess
import tempfile
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "apps" / "web" / "public" / "documents" / "edwin-rodriguez-hv.pdf"
RESUME_URL = "http://localhost:3100/hoja-de-vida"


def find_browser() -> Path:
    candidates = (
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    )
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("No se encontro Microsoft Edge o Google Chrome.")


def ensure_resume_is_available() -> None:
    with urllib.request.urlopen(RESUME_URL, timeout=15) as response:
        if response.status != 200:
            raise RuntimeError(f"La hoja de vida respondio con HTTP {response.status}.")


def build_pdf() -> None:
    ensure_resume_is_available()
    browser = find_browser()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    (ROOT / "tmp").mkdir(parents=True, exist_ok=True)

    profile_dir = Path(tempfile.mkdtemp(prefix="resume-pdf-", dir=ROOT / "tmp"))
    try:
        if OUTPUT.exists():
            OUTPUT.unlink()

        command = [
            str(browser),
            "--headless=new",
            "--disable-gpu",
            "--disable-software-rasterizer",
            "--no-sandbox",
            "--no-first-run",
            "--no-pdf-header-footer",
            "--print-to-pdf-no-header",
            "--run-all-compositor-stages-before-draw",
            "--virtual-time-budget=8000",
            f"--user-data-dir={profile_dir}",
            f"--print-to-pdf={OUTPUT}",
            RESUME_URL,
        ]
        result = subprocess.run(command, capture_output=True, text=True, timeout=45)
        if result.returncode != 0:
            raise RuntimeError(result.stderr.strip() or "El navegador no pudo generar el PDF.")
        if not OUTPUT.exists() or OUTPUT.stat().st_size < 10_000:
            raise RuntimeError("El PDF generado esta vacio o incompleto.")
    finally:
        shutil.rmtree(profile_dir, ignore_errors=True)

    print(OUTPUT)


if __name__ == "__main__":
    build_pdf()
