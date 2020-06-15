const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const Author = require('../models/author').Author;
const Book = require('../models/book').Book;
const City = require('../models/city').City;
const SexTypeEnum = require('./enums/sex.enum');
const {AuditableObjectFields} = require('./extended_types/auditableGraphQLObjectType');

const {
  CantRepeatName,
  CantDeleteAuthorWithBooks,
} = require('../validators/author.validator');

const {
    GraphQLString, GraphQLNonNull,
    GraphQLID, GraphQLObjectType, GraphQLList,GraphQLInt
  } = graphql;

  const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    description: 'Represent authors',
    extensions: {
      validations: {
        'UPDATE':
        [
          CantRepeatName,
        ],
        'DELETE' :
        [
          CantDeleteAuthorWithBooks,
        ],
      },
    },
    fields: () => Object.assign(AuditableObjectFields, {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: { type: GraphQLInt },
        sex: { type: SexTypeEnum},
        city: {
            type: CityType,
            extensions: {
              relation: {
                connectionField: 'cityID'
              }
            },
            resolve (parent, args) {
              return City.findById(parent.cityID)
            }
          },
        books: {
            type: new GraphQLList(BookType),
            extensions: {
                relation: {
                embedded: false,
                connectionField: 'AuthorID',
                },
            },
            resolve(parent, args) {
                return Book.find({'AuthorID': parent.id});
            },
        },
    }),
});



gnx.connect(Author, AuthorType, 'author', 'authors');

module.exports = AuthorType;

const BookType = require('./book'); 
const CityType = require('./city')