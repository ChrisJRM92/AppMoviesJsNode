const { getAll, create, getOne, destroy, update } = require('../controllers/movies.controller');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route("/")
		.get(getAll)
		.post(create)

moviesRouter.route("/:id")
		.get(getOne)
		.delete(destroy)
		.put(update)

module.exports = moviesRouter;