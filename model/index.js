/* **********************
    connections file

*  ************************/

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bookauthor",{ useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex: true}, (error) => {
    if(!error){
        console.log('Db is connected !! ');
    }
    else{
        console.log(error);
    }
});