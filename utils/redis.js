import { createClient } from "redis";
const { promisify } = require('util');

class RedisClient {


    constructor() {
        this.client = createClient();
        this.alive = false;
        this.client.on('error', err => { console.log(err); this.alive = false })
        this.client.on('connect', () => { this.alive = true });

        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.setex).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }
    isAlive() {
        return this.alive;
    };
    async get(key)
    {
        return this.getAsync(key);
    }
    async set(key, value, duration)
    {
        return this.setAsync(key, duration, value);
    }
    async del(key)
    {
        return this.delAsync(key);
    }
}
const redisclient = new RedisClient();
module.exports = redisclient;