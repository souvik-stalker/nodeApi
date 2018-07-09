var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect("mongodb://localhost:27017/TodoApp");
//mongoose.connect("mongodb://souvik:souvik9038@ds119675.mlab.com:19675/todos");

module.exports={
    mongoose
};