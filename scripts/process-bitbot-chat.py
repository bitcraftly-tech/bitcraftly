"""Remove baked-in black matte from bitbot-chat.png and crop to content."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "mascot" / "bitbot-chat.png"


def is_bg(r: int, g: int, b: int, a: int) -> bool:
    if a < 10:
        return True
    mx = max(r, g, b)
    chroma = mx - min(r, g, b)
    if mx < 55 and chroma < 45:
        return True
    if mx < 35:
        return True
    return False


def main() -> None:
    im = Image.open(OUT).convert("RGBA")
    w, h = im.size
    px = im.load()

    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            r, g, b, a = px[x, y]
            if is_bg(r, g, b, a):
                seen[y][x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            r, g, b, a = px[x, y]
            if not seen[y][x] and is_bg(r, g, b, a):
                seen[y][x] = True
                q.append((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
                r, g, b, a = px[nx, ny]
                if is_bg(r, g, b, a):
                    seen[ny][nx] = True
                    q.append((nx, ny))

    removed = 0
    for y in range(h):
        for x in range(w):
            if seen[y][x]:
                r, g, b, a = px[x, y]
                if a > 0:
                    removed += 1
                px[x, y] = (r, g, b, 0)

    for _ in range(2):
        copy = im.copy()
        cpx = copy.load()
        for y in range(h):
            for x in range(w):
                r, g, b, a = px[x, y]
                if a == 0:
                    continue
                adj_trans = any(
                    0 <= nx < w and 0 <= ny < h and cpx[nx, ny][3] == 0
                    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1))
                )
                if adj_trans and max(r, g, b) < 90:
                    px[x, y] = (r, g, b, max(0, a - 80))

    xs: list[int] = []
    ys: list[int] = []
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 8:
                xs.append(x)
                ys.append(y)

    if xs:
        pad = 4
        im = im.crop(
            (
                max(0, min(xs) - pad),
                max(0, min(ys) - pad),
                min(w, max(xs) + pad + 1),
                min(h, max(ys) + pad + 1),
            )
        )

    im.save(OUT, optimize=True)
    px2 = im.load()
    cw, ch = im.size
    dark = sum(
        1
        for y in range(ch)
        for x in range(cw)
        if px2[x, y][3] > 200 and max(px2[x, y][:3]) < 40
    )
    trans = sum(1 for y in range(ch) for x in range(cw) if px2[x, y][3] < 10)
    print(f"saved {OUT} size={im.size} removed={removed} dark_opaque={dark} transparent={trans}")


if __name__ == "__main__":
    main()
