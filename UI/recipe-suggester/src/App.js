import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar />
        </header>
      </div>
    );
  }
}

function SearchBar(props){
  return (
    <div class="form-group">
      <input id="search-input" class="form-control" placeholder="Search" type="text"/>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  );
}

export default App;
