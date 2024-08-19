const { Movie } = require("../models");
const Actor = require("../models/actors");
const catchError = require("../utils/catchError");


const getAll = catchError(async(req, res) => {
  const result = await Actor.findAll() //select * from user
  return res.status(200).json(result)
});

const create = catchError(async(req, res) =>{
  const result = await Actor.create(req.body)
  // consolelog(req.body)
  return res.status(201).json(result)
})

const getOne = catchError(async(req, res) =>{
  const id = req.params.id
  // const {id} = req.params
  const result = await Actor.findByPk(id)
  return res.status(200).json(result)
})

const destroy = catchError(async(req, res) =>{
  const id = req.params.id
  // const {id} = req.params
  const result = await Actor.destroy({ where: {id: id}})
  if (!result) return res.status(404).json("User not found")
  return res.sendStatus(204)
})

const update = catchError(async(req, res) =>{
  const {id} = req.params
  const car = await Actor.update(
    req.body,
    {where: {id : id}, returning: true}
  )
  if (car[0] === 0 ) return res.sendStatus(404)
  return res.status(200).json(car[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update,
}