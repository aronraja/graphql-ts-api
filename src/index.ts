import "reflect-metadata";
// import {importSchema} from 'graphql-import'
import {resolvers} from './resolvers'
import {createConnection} from 'typeorm'

import { GraphQLServer } from 'graphql-yoga'

// const typeDefs = importSchema("schema.graphql")



const server = new GraphQLServer(
    { typeDefs: 'src/schema.graphql', 
    resolvers })
createConnection().then(() => {
    server.start(() => console.log('It is running on localhost:4000'))
})

