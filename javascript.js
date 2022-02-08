let myLibrary = [];

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

    let myLibraryIterations = 0;

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

        switch (read.textContent) {
            case "Read":
                read.classList.remove("negative");
                read.classList.add("affirmative");
                break;
            case "Not read yet":
                read.classList.remove("affirmative");
                read.classList.add("negative");
        }

        currentBook.dataset.id = myLibraryIterations;
        myLibraryIterations++;

        const deleteBookButton = currentBook.querySelector(".delete-book");
        deleteBookButton.addEventListener("click", (e) => {
            let bookToBeDeleted = e.currentTarget.parentNode;
            let bookIdToBeDeleted = bookToBeDeleted.dataset.id;
            myLibrary.splice(bookIdToBeDeleted, 1);
            updateBookDisplay();
            })

        const readBook = currentBook.querySelector(".read");
        readBook.addEventListener("click", (e) => {
            let bookToChangeReadStatus = e.currentTarget.parentNode.parentNode.parentNode;
            let bookIdToChangeReadStatus = bookToChangeReadStatus.dataset.id;
            let bookReadStatus = e.currentTarget.textContent;
            switch (bookReadStatus) {
                case "Read":
                myLibrary[bookIdToChangeReadStatus].read = "Not read yet";
                break;
                case "Not read yet":
                myLibrary[bookIdToChangeReadStatus].read = "Read";
            }
            updateBookDisplay();
        })

        const addBook = document.querySelector(".book.add");
        grid.insertBefore(currentBook, addBook);
    });
    
    
}

const newBookButton = document.querySelector(".add-book-button");
newBookButton.addEventListener("click", () => {
    const addBookButton = document.querySelector(".book.add");
    addBookButton.classList.add("invisible");
    const bookFormSample = document.querySelector(".book.form-sample");
    bookFormSample.reset();
    
    bookFormSample.classList.remove("form-sample");
    bookFormSample.classList.add("current-form");
});

const cancelFormButton = document.querySelector(".cancel-form");
cancelFormButton.addEventListener("click", closeForm);

function closeForm() {
    const currentForm = document.querySelector(".current-form");
    currentForm.classList.add("form-sample");
    currentForm.classList.remove("current-form");

    const addBookButton = document.querySelector(".book.add");
    addBookButton.classList.remove("invisible");

    let inputs = document.querySelectorAll(".form-sample input[type=text]");
    inputs.forEach((input) => {
        input.classList.remove("invalid");
        input.classList.remove("valid");
    })
};

const submitForm = document.querySelector(".submit-form");
submitForm.addEventListener("click", () => {
    const title = document.querySelector("#title-book-add");
    const author = document.querySelector("#author-book-add");
    const pages = document.querySelector("#pages-book-add");
    const notRead = document.querySelector("#book-not-read");
    const read = document.querySelector("#book-read");


    if ([...title.classList].includes("valid") &&
    [...author.classList].includes("valid") &&
    [...pages.classList].includes("valid") &&
    (read.checked === true || notRead.checked === true)) {

        let readStatus = false;
        if (read.checked > notRead.checked) readStatus = "Read";
        else readStatus = "Not read yet";

        addBookToLibrary(title.value, author.value, pages.value, readStatus);
        closeForm();
    }
});

const inputsFormSample = document.querySelectorAll(".form-sample input[type=text]");
inputsFormSample.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        let fieldName = e.target.id;
        let input = e.target.value;
        
        if (regexValidate(fieldName, input) === true) {
            e.target.classList.remove("invalid");
            e.target.classList.add("valid");
        } else {
            e.target.classList.remove("valid");
            e.target.classList.add("invalid");
        };
    });
});

function regexValidate(fieldName, input) {
    const patterns = {
        ["title-book-add"]: /^([^\W\d]|\s)+$/,
        ["author-book-add"]: /^([^\W\d]|\s)+$/,
        ["pages-book-add"]: /^\d+$/
    }
    
    if (patterns[fieldName].test(input)) return true
    else return false;
};