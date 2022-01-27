let myLibrary = [{title:"tituloPrueba", author:"autorPrueba", pages:"123", read:"Leido"},
 {title:"tituloPrueba2", author:"autorPrueba2", pages:"1232", read:"Leido2"}];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${read}`
    }
};

function addBookToLibrary(title, author, pages, read) {
    let currentBook = new book(title, author, pages, read);
    myLibrary.push(currentBook);
    updateBookDisplay();
};

function updateBookDisplay() {
    const grid = document.querySelector(".grid");
    const sampleBook = document.querySelector(".book.sample");

    while (grid.children.length > 1) {
        grid.removeChild(grid.lastChild);
    }

    myLibrary.forEach(book => {
        const currentBook = sampleBook.cloneNode(true);
        currentBook.classList.remove("sample");
        const title = currentBook.querySelector(".title");
        const author = currentBook.querySelector(".author");
        const pages = currentBook.querySelector(".pages");
        const read = currentBook.querySelector(".read");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;


        grid.appendChild(currentBook);
    });
    
    
}
