'use strict';

const dotenv = require('dotenv'),
	  ENV = process.env.NODE_ENV || 'development',
	  fs = require('fs');

if (ENV === 'development' && fs.existsSync('.env')) dotenv.load();

const config = {
    PORT: process.env.PORT,
    LUNCHBOT_WEBHOOK_URL: process.env.LUNCHBOT_WEBHOOK_URL,
    LUNCHBOT_COMMAND_TOKEN: process.env.LUNCHBOT_COMMAND_TOKEN,
    ICON_EMOJI: ':fork_and_knife:',
    SLACK_CHANNEL: '#lunch-match-maker'
};

module.exports = (key) => {
    if (!key) return config;

    return config[key];
};