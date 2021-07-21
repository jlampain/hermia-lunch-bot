"use strict";
const rp = require('request-promise'),
    cheerio = require('cheerio'),
    moment = require('moment');

/**
 * Scrapes lunch menu from linkosuo web pages 
 * @param  {string} url 
 * @param  {string} restaurant name
 * @return {object} lunch menu in slack message attachemnt
 */
const getMenu = (url, title) => {
    let attachment = {};
    attachment.title = title;
    attachment.color = '#36a64f';
    let options = {
        uri: url,
        transform: body => {
            return cheerio.load(body);
        }
    };
    return new Promise((resolve, reject) => {
        rp(options)
            .then($ => {
                let str = $('.wp-block-lunch-single').html();
                str = str.split(moment().format("dddd DD.MM"))[1];
                str = str.split('<dt>' + moment().add(1, 'days').format("dddd DD.MM"))[0];
                attachment.text = $(str).text() != 'undefined' ? '• ' + $(str).text().replace(/(\r\n|\n|\r)/gm,"\n• ") : '• Sorry, menu is not available today';
                resolve(attachment);
            })
            .catch(err => {
                attachment.text = '• Sorry, menu is not available today';
                resolve(attachment);
            });
    });
};

module.exports = {
    getMenu: getMenu
};