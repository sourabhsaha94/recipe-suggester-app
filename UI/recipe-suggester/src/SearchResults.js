import React from 'react';
import {Row} from 'reactstrap';
import queryString from 'query-string';

class SearchResults extends React.Component{

    baseRecipeApi = "http://localhost:8080/recipe-list?title=";

    constructor(props){
      super(props);
    }
    
    componentDidMount(){
        const value = queryString.parse(this.props.location.search);
        fetch(this.baseRecipeApi+value.name)
        .then(function(response){
            console.log(response);
        });
    }

    render(){
      return (
        <Row className="search-results">
        </Row>
      );
    }
  }

export default SearchResults;