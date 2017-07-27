import React from "react";

class Books extends React.Component {

  displayBooks = () => {


    if (this.props.searchedBooks) {

      return this.props.searchedBooks.map((book, idx) => {

        return (
          <li key={idx}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${book && book.imageLinks && book.imageLinks.thumbnail || 'some-fallback-background-image'}")`
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    onChange={e => {
                    
                      this.props.modifyBooks({
                        id: book.id,
                        category: e.target.value
                      });
                      book.shelf = e.target.value;
                    }}
                   value={book.shelf}

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
              <div className="book-authors">{book && book.authors ? book.authors.join(", ") : 'None'}</div>
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
