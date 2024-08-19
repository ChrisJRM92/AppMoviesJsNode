const supertest = require('supertest')
const app = require('../server');

const dataTest = {
  firstName: "Samuel",
  lastName: "Raimi",
  nationality: "Estadounidense",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sam_Raimi_by_Gage_Skidmore_3.jpg/345px-Sam_Raimi_by_Gage_Skidmore_3.jpg",
  birthday: "1959-10-23"
};

let directorId
const BASE_URL = '/api/v1/directors'

test("Create Post->'/directors' should return status code 201", async ()=>{
  const res = await supertest(app).post(BASE_URL).send(dataTest);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(dataTest.firstName);
});

test("GetAll get->'/directors' should return status code 200", async ()=>{
  const res = await supertest(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GetOne get->'/directors/:id' shuld resturn status code 200", async ()=>{
  const res = await supertest(app).get(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.lastName).toBe(res.body.lastName);
});

test("Update put->'/directors/:id' shuld return status code 200",  async ()=>{
  const updateDirector ={
    firstName: "Samuel",
    lastName: "Raimi",
    nationality: "EEUU",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sam_Raimi_by_Gage_Skidmore_3.jpg/345px-Sam_Raimi_by_Gage_Skidmore_3.jpg",
    birthday: "1959-10-23"
  };

  const res = await supertest(app).put(`${BASE_URL}/${directorId}`).send(updateDirector);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.nationality).toBe(updateDirector.nationality);
});

test("Delete delete->'/directors' should return status code 204", async ()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${directorId}`);
  expect(res.status).toBe(204);
});