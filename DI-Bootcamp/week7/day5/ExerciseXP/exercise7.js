// 1. Create an array of books
const allBooks = [
    {
        title: "Harry Potter",
        author: "J.K. Rowling",
        image: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg",
        alreadyRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
        alreadyRead: false
    }
];

// 2. Select the section to render the books
const section = document.querySelector(".listBooks");

// 3. Loop through each book and create a div
allBooks.forEach(book => {
    const bookDiv = document.createElement("div");

    // Create title and author element
    const bookInfo = document.createElement("p");
    bookInfo.textContent = `${book.title} written by ${book.author}`;

    // Set text color to red if already read
    if (book.alreadyRead) {
        bookInfo.style.color = "red";
    }

    // Create book image element
    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";

    // Append info and image to the book div
    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(img);

    // Append book div to the section
    section.appendChild(bookDiv);
});
