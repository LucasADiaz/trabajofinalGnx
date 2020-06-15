const express = require('express');
// eslint-disable-next-line
const gnx = require('@simtlix/gnx');
const app = express();

const graphqlHTTP = require('express-graphql');

const mongoose = require('mongoose');
mongoose.plugin(require('./plugins/auditablePluginSchema'));


mongoose.connect('mongodb://Aspire5-DiazLucas:27017,Aspire5-DiazLucas:27018,Aspire5-DiazLucas:27019/example', { replicaSet: 'rs' })
    // Conectar a la DB
    // mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost/crmclientegraphql', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const types = require('./types');
const includedTypes = Object.values(types);
const schema = gnx.createSchema(includedTypes, includedTypes);

app.use('/graphql', graphqlHTTP({
    // Directing express-graphql to use this schema to map out the graph
    schema,
    /* Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    which provides an interface to make GraphQl queries */
    graphiql: true,
}))

app.listen(3001, () => {
    console.log('Listening on port 3001');
});