# OOP Quiz - Part 1: Answers

1. **What is a class?**
   A class is a blueprint or template for creating objects. It defines the attributes (data) and methods (behavior) that its instances will have.

2. **What is an instance?**
   An instance is a specific object created from a class. Each instance has its own copy of the class's attributes but shares the class's methods.

3. **What is encapsulation?**
   Encapsulation is bundling data (attributes) and the methods that operate on that data together inside a class, and restricting direct access to some of the object's components (e.g. using private/protected attributes).

4. **What is abstraction?**
   Abstraction is hiding complex implementation details and exposing only the essential interface. It lets users interact with an object without needing to know how it works internally.

5. **What is inheritance?**
   Inheritance allows a class (child) to acquire the attributes and methods of another class (parent), enabling code reuse and the creation of hierarchical relationships.

6. **What is multiple inheritance?**
   Multiple inheritance is when a class inherits from more than one parent class at the same time, gaining the attributes and methods of all parent classes.

7. **What is polymorphism?**
   Polymorphism allows objects of different classes to be treated as instances of a common superclass. The same method name can behave differently depending on the object that calls it (e.g. method overriding).

8. **What is method resolution order (MRO)?**
   MRO is the order in which Python searches through a class's hierarchy to find a method or attribute. Python uses the C3 linearization algorithm. You can inspect it with `ClassName.__mro__` or `help(ClassName)`.
