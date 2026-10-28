"""Tile a tall screenshot into side-by-side columns for quick review: montage.py shot.png [cols] [chunk_px] [scale]"""
import sys
from PIL import Image
src = sys.argv[1]; cols = int(sys.argv[2]) if len(sys.argv) > 2 else 3
ch = int(sys.argv[3]) if len(sys.argv) > 3 else 1500; sc = float(sys.argv[4]) if len(sys.argv) > 4 else 0.45
im = Image.open(src).convert('RGB'); w, h = im.size
tw, th = int(w * sc), int(ch * sc)
chunks = [im.crop((0, y, w, min(h, y + ch))).resize((tw, int(min(ch, h - y) * sc))) for y in range(0, h, ch)]
out_i = 0
for i in range(0, len(chunks), cols):
    row = chunks[i:i + cols]
    sheet = Image.new('RGB', (tw * len(row) + 8 * (len(row) - 1), th), '#888')
    for j, c in enumerate(row): sheet.paste(c, (j * (tw + 8), 0))
    sheet.save(src.rsplit('.', 1)[0] + f'_m{out_i}.png'); out_i += 1
print(w, h, out_i, 'sheets')
