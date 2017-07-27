import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import BookShelf from "./components/BookShelf";
import Books from "./components/Books";
import Header from "./components/Header";
import debounce from "lodash/debounce";
import { Route } from "react-router-dom";
const shelves = {
  wantToRead: "Want to Read",
  read: "Read",
  currentlyReading: "Currently Reading"
};
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    userText: "",
      books: [],
    bookCollection: [],
    bookShelf:''
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
      bookCollection: books
      });
    });
  }

  getBookShelf = bookId => {

    //  this.state.books.filter((book,idx)=>{
    //    console.log(`bookId  is ${bookId} and book.id is ${book.id}`)
    //    console.log(book.id === bookId);
    //    if(book.id === bookId){
    //      console.log('match')
    //    }
    //  })

  };
  bookShelfStatus =() =>{

    return this.state.bookShelf;
  }
  uniqueIdsFilter = searchedBooks => {
    let uniq = new Set();
    let bookCollection = null;
    let completedBooks = [];
    let unique = null;
    unique = searchedBooks.filter(
      (set => f => !set.has(f.id) && set.add(f.id))(new Set())
    );
    for (let collection of this.state.bookCollection) {
        for (let searchedBooks of unique) {
          if (collection.id === searchedBooks.id) {
            console.log('test');
            searchedBooks.shelf = collection.shelf;
          }
        }
      }
        console.log(unique);
    this.setState({
      books: unique
    });

  };

  responseHasErrors = books => {
    let hasErrors = books.hasOwnProperty("error") === true ? false : true;

    return hasErrors;
  };
  handleFilterTextInput = userInput => {
    if (userInput) {
      this.setState({
      userText: userInput
      });

      BooksAPI.search(userInput).then(response => {
        this.responseHasErrors(response) && this.uniqueIdsFilter(response);
        console.log('bookAPI search');
      });
    } else {
      this.setState({
      userText: userInput,
        books: ""
      });
    }
  };
  handleBookStatus = book => {
    BooksAPI.update(book, book.category).then(response => {
      BooksAPI.getAll().then(books => {
        this.setState({
        bookCollection: books,
        bookShelf:book
        });
      });
    });
  };

  render() {
    
    return (
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <div>
              <SearchBooks
                filterText={this.state.filterText}
                onFilterTextInput={this.handleFilterTextInput}
              />
              <Books
                searchedBooks={this.state.books}
                modifyBooks={this.handleBookStatus}
                bookCollection={this.state.bookCollection}
                bookShelfStatus={this.bookShelfStatus}
              />
            </div>}
        />

        <Route
          path="/home"
          render={() =>
            <div>

              <Header />
              {Object.keys(shelves).map(shelf =>
                <BookShelf
                  title={shelves[shelf]}
                  books={this.state.bookCollection.filter(
                    book => book.shelf === shelf
                  )}
                  handleBookStatus={this.handleBookStatus}
                  bookStatus={shelf}
                />
              )}

            </div>}
        />
        <Route
          exact
          path="/"
          render={() =>
            <div>

              <Header />
              {Object.keys(shelves).map(shelf =>
                <BookShelf
                  title={shelves[shelf]}
                  books={this.state.bookCollection.filter(
                    book => book.shelf === shelf
                  )}
                  handleBookStatus={this.handleBookStatus}
                  bookStatus={shelf}
                />
              )}

            </div>}
        />
      </div>
    );
  }
}

export default BooksApp;
