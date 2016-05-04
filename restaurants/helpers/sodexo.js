"use strict";
const   rp = require('request-promise'),
         _ = require('lodash');

/**
 * Fetches lunch menu via sodexo REST API
 * @param  {string} url 
 * @param  {string} restaurant name
 * @return {object} lunch menu in slack message attachemnt
 */
const getMenu = (url, title) => {
    let attachment = {};
    attachment.title = title;
    attachment.color = '#36a64f';
    attachment.text = '';
    let d = new Date();
    let options = {
        uri: url + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/fi'
    };
    return new Promise((resolve, reject) => {
        rp(options)
            .then(body => {
                let list = JSON.parse(body);
                if (list.hasOwnProperty('courses') && !_.isEmpty(list.courses)) {
                    list.courses.forEach(function(entry, index) {
                        if (index === 0) {
                            attachment.text = '• ' + entry.title_fi;
                        } else {
                            attachment.text = attachment.text + '\n• ' + entry.title_fi;
                        }
                    });
                } else {
                    attachment.text = 'Sorry, menu is not available today';
                }
                resolve(attachment);
            })
            .catch(err => {
                attachment.text = 'Sorry, menu is not available today';
                resolve(attachment);
            });
    });
};

module.exports = {
    getMenu : getMenu
};