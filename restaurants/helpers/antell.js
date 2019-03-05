"use strict";
const rp = require('request-promise'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    _ = require('lodash');

/**
 * Scrapes lunch menu from antell web pages 
 * @param  {string} url 
 * @param  {string} restaurant name
 * @return {object} lunch menu in slack message attachemnt
 */
const getMenu = (url, title) => {
    let attachment = {};
    attachment.title = title;
    attachment.color = '#36a64f';
    attachment.text = '';
    let options = {
        uri: url,
        transform: body => {
            return cheerio.load(body);
        }
    };
    return new Promise((resolve, reject) => {
        rp(options)
            .then($ => {
                $('.reveal-slideup-delay-0').each(function() {
                    if ($(this).find('h3').first().text().trim().split(' ')[0] === moment().format("dddd")) {
                        $(this).find('.price').remove();
                        $(this).find('span').remove();
                        $(this).find('li').each(function(i) {
                            if ($(this).attr('class') !== 'menu-item-category') {
                                attachment.text = attachment.text + '• ';
                            }
                            attachment.text = attachment.text + $(this).text().replace(/[^a-zA-Z0-9äöüÄÖÜß]/g,' ').trim() + '\n';
                        });
                    }
                });
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