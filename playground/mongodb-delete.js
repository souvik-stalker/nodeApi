const {MongoClient} = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
       return console.log("Unbale to connect to MongoDB Database");
    }
    console.log("Connected to MongoDB server");
    var db = client.db('TodoApp');
    
    //Delete Many
    // db.collection('Todos').deleteMany({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // })
    //Delete One
    // db.collection('Todos').deleteOne({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // });
    //FindOne and Delete
    // db.collection('Todos').findOneAndDelete({text:"Eat Lunch"}).then((result)=>{
    //     console.log(result);
    // });

    //db.collection('Users').deleteMany({name:"Swapna"});

    // db.collection('Users').findOneAndDelete({name:"Souvik"}).then((result)=>{
    //          console.log(result);
    //      });
    db.collection('Users').findOneAndDelete({_id:ObjectId('5b39a4109d1bfe1f588f2bda')}).then((result)=>{
            console.log(result);
        });
    //client.close();
}); 