'use strict';

process.env.MARVEL_ENDPOINT = "https://gateway.marvel.com";
process.env.ts = 1;
process.env.MARVEL_API_KEY="f77d7d34eaf5b6a881f46028c6fa0413";
process.env.MARVEL_PRIVATE_KEY = "675608ba02c04b890a7c8b58c1942447418d6337";

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should()
const expect = chai.expect;

const server = require('../../../index')

// controller mocks
const characterHeroesMock = require('../../../mocks/characters/heroes.json');
const characterHeroMock = require('../../../mocks/characters/hero.json');

describe('GET /characters', () => {
  it('should return a list of characters when called', done => {
    chai
      .request(server)
      .get('/characters?limit=10&offset=1')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(characterHeroesMock);
        done();
      });
  });
})
describe('GET /characters/:characterId', () => {
  it('should return a character when called', done => {
    chai
      .request(server)
      .get('/characters/1009571')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(characterHeroMock);
        done();
      });
  });

  it('should return invalid request if characterId is not an integer', done => {
    chai
      .request(server)
      .get('/characters/10095a')
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('should return 404 if hero is not found', done => {
    chai
      .request(server)
      .get('/characters/100951')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
})