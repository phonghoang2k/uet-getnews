const config = require('../../custom/config');
const utils = require('./utils');


module.exports.verify = async (req, res, next) => {
    if (req.query['hub.verify_token'] === config.FB_PAGE_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong token');
    }
}

module.exports.postData = async (req, res, next) => {
    if (!req.isXHub || !req.isXHubValid()) {
        res.send('ERR: cannot verify X-Hub Signature');
        return;
    }

    res.sendStatus(200);
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        utils.processEvent(messaging_events[i]);
    }
}