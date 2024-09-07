import AppController from "../controllers/AppController"
import UserController from "../controllers/UsersController"
const express = require('express');

const router = express.Router();
module.exports = function(app){
    app.get('/status', AppController.getStatus);
    
    app.get('/stats', AppController.getStats);
    app.post("/users", UserController.postNew);
}