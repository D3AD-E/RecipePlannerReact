# RecipePlannerMVC

>University course project

    Please write simple Recipe Planner application using MVC NET 5.0
    Data should be stored in text files in selected folder (format explained at the end)

Main page

    Displays list of all available recipes
    Has buttons to Add/Edit/Delete recipes

Entry page

    user may Add new or Edit existing recipe
    recipe consist of multiline description and list of ingredients
    each ingredient has name, quantity and unit where:
    
    name is a multiword string (like bread flour)
    quantity is a float number (like 1.0)
    unit is a multiword string (any string is treated as a unit - so "red balbinka" is also a unit)

Menu page

    user may create a list of recipes to be cooked, for instance:

    omlette
    omlette
    pizza
    omlette

and program will compute sorted list of required ingredients to buy:

* active dry yeast: 0.25 ounce
* egg: 7.0 pcs
* flour: 2.5 cups
* olive oil:2.0 tablespoons
* salt: 3.0 pinch
* salt: 1.0 teaspoon
* water: 0.09 l

only compatible (=equal strings) units are summed up (see eggs with pcs) - if units are not compatible ingredients are presented separately (see salt)

Data format:

    recipes are stored in recipes.json file:
