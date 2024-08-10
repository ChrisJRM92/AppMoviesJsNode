const { getAll, create, getOne, destroy, update, setGenres, setActors, setDirectors } = require('../controllers/movies.controller');
const express = require('express');

const moviesRouter = express.Router();

moviesRouter.route("/").get(getAll).post(create);

moviesRouter.route("/:id").get(getOne).delete(destroy).put(update);

moviesRouter.route('/:id/genres').post(setGenres);
moviesRouter.route('/:id/actors').post(setActors);
moviesRouter.route('/:id/directors').post(setDirectors);

module.exports = moviesRouter;