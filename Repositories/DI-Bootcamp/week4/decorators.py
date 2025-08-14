#Decorators
import math

class Circle:

    def __init__(self, radius=0, diameter=0):
        self.radius = radius
        self.diameter = diameter
        self._color = None
    
    @classmethod
    def from_diameter(cls, diameter):
        diameter = diameter
        radius = round(diameter/2)
        return cls(radius, diameter)
    @staticmethod
    def area_from_radius(radius):
        pi = math.pi
    @property
    def color(self):
        return self.color
    
    @color.setter
    def color(self, color):
        self.color = color
        return self

# circle2 =Circle.from_diameter(10)
# print(circle2.radius)
# print(circle2.diameter)
# circle1 = Circle(diameter = 10)
# print(circle1.radius)
# print(circle1.diameter)
# print(math.pi)
circle2 = Circle.from_diameter(10)
circle2.color = "red"
print(circle2.color)