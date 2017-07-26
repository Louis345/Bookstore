import React from "react";

import {Link} from 'react-router-dom';
class SearchBooks extends React.Component {



 handleFilterTextInputChange = (e) =>{

   this.props.onFilterTextInput(e.target.value);

 }
 handleBookSearch = (e) => {

 }
  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/home"
            className="close-search"
            >Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
               type="text"
               placeholder="Search by title or author"
               onChange={(e) => this.handleFilterTextInputChange(e)}
               value={this.props.filterText}
             />
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
