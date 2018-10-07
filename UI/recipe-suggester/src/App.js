import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { Route, HashRouter} from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import FullRecipe from './FullRecipe';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Container fluid>
          <Route exact path="/" component = {SearchBar} />
          <Route path="/search" component = {SearchResults}/>
          <Route path="/recipe/:name" component = {FullRecipe}/>
        </Container>
      </HashRouter>
    );
  }
}

export default App;
