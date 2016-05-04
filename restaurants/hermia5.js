"user strict";
const sodexo = require('./helpers/sodexo');

const menu = () => {
	return sodexo.getMenu('http://www.sodexo.fi/ruokalistat/output/daily_json/134/', 'Hermia 5');
};

module.exports = {
	menu : menu
};