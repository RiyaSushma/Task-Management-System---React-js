const mongoose = require('mongoose');


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://riyag0105:pc2CShBlge5RiKBb@task-management-system.g6fw8cg.mongodb.net/?retryWrites=true&w=majority&appName=task-management-system', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected");
    } catch(err) {
        console.error('MongoDB connection error: ', err);
        process.exit(1);
    }
};

module.exports = connectDB;