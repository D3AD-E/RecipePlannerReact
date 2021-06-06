import React from 'react';
import { Card } from 'react-bootstrap';


const IngredientBox = ({ ingredients }) => (
    <Card>
        <Card.Body>
            <Card.Title>Required ingredients</Card.Title>
            <div>
                {ingredients.map(({ name, quantity, unit }, i) => (
                    <p key={i}>{name} {quantity.toFixed(1)} {unit}</p>
                ))}
            </div>
            </Card.Body>
    </Card>

);

export default IngredientBox;