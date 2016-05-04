"user strict";
const linkosuo = require('./helpers/linkosuo');

const menu = () => {
	return linkosuo.getMenu('http://www.linkosuo.fi/kahvilat/ravintola-hertta/lounaslista-hertta.html', 'Hertta');
};

module.exports = {
	menu : menu
};