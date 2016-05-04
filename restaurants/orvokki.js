"user strict";
const linkosuo = require('./helpers/linkosuo');

const menu = () => {
	return linkosuo.getMenu('http://www.linkosuo.fi/kahvilat/ravintola-orvokki/lounaslista-orvokki.html', 'Orvokki');
};

module.exports = {
	menu : menu
};