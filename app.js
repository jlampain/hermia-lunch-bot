"user strict";
const moment = require('moment'),
    _ = require('lodash'),
    restaurants = require('./restaurants'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    config = require('./config'),
    msgDefaults = {
        response_type: 'in_channel',
        username: 'lunchbot',
        icon_emoji: config('ICON_EMOJI')
    };

module.exports = app; // for testing

/*
Set the Fi locale, this will help us to parse linkosuo menus
 */
moment.updateLocale('fi', {
    weekdaysMin: "Su_Ma_Ti_Ke_To_Pe_La".split("_"),
    weekdays: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai']
});

/*
Express
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("I'm lunch-bot");
});
 
/*
Handle bot commands
 */
app.post('/commands/lunchbot', (req, res) => {
    let payload = req.body;
    if (!payload || payload.token !== config('LUNCHBOT_COMMAND_TOKEN')) {
        let error = { err : 'Invalid slack token'};
        res.status(401).json(error);
        return;
    } else {
        // get menus
        restaurants.menus().then(m => {
            // filter if needed
            if (payload.text) {
                let f = _.filter(m, attachment => {
                    return attachment.title.match(new RegExp(payload.text, 'i'));
                });
                if (!_.isEmpty(f)) {
                    m = f;
                }
            }
            // response back to slack
            let msg = _.defaults({
                channel: payload.channel_name,
                attachments: m
            }, msgDefaults);
            res.set('content-type', 'application/json');
            res.status(200).json(msg);
            return;
        });
    }
});

app.listen(config('PORT'), (err) => {
    if (err) throw err;
    console.log('Lunchbot lives on PORT ' + config('PORT'));
});