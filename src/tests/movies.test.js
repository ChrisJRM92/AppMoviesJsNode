const supertest = require("supertest");
const app = require('../server');
const { Genre, Actor, Director } = require("../models");

let movieId

const movie = {
  name: "El hombre araña",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1280px-Spider-Man.jpg",
  synopsis: "lorem ipsun lajdh hgyegjeddb  hdududodjd",
  releaseYear: "2008"
}
const BASE_URL = '/api/v1/movies';


test("Create post->'/movies' return status code 201", async ()=>{
  const res = await supertest(app).post(BASE_URL).send(movie);
  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GetAll Get->'/movies' should return status code 200", async ()=>{
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1)
});

test("GetOne Get->'/movies/:id' should return status code 200", async ()=>{
  const res = await supertest(app).get(`${BASE_URL}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.id).toBe(movieId);
});

test("Update put->'/movies/:id', should return status code 200", async ()=>{
  const directorUpdate = {
    name: "El hombre araña",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1280px-Spider-Man.jpg",
    synopsis: "lorem ipsun lajdh hgyegjeddb  hdududodjd",
    releaseYear: "2009-01-01"
  }
  const res = await supertest(app).put(`${BASE_URL}/${movieId}`).send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.releaseYear).toBe(directorUpdate.releaseYear);
});

//Testing genre in movies
test("Post post->'/movies/:id/genres', should return status code 201", async ()=>{
  const genre = {
    name: "Terror"
  };

  const createGenre = await Genre.create(genre);
  const res = await supertest(app).post(`${BASE_URL}/${movieId}/genres`).send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0]).toBeDefined();
  expect(res.body[0].id).toBe(createGenre.id);
  await createGenre.destroy();
});

//Testing actors in movies
test("Post actors->'/movies/:id/actors' should return status code 201", async ()=>{
  const actor = {
    firstName: "Tobey",
    lastName: "Maguire",
    nationality: "Estadounidense",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/330px-Tobey_Maguire_2014.jpg",
    birthday: "1998-10-12"
  }

  const createActor = await Actor.create(actor);
  const res = await supertest(app).post(`${BASE_URL}/${movieId}/actors`).send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].id).toBe(createActor.id);
  await createActor.destroy()
});

//Testig Directors in movies
test("Post post->'/movies/:id/directors' should return status code 201", async ()=>{
  const director = {
    firstName: "Samuel",
    lastName: "Raimi",
    nationality: "Estadounidense",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sam_Raimi_by_Gage_Skidmore_3.jpg/345px-Sam_Raimi_by_Gage_Skidmore_3.jpg",
    birthday: "1959-10-23"
  };

  const createDirector = await Director.create(director);
  const res = await supertest(app).post(`${BASE_URL}/${movieId}/directors`).send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0]).toBeDefined();
  expect(res.body[0].id).toBe(createDirector.id)
  await createDirector.destroy();
});

test("Delete delete->'/movies/:id' should return status code 204", async ()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${movieId}`);
  expect(res.status).toBe(204);
});

