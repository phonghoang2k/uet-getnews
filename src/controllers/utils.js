const https = require("https");

const subscribers = require("./core/subscribers");
const config = require("../../custom/config");
const language = require("../../custom/language");
const facebook = require("./platform/facebook");
const news = require("./core/news");

async function broadcast() {
    var subscribers_data = await news.read();
    if (subscribers_data) {
        subscribers_data.forEach((element, i) => {
            setTimeout(() => {
                facebook.sendFacebookAPI();
            })
            
        });
    }
}

exports.processEvent = (event) => {
    console.log(event);
};
