import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const RecipeHomeItem = ({ id, name, handleClick }) => (
    <tr>
        <td>{name}</td>
        <td>
            <Button onClick={handleClick}>Delete</Button>
            <Link to={`/recipes/edit/${id}`}><Button>Edit</Button></Link>
        </td>
    </tr>
);

export default RecipeHomeItem;