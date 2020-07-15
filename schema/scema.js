const graphql = require('graphql'); 
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

//Main query of the book application.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLString}},           // argments whever we need to pass need to add here (in args)
            resolve(parent, args){
                //code to get data rom db/other source
                //parent is used for relactions 
                //args for taking data from the user-end
                return _.find(books, {id: args.id});

            }
        }
    } 
})


module.exports = new GraphQLSchema({
    query:RootQuery
});