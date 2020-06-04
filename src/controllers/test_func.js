const config = require("../../custom/config");
const utils = require("./utils");
const subscribers = require("./core/subscribers");
const facebook = require("./platform/facebook");
const news = require("./core/news");

const { handleSuccess, handleError } = require("../helpers/response");

module.exports.verify = async (req, res, next) => {
    // if (req.query["hub.verify_token"] === config.FB_PAGE_VERIFY_TOKEN) {
    //     res.send(req.query["hub.challenge"]);
    // } else {
    //     res.send("Error, wrong token");
    // }

    // var a = {
    //     image_url:
    //         "https://uet.vnu.edu.vn/wp-content/uploads/2017/10/THONG-BAO-HOC-BONG.jpg",
    //     title:
    //         "Đăng ký tham gia chương trình học bổng Yamada, năm học 2019-2020",
    //     url:
    //         "https://uet.vnu.edu.vn/dang-ky-tham-gia-chuong-trinh-hoc-bong-yamada-nam-hoc-2019-2020/",
    // };

    // // var b = [];
    // facebook.sendNewsThumbnail(a, "2658496570923308").then(() => {
    //     facebook.sendNewsDescription(a, "2658496570923308");
    // });
    // var a = await news.getRawData();
    // var b = await news.getNews(a, "latest");
    // console.log(b[0]);
    // let a = await news.getStarted();

    // facebook.sendSubscribeButtons("3294845787206281", "", true, true);
    // news.create(a.title, a.url, a.url);
    // subscribers.delete("18020998")

    // var a = await subscribers.read();
    // console.log(a);
    // await facebook.sendMultipleNews(b, "3294845787206281");
    // facebook.sendNewsThumbnail(a, "3294845787206281");
    // facebook.sendNewsDescription(a, "3294845787206281");

    // subscribers.create("180230998", "Phong", "Phong");

    // var a = await utils.broadcast();
    handleSuccess(res, "");
};

module.exports.postData = async (req, res, next) => {
    if (!req.isXHub || !req.isXHubValid()) {
        res.send("ERR: cannot verify X-Hub Signature");
        return;
    }
    res.sendStatus(200);
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        utils.processEvent(messaging_events[i]);
    }
};
