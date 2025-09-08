birthdate = input("Enter your birthdate (DD/MM/YYYY): ")
day, month, year = map(int, birthdate.split("/"))

age = 2025 - year
candles = age % 10
if candles == 0:
    candles = 10

cake_body_width = 19  # width of the cake’s middle part

candle_str = "i" * candles
# The top line: 3 underscores + candles + 3 underscores
top_line_width = 3 + len(candle_str) + 3

# Calculate left padding so the top line centers over cake_body_width
left_padding = (cake_body_width - top_line_width) // 2

# If odd difference, add 1 space after candles for perfect centering
right_padding = cake_body_width - top_line_width - left_padding

top_line = (
    " " * (left_padding + 3)  # 3 spaces left margin + left padding
    + "___"
    + candle_str
    + "___"
    + " " * right_padding
)

cake = f"""
{top_line}
  |:H:a:p:p:y:|
__|{'_' * cake_body_width}|__
|{'^' * cake_body_width}|
|:B:i:r:t:h:d:a:y:|
|{' ' * cake_body_width}|
~{'~' * cake_body_width}~
"""

def is_leap_year(y):
    return (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0)

print(cake)
if is_leap_year(year):
    print(cake)
