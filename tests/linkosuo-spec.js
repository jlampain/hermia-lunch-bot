"user strict";
const linkosuo = require('../restaurants/helpers/linkosuo'),
    should = require('should'),
    moment = require('moment');

/*
Set the Fi locale, this will help us to parse linkosuo menus
 */
moment.updateLocale('fi', {
    weekdaysMin: "Su_Ma_Ti_Ke_To_Pe_La".split("_")
});


describe("Linkosuo", () => {
    describe("menu", () => {
        it("returns valid linkosuo menu", () => {
            return linkosuo.getMenu('https://www.linkosuo.fi/toimipaikat/orvokki', 'Orvokki').then(m => {
                m.should.have.property('title','Orvokki');
                m.should.have.property('text');
                m.text.should.startWith('• ');
                m.should.have.property('color');
            });
        });

        it("returns empty menu with invalid data", () => {
            return linkosuo.getMenu('http://www.google.com', 'Orvokki').then(m => {
                m.should.have.property('title', 'Orvokki');
                m.should.have.property('text', '• Sorry, menu is not available today');
            });
        });

         it("returns empty menu with invalid url", () => {
            return linkosuo.getMenu('http://localhost:3000', 'Orvokki').then(m => {
                m.should.have.property('title', 'Orvokki');
                m.should.have.property('text', '• Sorry, menu is not available today');
                m.should.have.property('color');
            });
        });

    });
});