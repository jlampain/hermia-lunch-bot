"user strict";
const sodexo = require('./helpers/sodexo');

const menu = () => {
	return sodexo.getMenu('https://www.sodexo.fi/ravintolat/tampere/hermia-6', 'Hermia 6');
};

module.exports = {
	menu : menu
};