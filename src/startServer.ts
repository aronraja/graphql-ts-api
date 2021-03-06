import {importSchema} from 'graphql-import'
import * as fs from 'fs'
import * as path from 'path'
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools'
import {GraphQLSchema} from 'graphql'

import { GraphQLServer } from 'graphql-yoga'
import { createTypeormConn } from "./utils/createTypeormConnection";


export const startServer = async () => {
const schemas: GraphQLSchema[] = []
const folders = fs.readdirSync(path.join(__dirname, "./modules"))

folders.forEach((folder) => {
    const {resolvers} = require(`./modules/${folder}/resolvers`)
    const typeDefs = importSchema(path.join(__dirname,`/modules/${folder}/schema.graphql`))
    schemas.push(makeExecutableSchema({resolvers, typeDefs}))
})
    const server = new GraphQLServer(
    {schema: mergeSchemas({schemas})})
    await createTypeormConn()
    const app = await server.start({port: process.env.NODE_ENV === "test" ? 0 : 4000})
    console.log('It is running on localhost:4000')
    return app
}