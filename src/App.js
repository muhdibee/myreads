import React, {Component} from 'react';
import * as BookAPI from './BooksAPI';
import './App.css';
import Home from './HomePage';
import Search from './SearchPage'
import {BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    inShelvebooks: [],
    query: '',
    queryResult: [],
    };
    this.handleHomePageShelfChange = this.handleHomePageShelfChange.bind(this);
  }

  componentDidMount() {
    BookAPI.getAll()
      .then((books) => {
        this.setState({
          inShelvebooks: books
        })
      });
  }

  searchHandler = (e) =>{
        this.setState({query: e.target.value});
        BookAPI.search(this.state.query)
        .then((queriedBooks) => {
          this.setState({
            queryResult: queriedBooks
          })
        })
      }

    handleHomePageShelfChange (bookId, shelf) {
      BookAPI.update({id:bookId}, shelf.target.value);
      BookAPI.getAll()
      .then((books) => {
        this.setState({
          inShelvebooks: books
        })
      })
    }

    handleSearchPageShelfChange (bookId, shelf) {
      BookAPI.update({id:bookId}, shelf.target.value)
      .catch();
      this.forceUpdate() //trying to update the component.
      
      // BookAPI.getAll()
      // .then((books) => {
      //   this.setState({
      //     inShelvebooks: books
      //   })
      // })
    }


  render() {

    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home inShelvebooks={this.state.inShelvebooks} handleHomePageShelfChange={this.handleHomePageShelfChange}/>} />
            <Route path='/search'>
              <Search  handleSearch={this.searchHandler} query={this.state.query} queryResult={this.state.queryResult} handleSearchPageShelfChange={this.handleSearchPageShelfChange}/>
            </Route>
          </Switch>
      </BrowserRouter>
     );
  }
}

export default App;