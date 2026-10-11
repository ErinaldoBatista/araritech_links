"""Gera os arquivos de logo/ícones a partir dos originais em design-source/."""
import numpy as np
from PIL import Image, ImageDraw

SRC = "design-source"
OUT = "public"
TEAL = (0, 144, 136)     # turquesa oficial do logo
GRAPHITE = (48, 48, 48)  # grafite oficial do logo
WHITE = (255, 255, 255)

def crop_alpha(im, pad=0):
    bbox = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    im = im.crop(bbox)
    if pad:
        canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
        canvas.paste(im, (pad, pad))
        return canvas
    return im

def recolor_neutral(im, color):
    """Troca os pixels neutros (grafite) por outra cor, mantendo o turquesa."""
    a = np.array(im).astype(np.int32)
    neutral = np.abs(a[..., 1] - a[..., 0]) < 25
    a[neutral, 0], a[neutral, 1], a[neutral, 2] = color
    return Image.fromarray(a.astype(np.uint8), "RGBA")

def white_to_alpha(im):
    """Remove o fundo branco do símbolo (original opaco), preservando as bordas suavizadas."""
    a = np.array(im.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    ratio = (g - r) / np.maximum(255 - r, 1)
    is_teal = ratio > 0.28
    alpha = np.where(is_teal, (255 - r) / 255.0, (255 - r) / (255.0 - GRAPHITE[0]))
    alpha = np.clip(alpha, 0, 1)
    out = np.zeros(a.shape[:2] + (4,), np.uint8)
    for mask, col in ((is_teal, TEAL), (~is_teal, GRAPHITE)):
        out[mask, 0], out[mask, 1], out[mask, 2] = col
    out[..., 3] = (alpha * 255).astype(np.uint8)
    out[alpha < 0.02, 3] = 0
    return Image.fromarray(out, "RGBA")

def fit(im, size, ratio):
    s = int(size * ratio)
    k = min(s / im.width, s / im.height)
    return im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)

# ---------- Logo extendido ----------
ext = crop_alpha(Image.open(f"{SRC}/logo-extendido-original.png").convert("RGBA"), pad=6)
ext.save(f"{OUT}/images/logo-araritech.png", optimize=True)                         # para fundos claros
recolor_neutral(ext, WHITE).save(f"{OUT}/images/logo-araritech-claro.png", optimize=True)  # para fundos escuros
print("logo extendido:", ext.size)

# ---------- Símbolo "at" ----------
mark = crop_alpha(white_to_alpha(Image.open(f"{SRC}/simbolo-at-original.png")), pad=0)
print("símbolo:", mark.size)

# Foto de perfil padrão: símbolo sobre fundo branco (troque por uma foto sua quando quiser)
perfil = Image.new("RGBA", (512, 512), WHITE + (255,))
m = fit(mark, 512, 0.56)
perfil.alpha_composite(m, ((512 - m.width) // 2, (512 - m.height) // 2))
perfil.convert("RGB").save(f"{OUT}/images/perfil.png", optimize=True)

# Favicons: símbolo (turquesa + branco) sobre grafite com cantos arredondados
BG = (24, 27, 29, 255)
mark_dark = recolor_neutral(mark, WHITE)
def icon(size, ratio=0.58, radius=0.22):
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(base).rounded_rectangle((0, 0, size - 1, size - 1), int(size * radius), fill=BG)
    m = fit(mark_dark, size, ratio)
    base.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return base
icon(32, 0.66).save(f"{OUT}/favicon-32.png", optimize=True)
icon(180, 0.58, 0.0).save(f"{OUT}/apple-touch-icon.png", optimize=True)
icon(192, 0.58).save(f"{OUT}/icon-192.png", optimize=True)
icon(512, 0.58).save(f"{OUT}/icon-512.png", optimize=True)
icon(256, 0.66).save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("ok")
