const express = require('express');
const DevController = require('./controllers/dev.controller');
const AuthController = require('./controllers/auth.controller');
const LikeController = require('./controllers/like.controller');
const DislikeController = require('./controllers/dislike.controller');

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.authenticate);

routes.get('/devs', AuthController.verifyToken ,DevController.index);
routes.post('/devs/:devId/likes', AuthController.verifyToken, LikeController.store);
routes.post('/devs/:devId/dislikes', AuthController.verifyToken, DislikeController.store);

module.exports = routes;