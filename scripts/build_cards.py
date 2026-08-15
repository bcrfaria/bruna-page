from pathlib import Path

from PIL import Image
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
SYMBOL_SOURCE = ROOT / "brand/assets/oficial-aprovado/02-simbolo-principal.png"
SYMBOL = ROOT / "public/brand/simbolo-principal-bruna-faria-transparente.png"
OUT = ROOT / "output/pdf"
PUBLIC = ROOT / "public/pdf"

NAME = "Bruna Faria"
CRP = "CRP 08/34202"
PHONE = "+55 (41) 99515-6609"
PHONE_LINK = "tel:+5541995156609"
WHATSAPP = "https://wa.me/5541995156609?text=Ol%C3%A1%2C%20Bruna%21%20Vim%20pelo%20seu%20cart%C3%A3o%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20sess%C3%B5es."
SITE = "https://brunafaria.com.br"
CARD = "https://brunafaria.com.br/cartao/"
CONTACT = "https://brunafaria.com.br/contato/"
EMAIL = "psibrunafaria@gmail.com"
INSTAGRAM = "https://instagram.com/brunapsic"
DOCTORALIA = "https://www.doctoralia.com.br/bruna-faria-2/psicologo/curitiba"

PAPER = colors.HexColor("#fdfbf7")
OAT = colors.HexColor("#f7f3ec")
INK = colors.HexColor("#2e2a26")
SOFT = colors.HexColor("#5c554d")
LINE = colors.HexColor("#e4ddd0")
OLIVE = colors.HexColor("#55684f")
TERRACOTTA = colors.HexColor("#a6634b")


def ensure_dirs():
    OUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    SYMBOL.parent.mkdir(parents=True, exist_ok=True)


def build_transparent_symbol():
    source = Image.open(SYMBOL_SOURCE).convert("RGBA")
    pixels = source.load()
    width, height = source.size
    visited = set()
    stack = []

    def is_background(x, y):
        r, g, b, _ = pixels[x, y]
        return r > 220 and g > 214 and b > 204

    for x in range(width):
        if is_background(x, 0):
            stack.append((x, 0))
        if is_background(x, height - 1):
            stack.append((x, height - 1))
    for y in range(height):
        if is_background(0, y):
            stack.append((0, y))
        if is_background(width - 1, y):
            stack.append((width - 1, y))

    while stack:
        x, y = stack.pop()
        if (x, y) in visited or not (0 <= x < width and 0 <= y < height) or not is_background(x, y):
            continue
        visited.add((x, y))
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    source.save(SYMBOL)


def text_center(c, x, y, text, font, size, color=INK, tracking=0):
    c.setFillColor(color)
    c.setFont(font, size)
    if tracking == 0:
        c.drawCentredString(x, y, text)
        return
    total = sum(stringWidth(ch, font, size) for ch in text) + tracking * (len(text) - 1)
    cursor = x - total / 2
    for ch in text:
        c.drawString(cursor, y, ch)
        cursor += stringWidth(ch, font, size) + tracking


def draw_symbol(c, x, y, width):
    aspect = 390 / 320
    c.drawImage(str(SYMBOL), x, y, width=width, height=width * aspect, preserveAspectRatio=True, mask="auto")


def rounded_link(c, x, y, w, h, label, url, primary=False):
    c.setStrokeColor(OLIVE if primary else LINE)
    c.setFillColor(OLIVE if primary else PAPER)
    c.roundRect(x, y, w, h, h / 2, stroke=1, fill=1)
    c.setFillColor(colors.white if primary else OLIVE)
    c.setFont("Helvetica", 10)
    c.drawCentredString(x + w / 2, y + h / 2 - 3.5, label)
    c.linkURL(url, (x, y, x + w, y + h), relative=0)


def draw_qr(c, url, x, y, size):
    qr = QrCodeWidget(url)
    bounds = qr.getBounds()
    drawing = Drawing(size, size, transform=[size / (bounds[2] - bounds[0]), 0, 0, size / (bounds[3] - bounds[1]), 0, 0])
    drawing.add(qr)
    renderPDF.draw(drawing, c, x, y)


def build_virtual_pdf(path):
    w, h = 420, 720
    c = canvas.Canvas(str(path), pagesize=(w, h))
    c.setTitle("Cartao virtual - Bruna Faria")
    c.setAuthor(NAME)
    c.setSubject("Cartao virtual clicavel com contatos profissionais")

    c.setFillColor(OAT)
    c.rect(0, 0, w, h, stroke=0, fill=1)
    margin = 38
    c.setFillColor(PAPER)
    c.setStrokeColor(LINE)
    c.roundRect(margin, 34, w - 2 * margin, h - 68, 10, stroke=1, fill=1)

    symbol_w = 74
    draw_symbol(c, w / 2 - symbol_w / 2, h - 170, symbol_w)
    text_center(c, w / 2, h - 220, NAME, "Times-Roman", 34, INK)
    text_center(c, w / 2, h - 245, "P S I C O L O G I A", "Helvetica", 10, OLIVE, tracking=3.5)

    c.setFillColor(SOFT)
    c.setFont("Helvetica", 10.8)
    copy = [
        "Psicoterapia online para adultos",
        "no Brasil e no exterior.",
        "Escuta acolhedora, afirmativa",
        "e tecnicamente fundamentada.",
    ]
    y = h - 292
    for line in copy:
        c.drawCentredString(w / 2, y, line)
        y -= 17

    x = margin + 36
    button_w = w - 2 * (margin + 36)
    y = 304
    rounded_link(c, x, y, button_w, 38, "Falar no WhatsApp", WHATSAPP, True)
    y -= 48
    rounded_link(c, x, y, button_w, 34, "Conhecer o site", SITE)
    y -= 43
    rounded_link(c, x, y, button_w, 34, "Instagram - @brunapsic", INSTAGRAM)
    y -= 43
    rounded_link(c, x, y, button_w, 34, "Doctoralia", DOCTORALIA)

    c.setStrokeColor(LINE)
    c.line(margin + 42, 120, w - margin - 42, 120)
    c.setFillColor(SOFT)
    c.setFont("Helvetica", 8.5)
    c.drawCentredString(w / 2, 95, PHONE)
    c.linkURL(PHONE_LINK, (w / 2 - 70, 86, w / 2 + 70, 106), relative=0)
    c.drawCentredString(w / 2, 75, EMAIL)
    c.linkURL(f"mailto:{EMAIL}", (w / 2 - 78, 66, w / 2 + 78, 86), relative=0)
    c.drawCentredString(w / 2, 55, "brunafaria.com.br/cartao")
    c.linkURL(CARD, (w / 2 - 76, 46, w / 2 + 76, 66), relative=0)

    c.showPage()
    c.save()


def build_print_pdf(path):
    card_w = 90 * mm
    card_h = 50 * mm
    c = canvas.Canvas(str(path), pagesize=(card_w, card_h))
    c.setTitle("Cartao de visita - Bruna Faria")
    c.setAuthor(NAME)
    c.setSubject("Cartao de visita para impressao")

    # Front
    c.setFillColor(PAPER)
    c.rect(0, 0, card_w, card_h, stroke=0, fill=1)
    c.setStrokeColor(LINE)
    c.rect(3 * mm, 3 * mm, card_w - 6 * mm, card_h - 6 * mm, stroke=1, fill=0)
    symbol_w = 15 * mm
    draw_symbol(c, 12 * mm, 22 * mm, symbol_w)
    c.setFillColor(INK)
    c.setFont("Times-Roman", 24)
    c.drawString(32 * mm, 27 * mm, NAME)
    c.setFillColor(OLIVE)
    c.setFont("Helvetica", 8)
    c.drawString(32.5 * mm, 21.6 * mm, "P S I C O L O G I A")
    c.setFillColor(TERRACOTTA)
    c.circle(45 * mm, 11 * mm, 1.1 * mm, stroke=0, fill=1)
    c.showPage()

    # Back
    c.setFillColor(PAPER)
    c.rect(0, 0, card_w, card_h, stroke=0, fill=1)
    c.setStrokeColor(LINE)
    c.rect(3 * mm, 3 * mm, card_w - 6 * mm, card_h - 6 * mm, stroke=1, fill=0)
    c.setFillColor(INK)
    c.setFont("Times-Roman", 15)
    c.drawString(9 * mm, 34 * mm, NAME)
    c.setFillColor(SOFT)
    c.setFont("Helvetica", 7.4)
    c.drawString(9 * mm, 29.6 * mm, f"Psicóloga | {CRP}")
    c.drawString(9 * mm, 25.7 * mm, "Psicoterapia online para adultos")

    c.setFillColor(INK)
    c.setFont("Helvetica", 7.2)
    c.drawString(9 * mm, 17.2 * mm, PHONE)
    c.drawString(9 * mm, 13.5 * mm, "brunafaria.com.br")
    c.drawString(9 * mm, 9.8 * mm, "@brunapsic")
    c.linkURL(PHONE_LINK, (9 * mm, 16 * mm, 44 * mm, 19.2 * mm), relative=0)
    c.linkURL(SITE, (9 * mm, 12.3 * mm, 45 * mm, 15.5 * mm), relative=0)
    c.linkURL(INSTAGRAM, (9 * mm, 8.6 * mm, 31 * mm, 11.8 * mm), relative=0)

    qr_size = 22 * mm
    qr_x = card_w - 31 * mm
    qr_y = 18 * mm
    c.setFillColor(colors.white)
    c.setStrokeColor(LINE)
    c.rect(qr_x - 2 * mm, qr_y - 2 * mm, qr_size + 4 * mm, qr_size + 4 * mm, stroke=1, fill=1)
    draw_qr(c, CONTACT, qr_x, qr_y, qr_size)
    c.setFillColor(SOFT)
    c.setFont("Helvetica", 5.6)
    c.drawCentredString(qr_x + qr_size / 2, 10.5 * mm, "Cartao virtual")
    c.linkURL(CONTACT, (qr_x - 2 * mm, qr_y - 2 * mm, qr_x + qr_size + 2 * mm, qr_y + qr_size + 2 * mm), relative=0)

    c.showPage()
    c.save()


def main():
    ensure_dirs()
    build_transparent_symbol()
    virtual = OUT / "cartao-virtual-bruna-faria.pdf"
    printed = OUT / "cartao-visita-bruna-faria-impressao.pdf"
    build_virtual_pdf(virtual)
    build_print_pdf(printed)
    for source in [virtual, printed]:
        target = PUBLIC / source.name
        target.write_bytes(source.read_bytes())
        print(target)


if __name__ == "__main__":
    main()
