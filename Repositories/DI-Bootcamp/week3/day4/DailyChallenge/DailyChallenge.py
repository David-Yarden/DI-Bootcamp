import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("Provide radius or diameter")

    @property
    def diameter(self):
        return self.radius * 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    def __eq__(self, other):
        return isinstance(other, Circle) and self.radius == other.radius

    def __lt__(self, other):
        return isinstance(other, Circle) and self.radius < other.radius
c1 = Circle(radius=5)
c2 = Circle(diameter=10)

print(c1)
print(c2)

c3 = c1 + c2
print("Added:", c3)

print("Are equal?", c1 == c2)
print("Is c1 bigger?", c1 > c2)

circles = [c3, c1, c2]
sorted_circles = sorted(circles)
for c in sorted_circles:
    print(c)
import turtle

def draw_circle(radius):
    turtle.penup()
    turtle.goto(0, -radius)  # Start at bottom of the circle
    turtle.pendown()
    turtle.circle(radius)

def draw_sorted_circles(circle_list):
    turtle.speed(0)
    turtle.bgcolor("white")
    for c in sorted(circle_list):
        draw_circle(c.radius)
    turtle.done()
draw_sorted_circles([c1, c2, c3])
