const { getAll, create, getOne, destroy, update } = require('../controllers/genres.controller')
const express = require('express');

const genresRouter = express.Router();

genresRouter.route("/")
		.get(getAll)
		.post(create)

genresRouter.route("/:id")
		.get(getOne)
		.delete(destroy)
		.put(update)

module.exports = genresRouter;