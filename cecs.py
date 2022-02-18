import pytesseract
from PIL import Image

image = Image.open('D:/code.png')
print(pytesseract.image_to_string(image))