"""Renderiza a capa do e-book e a imagem de compartilhamento (og-image) a partir dos modelos HTML.
Uso (com o Playwright instalado):  python3 tools/render_assets.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
JOBS = [
    ("tools/templates/ebook-capa.html", "public/images/ebook-capa.png", (900, 1200)),
    ("tools/templates/og-image.html", "public/og-image.png", (1200, 630)),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for template, out, size in JOBS:
        page = browser.new_page(viewport={"width": size[0], "height": size[1]})
        page.goto((ROOT / template).as_uri())
        page.wait_for_load_state("networkidle")
        page.evaluate("document.fonts.ready")
        page.screenshot(path=str(ROOT / out), clip={"x": 0, "y": 0, "width": size[0], "height": size[1]})
        page.close()
        # PNG otimizado (cores chapadas comprimem muito bem)
        im = Image.open(ROOT / out).convert("RGB")
        im.save(ROOT / out, optimize=True)
        print(out, im.size, (ROOT / out).stat().st_size // 1024, "KB")
    browser.close()
