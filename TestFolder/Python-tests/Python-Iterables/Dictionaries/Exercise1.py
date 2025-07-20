books = {
    '1984': 'George Orwell',
    'Brave New World': 'Aldous Huxley',
    "The Great Gatsby": 'F. Scott Fitzgerald'
}
print(books.get("1984"))
books['The Great Gatsby'] = 'Francis Scott Fitzgerald'
print(books)
mobydicks = {"Moby Dick" : "Herman Melville"}
books.update(mobydicks)
print(books)
print(books.get("To Kill a Mockingbird"))
print(books.pop("Brave New World"))
print(books)