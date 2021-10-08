"user strict";
const linkosuo = require('./helpers/linkosuo');

const menu = () => {
	return linkosuo.getMenu('https://linkosuo.fi/toimipaikka/hertta/', 'Hertta');
};

module.exports = {
	menu : menu
};