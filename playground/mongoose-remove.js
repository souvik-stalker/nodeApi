const {mongoose} = require('./../server/db/mongoose');
const ObjectID = require('mongodb').ObjectID;

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findByIdAndRemove('5b3edab54cdc5f0014a0ba02').then((todo)=>{
    console.log("Removed Todo is: ",todo);
},(err)=>{
    console.log("Error Ocuured",err);
});

Todo.findOneAndRemove({_id:"5b3edab54cdc5f0014a0ba02"}).then((todo)=>{
    console.log("Removed Todo is: ",todo);
},(err)=>{
    console.log("Error Ocuured",err);
});
