//Book Class
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// UI Class

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button id="btnNew" type="button" class="">${book.status}</button></td>
        <td> <a href='#' class='btn btn-danger btn-sm delete'>X</td>
        `;

        

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //TIMEOUT 
        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }

    //SUCESS

    //CLEAR
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#status').value = '';
    }
}

//Store Class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }


       static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
   }



//Event that will display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);




//Event to add a book

document.querySelector('#book-form').addEventListener('submit', (e) => {
        //Prevent Submit
        e.preventDefault();

        //GET BOOK VALUES
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const status = document.querySelector('#status').value;
        

        //VALIDATE
        if (title === '' || author === '' || pages === '') {
            UI.showAlert('Please fill in missing fields', 'danger');
        } else {

        //Instantiate Book
        const book = new Book(title, author, pages, status);

        //ADDING BOOK TO UI
        UI.addBookToList(book);


        //ADD BOOK TO STORAGE
        Store.addBook(book);

        //SUCxESS BOOK ADDED
        UI.showAlert('Library Book Added', 'success');

        //CLEAR FIELDS
        UI.clearFields();
        }
});
//Event to remove a book
document.querySelector('#book-list').addEventListener('click', (e) => 
{
    UI.deleteBook(e.target);

//REMOVING FROM STORAGE

Store.removeBook
(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    UI.showAlert('Book Has Been Deleted', 'success');
});

