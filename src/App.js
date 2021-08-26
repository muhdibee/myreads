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
    query: 'Search term'
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          inShelvebooks: books
        })
      })
  }

  SearchHandler(e) {
    this.setState({
      query: e.target.value
     })
  }

  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <Home inShelvebooks={this.state.inShelvebooks}/>} />
            <Route path='/search' component={() => <Search  SearchHandler={() => this.SearchHandler} query={this.state.query}/>}/>
          </Switch>
      </BrowserRouter>
     );
  }
}

export default App;