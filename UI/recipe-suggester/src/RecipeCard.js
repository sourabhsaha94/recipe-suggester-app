import React from 'react';
import {Card, CardBody, CardTitle, CardText, Row} from 'reactstrap';

const RecipeCard = (props) => {
    return(
        <Row className="recipe-card">
            <Card>
                <CardBody>
                    <CardTitle>{props.name}</CardTitle>
                </CardBody>
            </Card>
        </Row>
    );
};

export default RecipeCard;