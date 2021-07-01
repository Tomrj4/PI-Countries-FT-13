const { Country, conn, Activity } = require('../../src/db.js');
const { expect, should } = require('chai');


describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      })
      it('should throw an error if name is null', (done) => {
        Activity.create({
          name: null,
          difficulty: "3",
          duration: "3hs",
          season: "Winter"
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if season is null', (done) => {
        Activity.create({
          name: "Drafting",
          difficulty: "3",
          duration: "3hs",
          season: null,
        })
          .then(() => done(new Error('It requires a valid season')))
          .catch(() => done());
      });
    })
  });
});

