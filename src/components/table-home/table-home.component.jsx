import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeHomeItem from '../recipe-home-item/recipe-home-item.component';

function TableHome() {
    const [recipeData, setRecipes] = useState({ recipes: [] });

    const getRecipes = async () => {
        const result = await axios('/api/recipes');
        setRecipes(result.data);
    };

    useEffect(() => {
        getRecipes();
    }, []);

    const handleRecipeDeleted = async (id) => {
        const result = await axios('/api/recipes/delete/' +id);
        if (result.status === 200) {
            getRecipes();
        }
    };

    return (
        <div>
            {recipeData.recipes.length > 0 ?
                <div className="table-responsive table mt-2" id="dataTable" role="grid">
                    <table className="table my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipeData.recipes.map(({ id, name }) => (
                                <RecipeHomeItem key={id} id={id} name={name} handleClick={handleRecipeDeleted.bind(this, id)} />
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <div>
                    <span>No recipes avaliable, go add one!</span>
                </div>
            }
        </div>
    )
}

export default TableHome;