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
                $('.space').remove();
                $('.line').remove();
                $('span').remove();
                $('#lunch-content-table .show').each(function() {
                    if ($(this).find('tr > [align=left]').first().text().trim() === moment().format("dddd")) {
                        $(this).find('tr').each(function(i) { 
                            if (i > 0) {
                                attachment.text = attachment.text + '• ' + $(this).find('[align=left]').text().trim() + '/n';
                            }
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