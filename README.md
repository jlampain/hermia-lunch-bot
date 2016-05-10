# Hermia-Lunch-Bot

[![Build Status](https://travis-ci.org/jlampain/hermia-lunch-bot.svg?branch=master)](https://travis-ci.org/jlampain/hermia-lunch-bot) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jlampain/hermia-lunch-bot/master/LICENSE)

Slackbot which displays lunch menus in Hermia campus area: [Hermia 5](http://www.sodexo.fi/hermia5), [Hermia 6](http://www.sodexo.fi/hermia6), [Hertta](http://www.linkosuo.fi/kahvilat/ravintola-hertta.html) and [Orvokki](http://www.linkosuo.fi/kahvilat/ravintola-orvokki.html). Kudos to this [nice tutorial](https://blog.heroku.com/archives/2016/3/9/how-to-deploy-your-slack-bots-to-heroku) from Heroku folks.

![Hermia-Lunch-Bot](https://raw.githubusercontent.com/jlampain/hermia-lunch-bot/master/sample/lunchbot.png "Hermia-Lunch-Bot")

### Supported `/slash` commands

Create a `/lunch` [custom slash command](https://api.slack.com/slash-commands), using the URL: `{your-app-url}/commands/lunchbot`. Take note of the provided `token`, this is used to verify requests come from Slack - `LUNCHBOT_COMMAND_TOKEN` config variable.

- `/lunch` - Displays all lunch menus
- `/lunch orvokki` - Displays Orvokki lunch menu
- `/lunch hermia` - Displays Hermia 5 & Hermia 6 lunch menus

### Install

```shell
$ npm install
```

### Copy `.sample` to `.env`

```shell
$ cp .env_sample .env
```

### Configure

```shell
LUNCHBOT_COMMAND_TOKEN=xoxb...
NODE_ENV=development
PORT=3000
```
### Run

```shell
$ npm start

Lunchbot lives on PORT 3000
```

Visit [localhost:3000](http://localhost:3000).

### Add new restaurants

One can add new modules into `/restaurants` folder. Module should fetch the menu from somewhere and return it as [slack message attachment](https://api.slack.com/docs/attachments). Furthermore, one needs to add the new module into `/restaurants/index.js` as well.

### Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Or with the [Heroku Toolbelt](https://toolbelt.heroku.com) and configure `LUNCHBOT_COMMAND_TOKEN` config var via Heroku dashboard.

### Heroku Scheduler

One can add Heroku scheduler to post lunch menus to Slack channel at scheduled time intervals. 

1. Add [incoming web hook to slack](https://my.slack.com/services/new/incoming-webhook/) (take a note to the provided webhook url)
2. Add and configure `LUNCHBOT_WEBHOOK_URL` config var via Heroku dashboard
3. Use [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) to run `npm run notify` once per day for example

### License

MIT