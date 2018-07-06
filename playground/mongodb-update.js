const {MongoClient} = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
       return console.log("Unbale to connect to MongoDB Database");
    }
    console.log("Connected to MongoDB server");
    var db = client.db('TodoApp');
    
    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectId('5b3afb5871e0a830504646f8')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // }) 

    db.collection('Users').findOneAndUpdate({
        _id: ObjectId('5b39a6ccd4fafc31d0aa2b21')
    },{
        $set:{
            name:"Rashbehari Banerjee"
        },
        $inc:{
            age:1
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    }) 
    //client.close();
}); 