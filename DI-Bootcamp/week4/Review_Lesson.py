#Review oop Inheritance - OOP

#Class - defines the main attributes of the object. It is like a blueprint of the object
#Object - an instance of the class -It has attributes and methods (functions)
#Inheritance - the attributes and methods can be inherited from 
#a parent class to a child class

class Animal:
    def __init__(self, name):
        self.name = name
    


animal1 = Animal("Dog")
print(animal1.name)

print(type(["Hello"]))

class Book:
    def __init__(self, title, author, publication_date, price):
        self.title = title
        self.author = author
        self.price = price
    def present(self):
        print(f"Title:{self.title}\n Author: {self.author}")

book1 = Book("1984", "George Orwell", 1948, 100)
print(book1.author)

book1.present()
# Book.present(book1) same result

class Fiction(Book):
    def __init__(self, title, author, publication_date, price, is_awesome):
        super().__init__(title, author, publication_date, price)
        self.genre = "Fiction"
        self.is_awesome = is_awesome
    def present(self):
        super().present()
        if self.is_awesome:
            print(f"genre {self.genre},\nis awesome? {self.is_awesome}")
        else:
            print(f"this books sucks ass")

book2 = Fiction("Contact", "Carl Sagan", 1995, 150, True)
book2.present()

book3 = Fiction ("Fifty Shades of Grey", "E.L. James", 2010, 5, False)
book3.present()