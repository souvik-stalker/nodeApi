const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data={
    id:10
};

var token = jwt.sign(data,'123abc');
console.log(token);

var decode = jwt.verify(token,'123abc');



















// var message ="I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message : ${message}`);
// console.log(`hash ${hash}`);

// var data = {
//     id:4
// };

// var token ={
//     data,
//     hash:SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('data was changed dont trust');
// }
