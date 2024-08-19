const supertest = require('supertest');
const app = require('../server');

let genreId

const genres = {
  name: 'Horror'
}

const BASE_URL = '/api/v1/genres'

test("Create -> Post '/genres' should return status code 201 and res.body.name = genres.name", async ()=>{
  const res = await supertest(app).post(BASE_URL).send(genres);
  genreId = res.body.id

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("GetAll -> get '/genres' should return a statusCode 200", async ()=>{
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GetOne -> get '/courses/:id' should return status code 200, res.body to be defined and res.body.name === course.name", async ()=>{
  const res = await supertest(app).get(`${BASE_URL}/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("Update -> put '/courses/:id' should return status code 200, res.body.name ==== courseUpdate.name", async ()=>{
  const genreUpdate = {
    name: "Terror"
  }
  const res = await supertest(app).put(`${BASE_URL}/${genreId}`).send(genreUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genreUpdate.name);
});

test("Delete -> delete 'genres/:id' should retruno status code 204", async ()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${genreId}`);
  expect(res.status).toBe(204)
})
