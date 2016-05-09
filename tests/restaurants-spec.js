
const restaurants = require('../restaurants'),
	  should = require('should');

describe("Restaurants", () => {
  describe("menus", () => {
    it("returns all menus", () => {     
        return restaurants.menus().then(m => {
        	m.should.be.instanceof(Array);
        	(m.length).should.be.aboveOrEqual(4);
        });
      });
    });
  });