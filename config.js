/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') dotenv.load();

const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    LUNCHBOT_WEBHOOK_URL: process.env.LUNCHBOT_WEBHOOK_URL,
    LUNCHBOT_COMMAND_TOKEN: process.env.LUNCHBOT_COMMAND_TOKEN,
    ICON_EMOJI: ':fork_and_knife:',
    SLACK_CHANNEL: '#tests'
};

module.exports = (key) => {
    if (!key) return config;

    return config[key];
};