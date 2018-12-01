// import {importSchema} from 'graphql-import'
import {resolvers} from './resolvers'

import { GraphQLServer } from 'graphql-yoga'
import { createTypeormConn } from "./utils/createTypeormConnection";

// const typeDefs = importSchema("schema.graphql")


export const startServer = async () => {
    const server = new GraphQLServer(
    { typeDefs: 'src/schema.graphql', 
    resolvers })
    await createTypeormConn()
    const app = await server.start({port: process.env.NODE_ENV === "test" ? 0 : 4000})
    console.log('It is running on localhost:4000')
    return app
}