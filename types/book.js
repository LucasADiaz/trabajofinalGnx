const graphql = require('graphql');
const gnx = require('@simtlix/gnx');

const Author = require('../models/author').Author;
const BookModel = require('../models/book').Book;
const ISBNType = require('./isbn');
const AssignedCategoryType = require('./assignedCategory');

const {
    ValidAuthor,
    ValidCategory,
    ValidAmountOfPages,
  } = require('../validators/books.validator');
const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLList, GraphQLNonNull,GraphQLInt
  } = graphql;

  const BookType = new GraphQLObjectType({
    name: 'BookType',
    description: 'Represent books',
    extensions: {
        validations: {
          'CREATE':
          [
            ValidAuthor,
            ValidCategory,
            ValidAmountOfPages,
          ],
        },
      },
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        pages: { type: GraphQLInt },
        ISBN: {
          type: ISBNType,
          extensions: {
            relation: {
              embedded: true
            }
          }
        },
        categories: {
          type: new GraphQLList(AssignedCategoryType),
          extensions: {
            relation: {
              embedded: true
            }
          },
          resolve (parent, args) {
            return parent.categories
          }
        },
        author: {
            type: AuthorType,
            extensions: {
                relation: {
                connectionField: 'AuthorID',
                },
            },
            resolve(parent, args) {
                return Author.findById(parent.AuthorID);
            },
            },
    }),
});

gnx.connect(BookModel, BookType, 'book', 'books');

module.exports = BookType;

const AuthorType = require('./author');