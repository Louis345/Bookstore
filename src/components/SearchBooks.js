import React from "react";
import {Link} from 'react-router-dom';
class SearchBooks extends React.Component {



 handleFilterTextInputChange = (e) =>{
   console.log(e.target.value);
   this.props.onFilterTextInput(e.target.value);

 }
 handleBookSearch = (e) => {
   console.log('drop down changed','drop down has changed');
 }
  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/create"
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
