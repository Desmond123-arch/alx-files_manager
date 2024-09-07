const { MongoClient } = require('mongodb');
const Collection = require('mongodb/lib/collection');

class DBClient
{
    constructor()
    {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        this.url = `mongodb://${host}:${port}/database`;

        this.database = database;
        this.alive=false;
        this.client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.connect();
    }
    async connect()
    {
        try{
            await this.client.connect();
            this.db = this.client.db(this.database);
            this.alive = true;
        }
        catch{
            this.alive = false
        }
    }
    isAlive()
    {
        return this.alive;
    }
    async nbUsers(){
        const userCollection = this.db.collection('users');
        const users = await userCollection.find({}).toArray();
        return users.length;
    }
    async nbFiles(){
        const filesCollection = this.db.collection('files');
        const files = await filesCollection.find({}).toArray();
        return files.length;
    }
}
const dbClient  = new DBClient();
module.exports = dbClient;