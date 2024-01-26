import { ID, Account, Client, Databases } from "appwrite"
import conf from './conf'

const { appwriteEndpoint, appwriteProjectId, appwriteDbId } = conf;

const client = new Client()

client.setEndpoint(appwriteEndpoint).setProject(appwriteProjectId)

export const account = new Account(client)

// Database

export const databases = new Databases(client, appwriteDbId)
