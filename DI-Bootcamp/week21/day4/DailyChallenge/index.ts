// Daily Challenge: Building a Library System with TypeScript Classes and Interfaces

// Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string;
}

// Class Library
class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find(book => book.isbn === isbn);
  }

  protected getAllBooks(): Book[] {
    return this.books;
  }
}

// Class DigitalLibrary extends Library
class DigitalLibrary extends Library {
  readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.getAllBooks().map(book => book.title);
  }
}

// Create an instance of DigitalLibrary
const digitalLibrary = new DigitalLibrary("https://mylibrary.com");

// Add some books
digitalLibrary.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0743273565",
  publishedYear: 1925,
  genre: "Fiction"
});

digitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0451524935",
  publishedYear: 1949,
  genre: "Dystopian"
});

digitalLibrary.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  isbn: "978-0061120084",
  publishedYear: 1960
});

// Print book details
console.log("Library Website:", digitalLibrary.website);
console.log("\n--- Book Details ---");

const book1 = digitalLibrary.getBookDetails("978-0743273565");
if (book1) {
  console.log(`Title: ${book1.title}`);
  console.log(`Author: ${book1.author}`);
  console.log(`ISBN: ${book1.isbn}`);
  console.log(`Published: ${book1.publishedYear}`);
  console.log(`Genre: ${book1.genre || "Not specified"}`);
}

console.log("\n--- All Book Titles ---");
const titles = digitalLibrary.listBooks();
titles.forEach((title, index) => {
  console.log(`${index + 1}. ${title}`);
});
