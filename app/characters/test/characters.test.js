'use strict';

process.env.MARVEL_ENDPOINT = "https://gateway.marvel.com";
process.env.ts = 1;
process.env.MARVEL_API_KEY="f77d7d34eaf5b6a881f46028c6fa0413";
process.env.MARVEL_PRIVATE_KEY = "675608ba02c04b890a7c8b58c1942447418d6337";

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const services = require('../services');
const controller = require('../controller');

// api mocks
const marvelHeroesMock = require('../../../mocks/api/heroes.json');
const marvelHeroMock = require('../../../mocks/api/hero.json');

// controller mocks
const characterHeroesMock = require('../../../mocks/characters/heroes.json');
const characterHeroMock = require('../../../mocks/characters/hero.json');

describe('Marvel Heroes List', function () {
  afterEach(() => {
    services.fetchAllCharacters.restore();
  });

  it('should return all marvel characters when called', async () => {
    sinon.stub(services, 'fetchAllCharacters')
      .withArgs(10, 1)
      .returns(marvelHeroesMock);
    const response = await controller.getAllCharacters(10, 1);
    expect(response).to.deep.equal(characterHeroesMock);
  })
});

describe('Marvel Hero', function () {
  afterEach(() => {
    services.fetchById.restore();
  });

  it('should return a character supplied with characterId', async () =>  {
    const characterId = 1009571;
    sinon
      .stub(services, 'fetchById')
      .withArgs(characterId)
      .resolves(marvelHeroMock)

    const response = await controller.findById(characterId);
    expect(response).to.deep.equal(characterHeroMock);
  })
});

