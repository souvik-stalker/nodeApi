var express = require('express');
var bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app= express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos:todos
        });
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findById(id).then((tood)=>{
        if(!tood){
            return res.status(404).send();
        }
     return res.status(200).send({todo:tood});   
    }).catch((e)=>{
        return res.status(400).send(e);
    })

});

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
     }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
     return res.status(200).send({todo:todo});   
    }).catch((e)=>{
        return res.status(400).send(e);
    })
});

app.listen(port,()=>{
    console.log("Server is running on port ",port);
});

module.exports.app = app;


