import { getConnectionOptions, createConnection } from "typeorm";


// Kijkt in de ENV welke fase het is development, test. Maakt dan de connectie
export const createTypeormConn = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    return createConnection({ ...connectionOptions, name:"default"})
}