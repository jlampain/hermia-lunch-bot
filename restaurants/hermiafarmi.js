"user strict";
const antell = require('./helpers/antell');

const menu = () => {
	return antell.getMenu('https://www.antell.fi/hermian-farmi', 'Hermian Farmi');
};

module.exports = {
	menu : menu
};