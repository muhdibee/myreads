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
    queryResult: [],
    causeUpdate: true,
    key: 2
    };
    this.handleShelfChange = this.handleShelfChange.bind(this);
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
        this.setState({query: e.target.value});
        BooksAPI.search(this.state.query)
        .then((queriedBooks) => {
          this.setState({
            queryResult: queriedBooks
          })
        })
      }
shouldComponentUpdate() {
  return true
}

    handleShelfChange (bookId, shelf) {
      this.setState((currentState) => ({
        causeUpdate: !currentState.causeUpdate
      }));
      BooksAPI.update({id:bookId}, shelf.target.value)
      .then((res => {
        this.setState({
          ...this.inShelvebooks
        })
      }));
      this.setState((currentState) => ({
        inShelvebooks: currentState.filter((book) =>{ return book.id != bookId})
        // causeUpdate: !currentState.causeUpdate,
        // inShelvebooks: [...currentState.inShelvebooks]
      }));
      this.setState({ key: Math.random() });
      // Location.reload(true);
    }

  render() {

    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home inShelvebooks={this.state.inShelvebooks} handleShelfChange={this.handleShelfChange} causeUpdate={this.state.causeUpdate}/>} />
            <Route path='/search'>
              <Search  handleSearch={this.searchHandler} query={this.state.query} queryResult={this.state.queryResult} handleShelfChange={this.handleShelfChange} causeUpdate={this.state.causeUpdate}/>
            </Route>
          </Switch>
      </BrowserRouter>
     );
  }
}

export default App;