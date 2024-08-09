const express = require('express');
const moviesRouter = require('./movies.routes');
const genresRouter = require('./genres.routes');
const actorRouter = require('./actors.routes');
const directorRouter = require('./directors.routes');
const router = express.Router();


router.use('/movies', moviesRouter);

router.use('/actors', actorRouter);
router.use('/directors', directorRouter);
router.use('/genres', genresRouter);

module.exports = router;
