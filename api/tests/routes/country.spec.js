/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');

const agent = session(app);
describe('Routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);

    })
  )
  beforeEach(() => conn.sync({ force: false }));

  describe('GET /countries', () => {
    it("Expects content type to be JSON ", () => {
      agent.get("/countries").expect("Content-Type", /json/);
    })

  })
  describe('GET /activity', () => {
    it("Expects content type to be JSON", () => {
      agent.get("/activity").expect("Content-Type", /json/);
    })
  })
  describe('POST /activity',() =>{
    it('Expects content type to be JSON',()=>{
      agent.post('/activity')
      .send({ name: "Futbol",
        difficulty: "5",
        duration: "4",
        season: "Summer",
      })
      .then(()=>{
        expect("Content-Type", /json/)
      })
    })
  })
})