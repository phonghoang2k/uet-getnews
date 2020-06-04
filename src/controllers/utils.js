const https = require("https");

const subscribers = require("./core/subscribers");
const config = require("../../custom/config");
const language = require("../../custom/language");
const facebook = require("./platform/facebook");
const news = require("./core/news");

async function broadcast(messageData) {
    var subscribers_data = await subscribers.read();
    if (subscribers_data) {
        subscribers_data.forEach((element, i) => {
            setTimeout(() => {
                facebook.sendNewsThumbnail(messageData, element.id);
                facebook.sendNewsDescription(messageData, element.id);
            }, 500);
        });
    }
}

exports.autoUpdateNews = () => {
    setInterval(async () => {
        let latest_news = await news.getStarted();
        let current_news = await news.read();

        if (latest_news.url !== current_news.url) {
            broadcast(latest_news);
            news.delete();
            news.create(
                latest_news.title,
                latest_news.image_url,
                latest_news.url
            );
        }
    }, 600000);
};

exports.processEvent = (event) => {
    console.log(event);
    if (event.read) {
        event.message = {
            text: "",
        };
    }
    let sender = event.sender.id;
    if (event.postback && event.postback.payload) {
        event.message = {
            text: event.postback.payload,
        };
    }

    if (event.message) {
        // test
        if (event.message.delivery) {
            return;
        }

        let text = "";
        if (event.message.quick_reply && event.message.quick_reply.payload) {
            text = event.message.quick_reply.payload;
        } else if (event.message.text) {
            text = event.message.text;
        }

        // fetch user state
        subscribers.find(sender, async (data) => {
            let command = "";
            if (text.length < 20) {
                command = text.toLowerCase().replace(/ /g, "");
            }

            if (command === "ʬ") {
                facebook.sendMessageButtons(
                    sender,
                    language.FIRST_COME,
                    true,
                    true,
                    true
                );
                return;
            }

            if (command === language.KEYWORD_MENU) {
                facebook.sendMessageButtons(
                    sender,
                    language.MENU,
                    true,
                    true,
                    true
                );
            }

            if (command === language.KEYWORD_LATEST) {
                let latest_news = await news.read();
                facebook.sendNewsDescription(latest_news, sender);
                facebook.sendNewsThumbnail(latest_news, sender);
            } else if (command === language.KEYWORD_ALL) {
                let eight_news = await news.getNews(
                    await news.getRawData(),
                    "all"
                );
                facebook.sendMultipleNews(eight_news, sender);
            } else if (command === language.KEYWORD_SUBSCRIBE) {
                if (data) {
                    facebook.sendFacebookAPI(sender, {
                        text: "Bạn đã đăng ký từ trước đó",
                    });
                } else {
                    facebook.getUserData(
                        config.FB_PAGE_ACCESS_TOKEN,
                        sender,
                        (data) => {
                            if (data) {
                                subscribers.create(
                                    sender,
                                    data.first_name,
                                    data.last_name
                                );
                                facebook.sendFacebookAPI(sender, {
                                    text: "Bạn đã đăng ký thành công",
                                });
                            }
                        }
                    );
                }
                setTimeout(() => {
                    facebook.sendSubscribeButtons(sender, "Bạn có muốn", false);
                }, 1000);
            } else if (command === language.KEYWORD_UNSUBSCRIBE) {
                if (data) {
                    subscribers.delete(sender);
                    facebook.sendFacebookAPI(sender, {
                        text: "Bạn đã hủy đăng ký thành công",
                    });
                } else {
                    facebook.sendFacebookAPI(sender, {
                        text: "Bạn không thể hủy khi chưa đăng ký",
                    });
                }
                setTimeout(() => {
                    facebook.sendSubscribeButtons(
                        sender,
                        "Bạn có muốn",
                        true,
                        false
                    );
                }, 1000);
            }
        });
    }
};
