const graphql = require('graphql'); 
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID, 
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' }
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors, {id:parent.authorid})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // if the fields property is not in the funation then it will show error when we put the relaction 
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId:parent.id})
            }
        }
    })
})

//Main query of the book application.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLID}},           // argments whever we need to pass need to add here (in args)
            resolve(parent, args){
                //code to get data rom db/other source
                //parent is used for relactions 
                //args for taking data from the user-end
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    } 
})


module.exports = new GraphQLSchema({
    query:RootQuery
});