import React from 'react';
import {Card, CardBody, CardTitle, CardText, Row} from 'reactstrap';

const RecipeCard = (props) => {
    return(
        <Row className="recipe-card">
            <Card className="py-1 my-1">
                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                    <CardText>{props.description}</CardText>
                </CardBody>
            </Card>
        </Row>
    );
};

export default RecipeCard;