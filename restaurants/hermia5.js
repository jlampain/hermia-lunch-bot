"user strict";
const sodexo = require('./helpers/sodexo');

const menu = () => {
	return sodexo.getMenu('https://www.sodexo.fi/ravintolat/tampere/hermia-5', 'Hermia 5');
};

module.exports = {
	menu : menu
};