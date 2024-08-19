const supertest = require('supertest');
const app = require('../server');

BASE_URL='/api/v1/actors'
let actorId
const actors = {
  firstName: "Tobey",
  lastName: "Maguire",
  nationality: "Estadounidense",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/330px-Tobey_Maguire_2014.jpg",
  birthday: "1998-10-12"
}

test("Create Post->'actors' should return status code 201", async ()=>{
  const res = await supertest(app).post(BASE_URL).send(actors);

  actorId = res.body.id

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actors.firstName);
});

test("GetAll Get->'actors' should return status code 200", async ()=>{
  const res = await supertest(app).get(BASE_URL);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GetOne -> Get '/actors/:id' should return status code 200", async ()=>{
  const res = await supertest(app).get(`${BASE_URL}/${actorId}`);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.lastName).toBe(actors.lastName);
});

test("Update -> Put '/actors/:id' should resturn status code 200 and update data", async ()=>{
  const updateData = {
    firstName: "Tobey",
    lastName: "Maguire",
    nationality: "EEUU",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/330px-Tobey_Maguire_2014.jpg",
    birthday: "1998-10-12"
  };

  const res = await supertest(app).put(`${BASE_URL}/${actorId}`).send(updateData);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.nationality).toBe(updateData.nationality);
});

test("Delete delete->'/actors/:id' should return status code 204", async ()=>{
  const res = await supertest(app).delete(`${BASE_URL}/${actorId}`);
  expect(res.status).toBe(204);
});
