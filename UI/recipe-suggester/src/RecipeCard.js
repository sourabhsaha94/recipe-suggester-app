import React from 'react';
import {Card, CardBody, CardTitle, CardText, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

const RecipeCard = (props) => {
    if(!props.full_recipe){
        return(
            <Row className="recipe-card">
                <Link to={'/recipe/'+props.name}>
                    <Card className="py-1 my-1">
                        <CardBody>
                            <CardTitle>{props.name}</CardTitle>
                            <CardText>{props.description}</CardText>
                        </CardBody>
                    </Card>
                </Link>
            </Row>
        );
    }
    else{
        return(
            <Row className="recipe-card">
                <Card className="py-1 my-1">
                    <CardBody>
                        <CardTitle>{props.full_recipe.name}</CardTitle>
                        <CardText>
                            {props.full_recipe.description}
                        </CardText>
                        <br />
                        <h6>Ingredients:</h6>
                        <ul>
                            {props.full_recipe.ingredients.map((item,index) => (<li key={index}>{item}</li>))}
                        </ul>
                        <br />
                        <h6>Steps:</h6>
                        <ol>
                            {props.full_recipe.steps.map((item,index) => (<li key={index}>{item}</li>))}
                        </ol>
                    </CardBody>
                </Card>
            </Row>
        );
    }
            
};

export default RecipeCard;