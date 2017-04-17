"user strict";
const linkosuo = require('./helpers/linkosuo');

const menu = () => {
	return linkosuo.getMenu('https://www.linkosuo.fi/toimipaikat/hertta', 'Hertta');
};

module.exports = {
	menu : menu
};