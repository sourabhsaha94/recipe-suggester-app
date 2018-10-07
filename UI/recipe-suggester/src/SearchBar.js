import React from 'react';
import {Row} from 'reactstrap';
import SearchInput from './SearchInput';



class SearchBar extends React.Component{
    render(){
      return (
        <Row className="search-bar">
          <SearchInput />
        </Row>
      );
    }
  }

  export default SearchBar;