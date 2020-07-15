const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/scema');

const app = express();

//graphqlHTTP use for finding graphql 
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(4000,() => {
    console.log('Now listening for requests on port 4000')
})