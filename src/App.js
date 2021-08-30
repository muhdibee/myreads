import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
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
    queryResult: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          inShelvebooks: books
        })
      });
  }

  searchHandler = (e) =>{
        this.setState({
          query: e.target.value,
        });

        BooksAPI.search(this.state.query)
        .then((queriedBooks) => {
          this.setState({
            queryResult: queriedBooks
          })
        })
      }

  render() {

    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home inShelvebooks={this.state.inShelvebooks}/>} />
            <Route path='/search'>
              <Search  handleSearch={this.searchHandler} query={this.state.query} queryResult={this.state.queryResult}/>
            </Route>
          </Switch>
      </BrowserRouter>
     );
  }
}

export default App;