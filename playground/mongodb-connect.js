//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
       return console.log("Unbale to connect to MongoDB Database");
    }
    console.log("Connected to MongoDB server");
    var db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed : false
    // },(err,result)=>{
    //    if(err){
    //        return console.log("Unable to insert todo",err);
    //    }
    //    console.log(JSON.stringify(result.ops,undefined,2));
    // });

    db.collection('Users').insertOne({
        name:"Swapna",
        gender:"Female",
        age:59,
        location:"Kolkata"
    },(err,result)=>{
        if(err){
            return console.log("Unanle to insert User",err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    });
    client.close();
}); 