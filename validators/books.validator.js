
const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError
const {Author} = require('../models/author');
const {Category} = require('../models/category');


const ValidAuthor ={
    validate: async function(typeName, originalObject, materializedObject) {
        const AuthorFinded =
        await Author.findById(materializedObject.AuthorID);
        
        if (!AuthorFinded) {
            throw new CantLinkToInvalidAuthorError(typeName);
        }
    }};
  class CantLinkToInvalidAuthorError extends GNXError {
    constructor(typeName) {
      super(typeName,'You must specify a valid author id', 'CantLinkToInvalidAuthorError');
    }
  }

  const ValidCategory ={
    validate: async function(typeName, originalObject, materializedObject) {
        const categories = materializedObject.categories;
        for (const categorie of categories) {
            let CategoryFinded =
            await Category.findById(categorie.category_ID);
            console.log(materializedObject);
            
            if (!CategoryFinded) {
                throw new CantLinkToInvalidCategoryError(typeName);
            }
        }
        
    }};
  class CantLinkToInvalidCategoryError extends GNXError {
    constructor(typeName) {
      super(typeName,'You must specify a valid category id', 'CantLinkToInvalidCategoryError');
    }
  }

  const ValidAmountOfPages ={
    validate: async function(typeName, originalObject, materializedObject) {
        
        if (materializedObject.pages < 100 || materializedObject.pages > 1000) {
            throw new InvalidAmountOfPagesError(typeName);
        }
    }};
  class InvalidAmountOfPagesError extends GNXError {
    constructor(typeName) {
      super(typeName,'Pages cant be les than 100 and more than 1000', 'InvalidAmountOfPagesError');
    }
  }

  module.exports ={
    ValidAuthor,  
    ValidCategory,  
    ValidAmountOfPages,
  };