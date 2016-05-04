"user strict";
const sodexo = require('./helpers/sodexo');

const menu = () => {
	return sodexo.getMenu('http://www.sodexo.fi/ruokalistat/output/daily_json/9870/', 'Hermia 6');
};

module.exports = {
	menu : menu
};