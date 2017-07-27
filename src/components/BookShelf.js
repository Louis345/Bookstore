import React from "react";
import { Link } from "react-router-dom";
class BookShelf extends React.Component {


  displayBooks = () => {
    return this.props.books.map(book => {
      return (
        <div key={book.id}>
          <div>
            <li>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks.thumbnail}")`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      onChange={e => {
                        book.category = e.target.value
                        this.props.handleBookStatus(book);
                      }}
                      value={this.props.bookStatus}
                    >
                      <option  disabled>Move to...</option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
              </div>
            </li>
          </div>
          <div className="open-search">
            <Link className="open-search" to="/search">
              Add a book
            </Link>
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="list-books">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books" />
          <div className="list-books-content">
            <ol className="books-grid">
              {this.displayBooks()}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
