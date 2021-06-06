import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';

function RecipeEdit() {

    const [data, setData] = useState({})
    const history = useHistory();
    const { id }  = useParams();

    useEffect(() => {
        const getRecipe = async () => {
            const result = await axios('/api/recipes/' + id);
            let recipe = result.data;
            recipe.description = result.data.description ? result.data.description.join("\r\n") : '';
            setData(recipe);
        };

        getRecipe();
    }, [id]);


    const handleSubmit = async event => {
        event.preventDefault();
        let sendMe = data;
        if (data.description)
            sendMe.description = data.description.split(/\r?\n/);

        const res = await axios.post(`/api/recipes/edit/${id}`, sendMe);
        if (res.status === 200) {
            history.push('/');
        }
    };


    const handleChange = event => {
        const { target: { value, name } } = event;

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleItemChanged = (i, event) => {
        var ingredients = data.ingredients;
        const { value, name } = event.target;
        ingredients[i][name] = value;
        setData(prev => ({
            ...prev,
            ingredients: ingredients
        }));
    };

    const handleItemDeleted = (i) => {
        var ingredients = data.ingredients;
        ingredients.splice(i, 1);

        setData(prev => ({
            ...prev,
            ingredients: ingredients
        }));
    };

    const handleAddRow = () => {
        var ingredients = data.ingredients;
        if (ingredients) {
            ingredients.push({
                'name': '',
                'quantity': 0.1,
                'unit': ''
            });
        }
        else {
            ingredients =
                [
                    {
                        'name': '',
                        'quantity': 0.1,
                        'unit': ''
                    }
                ];
        }

        setData(prev => ({
            ...prev,
            ingredients: ingredients
        }));
    };

    const {name, description, ingredients } = data;



    return (
        <div className="table-responsive table mt-2" id="dataTable" role="grid">
            <span>Edit recipe</span>
            <form className='recipe-add-form' onSubmit={handleSubmit}>
                <div className="input-group">
                    <span className="input-group-text">Name</span>
                    <input
                        className="form-control"
                        type="text"
                        name='name'
                        onChange={handleChange}
                        value={name || ""}
                        required
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-text">Description</span>
                    <textarea
                        className="form-control"
                        name='description'
                        value={description || ""}
                        onChange={handleChange}
                        label='Description'>
                    </textarea>
                </div>
                {ingredients ?
                    <table className="table my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map(function (o, i) {
                                return (
                                    <tr key={'ingredient-' + i}>
                                        <td><FormInput
                                            type='text'
                                            name='name'
                                            value={o.name}
                                            onChange={handleItemChanged.bind(this, i)}
                                            required
                                        /></td>
                                        <td><FormInput
                                            type='number'
                                            step="0.1"
                                            min='0.1'
                                            name='quantity'
                                            value={o.quantity}
                                            onChange={handleItemChanged.bind(this, i)}
                                            required
                                        /></td>
                                        <td><FormInput
                                            type='text'
                                            name='unit'
                                            value={o.unit}
                                            onChange={handleItemChanged.bind(this, i)}
                                            required
                                        /></td>
                                        <td>
                                            <Button onClick={handleItemDeleted.bind(this, i)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    :
                    <span>No ingredients</span>
                }
                <div className="input-group">
                    <Button variant="outline-primary" onClick={handleAddRow} >Add ingredient</Button>
                </div>

                <Button type='submit'>Submit changes</Button>
            </form>
        </div>
    );

}

export default RecipeEdit;