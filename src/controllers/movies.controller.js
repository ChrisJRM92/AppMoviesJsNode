const { Actor, Genre, Director } = require("../models");
const Movie = require("../models/movies");
const catchError = require("../utils/catchError");

const getAll = catchError(async(req, res) => {
  const result = await Movie.findAll({include: [Genre, Actor, Director]}) //select * from user     ----     include
  return res.status(200).json(result)
});

const create = catchError(async(req, res) =>{
  const result = await Movie.create(req.body)
  // consolelog(req.body)
  return res.status(201).json(result)
})


const getOne = catchError(async(req, res) =>{
  const id = req.params.id
  // const {id} = req.params
  const result = await Movie.findByPk(id)
  return res.status(200).json(result)
})

const destroy = catchError(async(req, res) =>{
  const id = req.params.id
  // const {id} = req.params
  const result = await Movie.destroy({ where: {id: id}})
  if (!result) return res.status(404).json("User not found")
  return res.sendStatus(204)
})

const update = catchError(async(req, res) =>{
  const {id} = req.params
  const car = await Movie.update(
    req.body,
    {where: {id : id}, returning: true}
  )
  if (car[0] === 0 ) return res.sendStatus(404)
  return res.status(200).json(car[1][0])
})

const setGenres = catchError(async(req, res) => {
  const {id} = req.params;
  const movie = await Movie.findByPk(id)
  await movie.setGenres(req.body)
  const genres = await movie.getGenres()
  return res.json(genres)
});

const setActors = catchError(async(req, res) => {
  const {id} = req.params;
  const movie = await Movie.findByPk(id)
  await movie.setActors(req.body)
  const actors = await movie.getActors()
  return res.json(actors)
});

const setDirectors = catchError(async(req, res) => {
  const {id} = req.params;
  const movie = await Movie.findByPk(id)
  await movie.setDirectors(req.body)
  const directors = await movie.getDirectors()
  return res.json(directors)
});

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update,
    setGenres,
    setActors,
    setDirectors
}
