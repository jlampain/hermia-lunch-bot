"user strict";
const restaurants = [];

// load all restaurants
restaurants.push(require('./orvokki.js'));
restaurants.push(require('./hertta.js'));
restaurants.push(require('./hermia5.js'));
restaurants.push(require('./hermia6.js'));

/**
 * Returns all menus as slack message attachments
 * @return {array} Array of slack message attachments
 */
const menus = () => {
	let p = [];
 	restaurants.forEach(restaurant => { p.push(restaurant.menu()); });   
    return new Promise(function(resolve) {
        Promise.all(p).then(function(m) { 
            resolve(m);
        });  
    });   
};
 
module.exports = {
	menus : menus
};
