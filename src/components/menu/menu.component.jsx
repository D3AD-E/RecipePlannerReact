import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeTable from '../recipe-table/recipe-table.component';
import IngredientBox from '../ingredient-box/ingredient-box.component';

function Menu() {
    const [currentMenuData, setCurrentMenu] = useState({ 'recipes': [], 'ingredients': []});
    const [allRecipeData, setAllRecipes] = useState({ 'recipes': []  });

    const getRecipes = async () => {
        const result = await axios('/api/recipes');
        setAllRecipes(result.data);
    };

    useEffect(() => {
        getRecipes();
    }, []);

    const handleRecipeAdded = (id) => {
        const newRecipe = allRecipeData.recipes.find(r => r.id === id)
        if (newRecipe) {
            let recipes = [...currentMenuData.recipes];

            recipes.push({
                'name': newRecipe.name,
                'id' : newRecipe.id
            });

            let ingredients = currentMenuData.ingredients.splice(0);
            for (let i = 0; i < newRecipe.ingredients.length; i++) {
                let index = ingredients.findIndex((ingredient) => (ingredient.name === newRecipe.ingredients[i].name && ingredient.unit === newRecipe.ingredients[i].unit));
                if (index !== -1) {
                    ingredients[index].quantity += parseFloat(newRecipe.ingredients[i].quantity);
                }
                else {
                    ingredients.push({ 'name': newRecipe.ingredients[i].name, 'quantity': parseFloat(newRecipe.ingredients[i].quantity), 'unit': newRecipe.ingredients[i].unit});
                }
            }
            ingredients.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setCurrentMenu({ recipes, ingredients });
        }
    };

    const handleRecipeDeleted = (index) => {
        if (index >= 0 && index < currentMenuData.recipes.length) {
            let recipes = [...currentMenuData.recipes];
            let recipe = allRecipeData.recipes.find(r =>r.id === recipes[index].id);

            let ingredients = currentMenuData.ingredients;
            for (let i = 0; i < recipe.ingredients.length; i++) {
                let indexFound = ingredients.findIndex((ingredient) => (ingredient.name === recipe.ingredients[i].name && ingredient.unit === recipe.ingredients[i].unit));
                if (indexFound !== -1) {
                    if (ingredients[indexFound].quantity === parseFloat(recipe.ingredients[i].quantity)) {
                        ingredients.splice(indexFound, 1);
                        i--;
                    }
                    else {
                        ingredients[indexFound].quantity -= parseFloat(recipe.ingredients[i].quantity);
                        if (ingredients[indexFound].quantity < 0.00001) {
                            ingredients.splice(indexFound, 1);
                            i--;
                        }
                    }
                }
            }
            recipes.splice(index, 1);
            setCurrentMenu({ recipes, ingredients });
        }
    };

    return (
        <div className='menu'>
            <div>
                <div>
                    {(allRecipeData.recipes && allRecipeData.recipes.length > 0) ?
                        <RecipeTable recipes={allRecipeData.recipes || []} onAdd={handleRecipeAdded} />
                        :
                        <span>No recipes available</span>
                    }
                </div>
            </div>
            <div>
                {(currentMenuData.recipes && currentMenuData.recipes.length > 0) ?
                    <RecipeTable recipes={currentMenuData.recipes} onDelete={handleRecipeDeleted} />
                    :
                    <span>No recipes chosen</span>
                }
            </div>
            <div>
                {(currentMenuData.ingredients && currentMenuData.ingredients.length > 0) ?
                    <IngredientBox ingredients={currentMenuData.ingredients} />
                    :
                    <span>No ingredients required</span>
                }
            </div>
        </div>
    )
}

export default Menu;