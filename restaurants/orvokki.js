"user strict";
const linkosuo = require('./helpers/linkosuo');

const menu = () => {
	return linkosuo.getMenu('https://www.linkosuo.fi/toimipaikat/orvokki', 'Orvokki');
};

module.exports = {
	menu : menu
};