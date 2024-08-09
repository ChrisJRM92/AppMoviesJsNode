const Actor = require("./actors");
const Director = require("./directors");
const Genre = require("./genres");
const Movie = require("./movies");

Movie.belongsTo(Director)
Genre.hasMany(Movie)


Movie.belongsToMany(Actor, {through: 'movieActors'}) //Tiene muchos
Actor.belongsToMany(Movie, {through: 'actorMovies'})



// hasMany (de uno a mucho) 
// belongToMany (muchos a muchos)


module.exports = {
  Actor,
  Director,
  Genre,
  Movie
}