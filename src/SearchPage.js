import React from 'react'
import {Link} from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input'

export default function SearchPage({handleSearch, query, queryResult,handleSearchPageShelfChange, changeShelf}) {
  console.log(queryResult)
  let searchedBooks = [];
  if(Array.isArray(queryResult)){
    queryResult.map((books) => searchedBooks.push(books))
  }
  else {}

  function handleBookChange(bookId, shelf) {
    handleSearchPageShelfChange(bookId, shelf);
      let selectedBook = searchedBooks.find(book => book.id === bookId);
      let selectedBookIndex = searchedBooks.indexOf(selectedBook);
      selectedBook.shelf = shelf.target.value;
      let updatedBookList = searchedBooks.filter(book => book.id !== bookId);
      updatedBookList.splice(selectedBookIndex, 0, selectedBook);
      searchedBooks = updatedBookList;
      changeShelf(searchedBooks)
  }

return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to="/"><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                  <DebounceInput minLength={1} debounceTimeout={300} placeholder="Search by title or author" onChange= {(e) => handleSearch(e)} value={query}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {searchedBooks.length === 0 ? <h1 style={{color: "#D3D3D3"}}>Please provide a registered search term</h1>:
                  searchedBooks.map((book) => {
                    let bookUrl = book.imageLinks ? book.imageLinks.thumbnail : "";
                      return(
                        <li key ={book.id}>
                          <div className="book">
                              <div className="book-top">
                              <a href= {book.previewLink} target="_blank">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookUrl})` }}></div>
                              </a>
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
                              <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): book.authors}</div>
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
