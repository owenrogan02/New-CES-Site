"""Slice a tall screenshot into viewable chunks: python3 scripts/slice.py shot.png [chunk_height]"""
import sys
from PIL import Image
src = sys.argv[1]; ch = int(sys.argv[2]) if len(sys.argv) > 2 else 1100
im = Image.open(src); w, h = im.size
base = src.rsplit('.', 1)[0]
n = 0
for y in range(0, h, ch):
    im.crop((0, y, w, min(h, y + ch))).save(f"{base}_part{n}.png"); n += 1
print(w, h, n, 'parts')
