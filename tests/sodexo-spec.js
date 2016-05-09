const sodexo = require('../restaurants/helpers/sodexo'),
    should = require('should');

describe("Sodexo", () => {
    describe("menu", () => {
        it("returns valid sodexo menu", () => {
            return sodexo.getMenu('http://www.sodexo.fi/ruokalistat/output/daily_json/134/', 'Hermia 5').then(m => {
                m.should.have.property('title','Hermia 5');
                m.should.have.property('text');
                m.text.should.startWith('• ');
                m.should.have.property('color');  
            });
        });

        it("returns empty menu with invalid data", () => {
            return sodexo.getMenu('http://www.google.com', 'Hermia 6').then(m => {
                m.should.have.property('title', 'Hermia 6');
                m.should.have.property('text', '• Sorry, menu is not available today');
                m.should.have.property('color');
            });
        });

         it("returns empty menu with invalid url", () => {
            return sodexo.getMenu('http://localhost:3000', 'Hermia 5').then(m => {
                m.should.have.property('title', 'Hermia 5');
                m.should.have.property('text', '• Sorry, menu is not available today');
                m.should.have.property('color');
            });
        });
    });
});