import dbClient from '../utils/db';
import redisClient from '../utils/redis';

exports.getStatus = async (req, res) => {
    const obj = {
        "redis": redisClient.isAlive(),
        "db": dbClient.isAlive(),
    }
    return res.json(obj)
}
exports.getStats = async (req, res) => {
    const obj = {
        "users": await dbClient.nbUsers(),
        "files": await dbClient.nbFiles(),
    }
    return res.json(obj);
}