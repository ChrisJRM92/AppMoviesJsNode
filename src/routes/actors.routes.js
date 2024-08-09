const { getAll, create, getOne, destroy, update, setMovie } = require('../controllers/actors.controller')
const express = require('express');

const actorRouter = express.Router();

actorRouter.route("/")
		.get(getAll)
		.post(create)

actorRouter.route("/:id")
		.get(getOne)
		.delete(destroy)
		.put(update)

actorRouter.route('/:id/actors').post(setMovie)

module.exports = actorRouter;