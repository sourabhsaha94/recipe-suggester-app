import React from 'react';
import {Container, Button, Row} from 'reactstrap';
import queryString from 'query-string';
import RecipeCard from './RecipeCard';
import Link from 'react-router-dom/Link';

class SearchResults extends React.Component{

    baseRecipeApi = "http://192.168.100.10:8080/recipe-from-ingredients?ingredients=";

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
                <React.Fragment>
                    <Container className="search-results-container">
                    <Row><Link to="/"><Button color="primary" className="my-3">Back</Button></Link></Row>
                    {recipeList.map(item => (
                        <RecipeCard key = {item._id}  name={item.name} description={item.description} />
                    ))}
                    </Container>
                </React.Fragment>
            );
        }
    }
}

export default SearchResults;