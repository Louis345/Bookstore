import React from "react";

class Books extends React.Component {
  setBookState = () => {
    const { bookCollection, searchedBooks } = this.props;
    for (let book of searchedBooks) {
      for (let savedBook of bookCollection) {
        if (book.id === savedBook.id) {
          book.shelf = savedBook.shelf;
        }
      }
    }
    return searchedBooks;
  };

  displayBooks = () => {
    let searchedBooks = this.setBookState();

    if (this.props.searchedBooks) {
      return searchedBooks.map((book, idx) => {
        return (
          <li key={idx}>
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
                      this.props.modifyBooks({
                        id: book.id,
                        category: e.target.value
                      });
                    }}
                    defaultValue={book.shelf}
                  >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        );
      });
    }
    return <div className="book" />;
  };
  render() {
    return (
      <div>
        <ol className="books-grid">
          {this.displayBooks()}
        </ol>
      </div>
    );
  }
}

export default Books;
