'use strict';
const rp = require('request-promise'),
  cheerio = require('cheerio');

/**
 * Scrapes lunch menu from sodexo web pages
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
        let key;
        $('#menuviewblock li').each(function(i) {
          if (
            $(this)
              .text()
              .trim() === 'Tänään'
          ) {
            key = $(this).children()[0].attribs.href;
          }
        });
        if (key) {
          $(key + ' .meal-name').each(function() {
            attachment.text = attachment.text  + `• ${$(this).text()}\n`;
          });
        }
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
