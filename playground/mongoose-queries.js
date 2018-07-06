const {mongoose} = require('./../server/db/mongoose');
const ObjectID = require('mongodb').ObjectID;
const {Todo} = require('./../server/models/todo');

var id ='5b3d94d32018682a3473013e1';

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos ',todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo ',todo);
// });
// if(!ObjectID.isValid(id)){
//     console.log('Id is not Valid');
// }
// Todo.findById(id).then((todo)=>{
//     console.log('Todo by ID ',todo);
// }).catch((e)=>{
//     console.log(e);
// });