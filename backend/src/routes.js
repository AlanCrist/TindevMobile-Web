const express = require('express');
const devController = require('./controllers/devController');
const likesController = require('./controllers/likesController');
const dislikesController = require('./controllers/dislikesController');

const routes = express.Router();

routes.get('/devs', devController.index)
routes.post('/devs', devController.store);
routes.post('/devs/:devId/likes', likesController.store);
routes.post('/devs/:devId/dislikes', dislikesController.store);

module.exports = routes;