const axios = require("axios");
const https = require("https");
const config = require("../../../custom/config");
const language = require("../../../custom/language");

exports.getUserData = (accessToken, userId, callback) => {
    var options = {
        host: "graph.facebook.com",
        port: 443,
        path: `/${userId}?access_token=${accessToken}`, //apiPath example: '/me/friends'
        method: "GET",
    };

    var buffer = ""; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, (result) => {
        result.setEncoding("utf8");
        result.on("data", (chunk) => {
            buffer += chunk;
        });

        result.on("end", () => {
            try {
                var data = JSON.parse(buffer);
                callback(data);
            } catch (e) {
                callback({ error: true });
            }
        });
    });
    request.on("error", (e) => {
        console.log("error from facebook.getFbData: " + e.message);
        callback({ error: "facebook.getData Error" });
    });
    request.end();
};

exports.setupFacebookAPI = (token) => {
    axios({
        url: "https://graph.facebook.com/v7.0/me/messenger_profile",
        params: { access_token: token },
        method: "POST",
        data: {
            get_started: {
                payload: "ʬ",
            },
        },
    }).then((res) => {
        console.log(res.data);
    });
    axios({
        url: "https://graph.facebook.com/v7.0/me/thread_settings",
        params: { access_token: token },
        method: "DELETE",
        data: {
            setting_type: "call_to_actions",
            thread_state: "existing_thread",
        },
    }).then((res) => {
        console.log(res.data);
    });
};

exports.quickButtons = [
    {
        content_type: "text",
        title: "Menu",
        payload: language.KEYWORD_MENU,
    },
    {
        content_type: "text",
        title: "Đăng ký :D",
        payload: language.KEYWORD_SUBSCRIBE,
    },
    {
        content_type: "text",
        title: "Hủy đăng ký :<",
        payload: language.KEYWORD_UNSUBSCRIBE,
    },
];

var sendFacebookAPI = (receiver, messageData) => {
    // console.log(messageData);
    if (messageData.text || messageData.attachment) {
        axios({
            url: "https://graph.facebook.com/v7.0/me/messages",
            params: { access_token: config.FB_PAGE_ACCESS_TOKEN },
            method: "POST",
            data: {
                recipient: { id: receiver },
                message: messageData,
                messaging_type: "RESPONSE",
            },
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error sending messages: ", error);
            });
    } else {
        console.log("__sendMessage: err: neither text nor attachment");
        console.log(messageData);
    }
};

exports.sendFacebookAPI = sendFacebookAPI;

exports.sendSeenIndicator = (receiver) => {
    axios({
        url: "https://graph.facebook.com/v7.0/me/messages",
        params: { access_token: config.FB_PAGE_ACCESS_TOKEN },
        method: "POST",
        data: {
            recipient: { id: receiver },
            sender_action: "mark_seen",
            messaging_type: "RESPONSE",
        },
    });
};

exports.sendNewsThumbnail = async (messageData, receiver) => {
    sendFacebookAPI(receiver, {
        attachment: {
            type: "image",
            payload: {
                url: messageData.image_url,
            },
        },
    });
};

exports.sendNewsDescription = async (messageData, receiver) => {
    sendFacebookAPI(receiver, {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: messageData.title,
                buttons: [
                    {
                        type: "web_url",
                        title: "Xem chi tiết",
                        url: messageData.url,
                    },
                ],
            },
        },
    });
};

exports.sendMultipleNews = (messageData, receiver) => {
    sendFacebookAPI(receiver, {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                image_aspect_ratio: "square",
                elements: messageData,
            },
        },
    });
};
