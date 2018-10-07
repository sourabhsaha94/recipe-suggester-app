import React from 'react';
import {Container, Button, Row} from 'reactstrap';
import RecipeCard from './RecipeCard';
import Link from 'react-router-dom/Link';

class FullRecipe extends React.Component{

    baseRecipeApi = "http://192.168.100.10:8080/recipe-full?title=";

    constructor(props){
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          recipe: {},
      };

      console.log(props);
    }
    
    //https://reactjs.org/docs/faq-ajax.html
    componentDidMount(){
        const value = this.props.match.params.name;
        fetch(this.baseRecipeApi+value)
        .then((res) => res.json()).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    recipe: result,
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
        const {error, isLoaded, recipe} = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else {
            return (
                <React.Fragment>
                    <Container className="full-recipe-container">
                        <Row><Link to="/"><Button color="primary" className="my-3">Back</Button></Link></Row>
                        <RecipeCard key = {recipe._id}  name={recipe.name} 
                        description={recipe.description} full_recipe={recipe}/>
                    </Container>
                </React.Fragment>
            );
        }
    }
}

export default FullRecipe;