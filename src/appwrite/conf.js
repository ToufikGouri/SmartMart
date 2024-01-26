const conf = {
    appwriteEndpoint: String(process.env.REACT_APP_APPWRITE_ENDPOINT),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDbId: String(process.env.REACT_APP_APPWRITE_DB_ID),
    appwriteDbClctId: String(process.env.REACT_APP_APPWRITE_DB_COLLECTION_ID),
    appwriteDbClctIdFB: String(process.env.REACT_APP_APPWRITE_DB_COLLECTION_ID_FEEDBACK),

}

export default conf