"user strict";
const antell = require('./helpers/antell');

const menu = () => {
	return antell.getMenu('https://www.antell.fi/lounaslistat/lounaslista.html?owner=342', 'Hermian Farmi');
};

module.exports = {
	menu : menu
};