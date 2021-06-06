'use strict';
var path = require('path');
var express = require('express');
const fs = require('fs');
const fileName = 'recipes.json';
var bodyParser = require('body-parser')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var staticPath = path.join(__dirname, '/');
//app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname, 'build')))

app.set('port', 5000);
//app.listen(5000);

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/api/recipes', (req, res) => {
    fs.readFile(fileName, (err, data) => {
        if (err) console.log(err);
        let json = JSON.parse(data);
        res.json(json);
    });
});

app.get('/api/recipes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(fileName, (err, data) => {
        if (err) console.log(err);
        let json = JSON.parse(data);
        let recipes = json.recipes;
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].id == id) {
                res.json(recipes[i]);
                return;
            }
        }

        res.status(500).json({ status: "Id not found" });
    });
});

app.post('/api/recipes/add', urlencodedParser, (req, res) => {
    console.log(req.body);
    const { name, description, ingredients } = req.body
    fs.readFile(fileName, (err, data) => {
        if (err) console.log(err);
        let json = JSON.parse(data);
        let recipes = json.recipes;

        let max = Math.max.apply(Math, recipes.map(function (o) { return o.id; }))

        let recipe = {
            'id': max + 1,
            'name': name,
            'description': description ? description : '',
            'ingredients': ingredients ? ingredients : []
        }
        recipes.push(recipe);
        fs.writeFile(fileName, JSON.stringify(json), (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).json({ status: "ok" });
            }
        });
        
    });
});

app.post('/api/recipes/edit/:id', urlencodedParser, (req, res) => {
    const id = req.params.id;
    const {name, description, ingredients } = req.body
    fs.readFile(fileName, (err, data) => {
        if (err) console.log(err);
        let json = JSON.parse(data);
        let recipes = json.recipes;
        for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].id == id) {
                recipes[i].name = name;
                recipes[i].description = description;
                recipes[i].ingredients = ingredients;
                break;
            }
        }
        console.log(recipes);
        fs.writeFile(fileName, JSON.stringify(json), (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).json({ status: "ok" });
            }
        });
    });
});

app.get('/api/recipes/delete/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(fileName, (err, data) => {
        if (err) console.log(err);
        let json = JSON.parse(data);
        let recipes = json.recipes;
        for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].id == id) {
                recipes.splice(i, 1);
                break;
            }
        }
        json.recipes = recipes;
        fs.writeFile(fileName, JSON.stringify(json), (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).json({ status: "ok" });
            }
        });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});

