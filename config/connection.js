// Import mongoose 
const mongoose = require('mongoose');   

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
    useNewUrlParser: true,       // tells Mongoose to use the new connection string parser       
    useUnifiedTopology: true     // improves the stability 
});



// Export the Mongoose connection
module.exports = mongoose.connection;


