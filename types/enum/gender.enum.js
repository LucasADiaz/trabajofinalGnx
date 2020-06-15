const { GraphQLEnumType } = require('graphql');

const GenderTypeEnum = new GraphQLEnumType({
    name: 'GenderTypeEnum',
    values: {
        M: {
            value: 'Male'
        },
        F: {
            value: 'Female'
        },
        U: {
            value: 'Undefined'
        }
    }
});

module.exports = GenderTypeEnum;