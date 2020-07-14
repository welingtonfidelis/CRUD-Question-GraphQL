const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers/resolvers');

const port = 3001;

require('./database/config');

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema/schema.graphql'),
    resolvers: resolvers
});

server.start({port: port});

console.log(`Server running ${port}`);
