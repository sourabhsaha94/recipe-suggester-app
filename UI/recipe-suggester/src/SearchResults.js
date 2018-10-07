import React from 'react';
import {Row, Container} from 'reactstrap';
import queryString from 'query-string';
import RecipeCard from './RecipeCard';

class SearchResults extends React.Component{

    baseRecipeApi = "http://localhost:8080/recipe-from-ingredients?ingredients=";

    constructor(props){
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          recipeList: [],
      };
    }
    
    //https://reactjs.org/docs/faq-ajax.html
    componentDidMount(){
        const value = queryString.parse(this.props.location.search);
        fetch(this.baseRecipeApi+value.name)
        .then((res) => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    recipeList: result,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    render(){
        const {error, isLoaded, recipeList} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else {
            return (
                <Container className="search-results-container">
                {recipeList.map(item => (
                    <RecipeCard key = {item._id}  name={item.name} description={item.description} />
                ))}
                </Container>
            );
        }
    }
}

export default SearchResults;