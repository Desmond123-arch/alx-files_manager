import dbClient from '../utils/db';
// import redisClient from '../utils/redis';
const sha1 = require('sha1');


exports.postNew = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email === undefined) {
        return res.status(400).send({error: 'Missing email'});
    }
    if (password === undefined) {
        return res.status(400).send({error: 'Missing password'});
    }
    const users = dbClient.db.collection('users');
    const query = { "email": email }
    const user = await users.findOne(query);
    if (user) {
        return res.status(400).send("Already exist");
    }
    else{
        const hash = sha1(password);
        const newUser = {
            'email': email,
            'password': hash
        }
        users.insertOne(user);
        return res.sendStatus(200);
    }
}