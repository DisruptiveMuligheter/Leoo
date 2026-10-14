"""Lager forsidebildet til et nytt notat.

Bruk:  python verktoy/lag-forside.py pdf/no/30-navn-pa-notatet.pdf 30
Krever Python med Pillow (pip install pillow) og Poppler (pdftoppm).
Uten dette kan du hoppe over steget. Nettsiden viser da en enkel farget flate i stedet for bilde.
"""
import os, subprocess, sys
from PIL import Image

pdf, nr = sys.argv[1], int(sys.argv[2])
ut = f"assets/forsider/{nr:02d}"
subprocess.run(["pdftoppm", "-f", "1", "-l", "1", "-scale-to", "720", "-png", "-singlefile", pdf, ut], check=True)
Image.open(ut + ".png").convert("RGB").save(ut + ".webp", "WEBP", quality=78)
os.remove(ut + ".png")
print("Laget", ut + ".webp")
