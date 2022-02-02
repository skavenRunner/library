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
    let gridChildren = grid.children;

    [...gridChildren].forEach(child => {
        if ([...child.classList].includes("real-book")) {
            child.remove();
        }
    });

    myLibrary.forEach(book => {
        const currentBook = sampleBook.cloneNode(true);
        currentBook.classList.remove("sample");
        currentBook.classList.add("real-book");
        const title = currentBook.querySelector(".title");
        const author = currentBook.querySelector(".author");
        const pages = currentBook.querySelector(".pages");
        const read = currentBook.querySelector(".read");

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;

        const addBook = document.querySelector(".book.add");
        grid.insertBefore(currentBook, addBook);
    });
    
    
}

const newBookButton = document.querySelector(".add-book-button");
newBookButton.addEventListener("click", () => {
    const addBookButton = document.querySelector(".book.add");
    addBookButton.classList.add("invisible");
    const bookFormSample = document.querySelector(".book.form-sample");
    
    bookFormSample.classList.remove("form-sample");
    bookFormSample.classList.add("current-form");
});

const cancelForm = document.querySelector(".cancel-form");
cancelForm.addEventListener("click", closeForm);

function closeForm() {
    const currentForm = document.querySelector(".current-form");
    currentForm.classList.add("form-sample");
    currentForm.classList.remove("current-form")

    const addBookButton = document.querySelector(".book.add");
    addBookButton.classList.remove("invisible");

};

const submitForm = document.querySelector(".submit-form");
submitForm.addEventListener("click", () => {
    const title = document.querySelector("#title-book-add");
    const author = document.querySelector("#author-book-add");
    const pages = document.querySelector("#pages-book-add");
    const notRead = document.querySelector("#book-not-read");
    const read = document.querySelector("#book-read");

    let readStatus = false;

    if (read.checked > notRead.checked) readStatus = "Read";
    else readStatus = "Not yet read";

    addBookToLibrary(title.value, author.value, pages.value, readStatus);
    closeForm();
})