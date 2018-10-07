const express = require('express');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;

var db_name = 'recipe_db';
var recipeFullCollection = 'recipe_full';
var recipeBasicCollection = 'recipe_basic';

var db = null;

MongoClient.connect('mongodb://localhost:27017/'+db_name,function(err,client){
    if(err) throw err;

    db = client.db(db_name);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Root endpoint -> list all possible endpoints here as response
app.get('/',function(req,res){
    let endpoints = [{
        'url':'/recipe-list?title=<string>',
        'desc':'To get list of recipes with title having given string'
    },{
        'url':'/recipe-full?title=<exact string>',
        'desc':'To search for recipe with title exactly matching the string'
    }];
    res.status(200).send(endpoints);
});

//end point to get list of recipes matching given title param
// /recipe-list?title=<string>
app.get('/recipe-list',function(req,res){

    let titleString = req.query.title || "";

    let mongoQuery = {'name':new RegExp(titleString,'i')};

    if(db){
        db.collection(recipeBasicCollection).find(mongoQuery).toArray(function(err,result){
            if(err) throw err;
            if(result)
                res.status(200).send(result);
            else
                res.status(404).send("Not found");
        });
    }
    else
        res.status(500).send('connection to db failed');
});

//end point to get recipe exactly matching given title param
// /recipe-full?title=<string>
app.get('/recipe-full',function(req,res){

    let titleString = req.query.title;
    if(titleString){
        let mongoQuery = {'name':titleString};
    
        if(db){
            db.collection(recipeFullCollection).findOne(mongoQuery,function(err,result){
                if(err) throw err;
                if(result)
                    res.status(200).send(result);
                else
                    res.status(404).send("Not found");
            });
        }
        else
            res.status(500).send('connection to db failed');
    }
    else
        res.status(500).send("Specify exact title")
    
});


const index = app.listen(port,function(){
        console.log("Server listening on port",port);
});

module.exports = index;