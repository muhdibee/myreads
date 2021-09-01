import React, {} from 'react';
import {Link} from 'react-router-dom';

 const Home = ({inShelvebooks,handleShelfChange, causeUpdate}) => {
   const currentRead = [];
   const wantToRead = [];
   const read = [];

   const findCurrentRead = (book)=>{
     if(book.shelf === 'currentlyReading')
      return currentRead.push(book);
   }

   const findWantToRead = (book)=>{
    if(book.shelf === 'wantToRead') return wantToRead.push(book)
  }

  const findRead = (book)=>{
    if(book.shelf === 'read') return read.push(book)
  }

     inShelvebooks.map((book) => {
        findCurrentRead(book);
        findWantToRead(book);
        findRead(book)
        return('')
     })

      return (
            <div className="list-books">{console.log(causeUpdate)}
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title currently-reading">Currently Reading</h2>
                    <div className="bookshelf-books">{console.log(currentRead)}
                      <ol className="books-grid">
                            {currentRead.map((book) => {
                                return(
                                  <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(e) => handleShelfChange(book.id, e)}>
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
                  <div className="bookshelf">
                    <h2 className="bookshelf-title want-to-read">Want to Read</h2>
                    <div className="bookshelf-books">{console.log(wantToRead)}
                    <ol className="books-grid">
                            {wantToRead.map((book) => {
                                return(
                                  <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(e) => handleShelfChange(book.id, e)}>
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
                  <div className="bookshelf">
                    <h2 className="bookshelf-title read">Read</h2>
                    <div className="bookshelf-books">{console.log(read)}
                    <ol className="books-grid">
                            {read.map((book) => {
                                return(
                                  <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(e) => handleShelfChange(book.id, e)}>
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
                </div>
              </div>
              <div className="open-search">
                  <Link to='/search'><button>Add a book</button></Link>
              </div>
            </div>
      )
}

  export default Home;
