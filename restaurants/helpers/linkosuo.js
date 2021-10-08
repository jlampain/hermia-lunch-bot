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
                const selector = $('#current-week-lunch');
                const today = new Date();
                $(selector).find('dd').each(function (index) {
                    if (today.getDay() - 1 === index) {
                        attachment.text = $(this).text();
                    }
                });
                if (!attachment.text) {
                    attachment.text = '• Sorry, menu is not available today';
                }
                resolve(attachment);
            })
            .catch(err => {
                console.log(err);
                attachment.text = '• Sorry, menu is not available today';
                resolve(attachment);
            });
    });
};

module.exports = {
    getMenu: getMenu
};