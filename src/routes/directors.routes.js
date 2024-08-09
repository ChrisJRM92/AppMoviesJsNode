const { getAll, create, getOne, destroy, update } = require('../controllers/directors.controller')
const express = require('express');

const directorRouter = express.Router();

directorRouter.route("/")
		.get(getAll)
		.post(create)

directorRouter.route("/:id")
		.get(getOne)
		.delete(destroy)
		.put(update)

module.exports = directorRouter;