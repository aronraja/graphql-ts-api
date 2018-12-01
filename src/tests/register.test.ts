import {request} from 'graphql-request'

import { host } from "./constants";
import { User } from '../entity/User';
import { createTypeormConn } from '../utils/createTypeormConnection';
import { startServer } from '../startServer';

let getHost = () => ''

beforeAll(async () => {
    const app = await startServer()
    const {port} = app.address()
    getHost = () => `http://127.0.01:${port}`
})

const email = 'tom@bob.com'
const password = 'Hoi123'

const mutation = `
mutation {
    register(email: "${email}", password: "${password}")
}
`

test("Register user", async () => {
    const response = await request(host, mutation)
    expect(response).toEqual({register: true})
    const users = await User.find({where: {email}})
    expect(users).toHaveLength(1)
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password) 
})

// Use a test DB
// Drop all data once the test is over
//When i run npm test it also starts the server