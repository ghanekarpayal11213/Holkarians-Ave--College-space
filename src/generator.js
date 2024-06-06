require('dotenv').config()
module.exports = {
    getPort : ()=>Number(process.env.PORT) ?? 3000 ,
    getENV : ()=> process.env.NODE_ENV ?? 'local',
    getMongoDbUrl :()=>process.env.MONGO_DB_URL ?? 'mongodb://0.0.0.0:27017'

}