import { createClient } from "redis";

class RedisClient {


    constructor() {
        this.client = createClient();
        this.alive = false;

        this.client.on('error', err => { console.log(err); this.alive = false })
        this.client.on('connect', () => { this.alive = true });
    }
    isAlive() {
        
        return this.client.connected;
    };
}
const redisclient = new RedisClient();
module.exports = redisclient;