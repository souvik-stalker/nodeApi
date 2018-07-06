const {MongoClient} = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
       return console.log("Unbale to connect to MongoDB Database");
    }
    console.log("Connected to MongoDB server");
    var db = client.db('TodoApp');
    // 5b39a0361614a723f49aae5e
    // db.collection('Todos').find({
    //     _id:ObjectId('5b39afa371e0a827e0f1d0d3')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unbale to fetch todo object',err);
    // });
    db.collection('Todos').find().count().then((count)=>{
        console.log('Todos');
        console.log(`Todos count ${count}`);
    },(err)=>{
        console.log('Unbale to fetch todo object',err);
    });

    db.collection('Users').find({name:"Souvik"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log("Error occured",err);
    });

    //client.close();
}); 