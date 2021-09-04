import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchPage({handleSearch, query, queryResult,handleSearchPageShelfChange, changeShelf}) {
  let searchedBooks = [];
  if(Array.isArray(queryResult)){
    queryResult.map((books) => searchedBooks.push(books))
  };

  function handleBookChange(bookId, shelf) {
    handleSearchPageShelfChange(bookId, shelf);
      let selectedBook = searchedBooks.find(book => book.id === bookId);
      selectedBook.shelf = shelf.target.value;
      let updatedBookList = searchedBooks.filter(book => book.id != bookId);
      updatedBookList.push(selectedBook);
      searchedBooks = updatedBookList;
      changeShelf(searchedBooks)
  }

return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/"><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <form >
                  <input type="text" placeholder="Search by title or author" onChange= {(e) => handleSearch(e)} value={query}/>
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {searchedBooks.length === 0 ? <h1 style={{color: "#D3D3D3"}}>Please provide a registered search term</h1>:
                  searchedBooks.map((book) => { console.log(book)
                    let bookUrl = book.imageLinks ? book.imageLinks.thumbnail : "";
                      return(
                        <li>
                          <div className="book">
                              <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookUrl})` }}></div>
                              <div className="book-shelf-changer">
                                  <select value={book.shelf ? book.shelf: "none"} onChange={(e) => handleBookChange(book.id, e)}>
                                      <option value="move" disabled>Move to...</option>
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
                      )
                    }
                  )
                  }
              </ol>
            </div>
        </div>
    )
}
