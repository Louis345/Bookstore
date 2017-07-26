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
  setBookShelf = filteredBooks => {
    for (let collection of this.state.filteredBooks) {
      for (let searchedBooks of filteredBooks) {
        if (collection.id === searchedBooks.id) {
          searchedBooks.shelf = collection.shelf;
        }
      }
    }

    this.setState({
      books: filteredBooks
    });
  };
  uniqueIdsFilter = searchedBooks => {
    let uniq = new Set();
    let filteredBooks = null;
    let completedBooks = [];
    let unique = null;
    unique = searchedBooks.filter(
      (set => f => !set.has(f.id) && set.add(f.id))(new Set())
    );
    this.setBookShelf(unique);
  };

  responseHasErrors = books => {
    let hasErrors = books.hasOwnProperty("error") === true ? false : true;

    return hasErrors;
  };
  handleFilterTextInput = filterText => {
    if (filterText) {
      this.setState({
        filterText: filterText
      });

      BooksAPI.search(filterText).then(response => {
        this.responseHasErrors(response) && this.uniqueIdsFilter(response);
      });
    } else {
      this.setState({
        filterText: filterText,
        books: ""
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
  updateState = () => {
    console.log("test");
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
                updateState={this.state.updateState}
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
                  books={this.state.filteredBooks.filter(
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
                  books={this.state.filteredBooks.filter(
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
