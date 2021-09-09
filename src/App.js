import React, {Component} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import * as BookAPI from './BooksAPI';
import './App.css';
import Home from './HomePage';
import Search from './SearchPage'
import ErrorPage from './ErrorPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    inShelvebooks: [],
    query: '',
    queryResult: [],
    };
    this.handleHomePageShelfChange = this.handleHomePageShelfChange.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
    this.updateHomePage= this.updateHomePage.bind(this)
  }

  updateHomePage() {
    BookAPI.getAll()
    .then((books) => {
      this.setState({
        inShelvebooks: books
      })
    });
  }


  componentDidMount() {
    this.updateHomePage()
  }

  searchHandler = (e) =>{
    this.setState({query: e.target.value});
        BookAPI.search(this.state.query)
        .then((queriedBooks) => {
          let searchedBooksWithShelf = [];
          if (Array.isArray(queriedBooks)){
            queriedBooks.map((book) => {
            let foundBook;
            let foundBookInHomePage = this.state.inShelvebooks.filter((ibook)=> book.id === ibook.id)[0];
            if (foundBookInHomePage){
              foundBook = foundBookInHomePage;
              searchedBooksWithShelf.push(foundBook)
            } else{
              foundBook = book;
              foundBook.shelf = 'none';
              searchedBooksWithShelf.push(foundBook)
            }
          });
          this.setState({
            queryResult: searchedBooksWithShelf
          })
          } else {
            this.setState({
              queryResult: []
            })
          }
        })
      }

    handleHomePageShelfChange (bookId, shelf) {
      let selectedBook = this.state.inShelvebooks.find(book => book.id === bookId);
      selectedBook.shelf = shelf.target.value;
      let updatedBookList = this.state.inShelvebooks.filter(book => book.id !== bookId);
      updatedBookList.push(selectedBook);
      this.setState({
        inShelvebooks: updatedBookList
      })

      BookAPI.update({id:bookId}, shelf.target.value)
      .catch();

    }

    handleSearchPageShelfChange (bookId, shelf) {
      BookAPI.update({id:bookId}, shelf.target.value)
      .catch();
    }

    changeShelf (searchedBooks) {
      this.setState({
        queryResult: searchedBooks
      });
      this.updateHomePage()
    }


  render() {

    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home inShelvebooks={this.state.inShelvebooks} handleHomePageShelfChange={this.handleHomePageShelfChange}/>} />
            <Route exact path='/search'>
              <Search  handleSearch={this.searchHandler} query={this.state.query} queryResult={this.state.queryResult} handleSearchPageShelfChange={this.handleSearchPageShelfChange} changeShelf= {this.changeShelf}/>
            </Route>
            <Route component={ErrorPage}/>
          </Switch>
      </BrowserRouter>
     );
  }
}

export default App;