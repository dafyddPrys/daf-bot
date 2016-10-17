'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hello, I\'m Daf\'s Bot.')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`OK. I shall call you ${name} The Great.
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Right, that's pretty much it from me ` +
                  ` at the moment - Daf's fiddling around with my backend (cheeky). `))
                .then(() => bot.say('Get in touch with the REAL Daf using the email address below. ' +
                'He\'s always game for a new project or ideas you want to share.'))
                .then(() => 'finish');
        }
    }
});
