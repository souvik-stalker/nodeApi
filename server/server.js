require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

var app= express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
    var todo = new Todo({
        text:req.body.text,
        _creator:req.user._id
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos',authenticate,(req,res)=>{
    Todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({
            todos:todos
        });
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    Todo.findOne({_id:id,_creator:req.user._id}).then((tood)=>{
        if(!tood){
            return res.status(404).send();
        }
     return res.status(200).send({todo:tood});   
    }).catch((e)=>{
        return res.status(400).send(e);
    })

});

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
     }
    Todo.findByOneAndRemove({_id:id,_creator:req.user._id}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
     return res.status(200).send({todo:todo});   
    }).catch((e)=>{
        return res.status(400).send(e);
    })
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
     } 
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((err)=>{
        res.status(400),send();
    })
});

app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    user.save().then((user)=>{
        return user.generateAuthToken(); 
    }).then((token)=>{
        res.header('x-auth',token).status(200).send({user});
    }).catch((e)=>{
         res.status(404).send(e);
    })
});




app.get('/users/me',authenticate,(req,res)=>{
    res.send({user:req.user});
});

app.post('/users/login',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    User.findByCendentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).status(200).send({user});
        });
    }).catch((e)=>{
        res.status(400).send();
    })

});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((e)=>{
        res.status(400).send();
    })
})

app.listen(port,()=>{
    console.log("Server is running on port ",port);
});

module.exports.app = app;


