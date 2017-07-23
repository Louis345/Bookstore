import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import BookShelf from "./components/BookShelf";
import Books from "./components/Books";
import Header from "./components/Header";
import debounce from 'lodash/debounce'
import { Route } from "react-router-dom";
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      books: [],
      filteredBooks: []
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        filteredBooks: books
      });
    });
  }
  uniqueIdsFilter = searchedBooks => {

    let uniq = new Set();
    let filteredBooks = null;
    let completedBooks = [];

      let unique = searchedBooks.filter(
        (set => f => !set.has(f.id) && set.add(f.id))(new Set())
      );
      this.setState({
        books: unique
      });
  };

  responseHasErrors = (books) =>{

  let hasErrors = (books.hasOwnProperty('error') === true) ? false : true;

    return hasErrors;
  }
  handleFilterTextInput = filterText => {
    console.log(filterText === '');
   if(filterText){

    this.setState({
      filterText: filterText
    });

      BooksAPI.search(filterText).then(response => {
      this.responseHasErrors(response) && this.uniqueIdsFilter(response);
      });

    } else{
      this.setState({
        filterText: filterText,
        books:''
      });
    }
  };
  handleBookStatus = book => {
    BooksAPI.update(book, book.category).then(response => {

      BooksAPI.getAll().then(books => {

        this.setState({
          filteredBooks: books
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
                bookCollection={this.state.filteredBooks}
              />
            </div>}
        />
        <Route
          path="/create"
          render={() =>
            <div>

              <Header />
              <BookShelf
                title="Currently Reading"
                books={this.state.filteredBooks.filter(
                  book => book.shelf === "currentlyReading"
                )}
                handleBookStatus={this.handleBookStatus}
                bookStatus={"currentlyReading"}
              />
              <BookShelf
                title="Want To Read"
                books={this.state.filteredBooks.filter(
                  book => book.shelf === "wantToRead"
                )}
                handleBookStatus={this.handleBookStatus}
                bookStatus={"wantToRead"}
              />
              <BookShelf
                title="Read"
                books={this.state.filteredBooks.filter(
                  book => book.shelf === "read"
                )}
                handleBookStatus={this.handleBookStatus}
                bookStatus={"read"}
              />
            </div>}
        />
      </div>
    );
  }
}

export default BooksApp;
