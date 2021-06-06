import React from 'react';
import { Button, Table } from 'react-bootstrap';


const RecipeTable = ({ recipes, onAdd, onDelete }) => (
    <div className="table-responsive">
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {recipes.map(({ id, name }, index) => (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>
                            {onAdd && 
                                <Button variant="success" onClick={onAdd.bind(this, id)}> + </Button>
                            }
                            {onDelete &&
                                <Button variant="danger" onClick={onDelete.bind(this, index)}> - </Button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);

export default RecipeTable;