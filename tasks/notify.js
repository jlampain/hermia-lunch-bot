/*
This could be run for example once per day
via Heroku scheduler extension 
*/
"use strict";
const Slack = require('slack-node'),
    slack = new Slack(),
    moment = require('moment'),
    config = require('../config'),
    restaurants = require('../restaurants');

/*
Set the Fi local, this will help us to parse linkosuo menus
 */
moment.locale('fi', {
    weekdaysMin: "Su_Ma_Ti_Ke_To_Pe_La".split("_")
});

slack.setWebhook(config('LUNCHBOT_WEBHOOK_URL'));

// skip weekends
if (moment().format('dd') != 'Su' && moment().format('dd') != 'La') {
    //get the menus and post to slack
    restaurants.menus().then(m => {
        slack.webhook({
            channel: config('SLACK_CHANNEL'),
            username: "lunchbot",
            icon_emoji: config('ICON_EMOJI'),
            text: "What to eat today in Hermia?",
            attachments: m
        }, (err, response) => {
            if (err) {
                console.log(err);
            } else {
            	console.log('menu delivered');
            }
        });
    });
}