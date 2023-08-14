//Here, we import the "connect" & "connection" objects from the "mogoose" module and declare them as variables by the same name.
const { connect, connection } = require('mongoose');

//We then declare the "connectionString" below, which will either connect us to the "MONGODB" (database) through Mongo's built-in mehtod, or (should that method fail) we will connect through the local "mongodb" server on default port "27017)" and use the database we've named "socialDB". 
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';
    //We pass "connectionString" into the "connect" function from the Mongoose library to establish a connection to the "MONGODB".
connect(connectionString);

//Lastly, we "export" the "connection" object so that other parts of the application can use the established "connection".
module.exports = connection;