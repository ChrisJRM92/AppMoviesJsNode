const Actor = require("./actors");
const Director = require("./directors");
const Genre = require("./genres");
const Movie = require("./movies");

Movie.belongsToMany(Actor, {through: 'actorMovies'})
Actor.belongsToMany(Movie, {through: 'actorMovies'})

Movie.belongsToMany(Genre, {through: 'genreMovies'})
Genre.belongsToMany(Movie, {through: 'genreMovies'})

Movie.belongsToMany(Director, {through: 'directorMovies'})
Director.belongsToMany(Movie, {through: 'directorMovies'})


// hasMany (de uno a mucho) 
// belongToMany (muchos a muchos)


module.exports = {
  Actor,
  Director,
  Genre,
  Movie
}