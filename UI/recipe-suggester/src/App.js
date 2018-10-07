import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Route, HashRouter} from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Container fluid>
        <Route exact path="/" component = {SearchBar} />
        <Route path="/search" component = {SearchResults}/>
      </Container>
      </HashRouter>
    );
  }
}

export default App;
