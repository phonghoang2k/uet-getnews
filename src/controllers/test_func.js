const config = require("../../custom/config");
const utils = require("./utils");
const subscribers = require("./core/subscribers");
const facebook = require("./platform/facebook");
const news = require("./core/news");

const { handleSuccess, handleError } = require("../helpers/response");

module.exports.verify = async (req, res, next) => {
    if (req.query["hub.verify_token"] === config.FB_PAGE_VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    } else {
        res.send("Error, wrong token");
    }

    // var a = {
    //     image_url:
    //         "https://uet.vnu.edu.vn/wp-content/uploads/2017/10/THONG-BAO-HOC-BONG.jpg",
    //     title:
    //         "Đăng ký tham gia chương trình học bổng Yamada, năm học 2019-2020",
    //     url:
    //         "https://uet.vnu.edu.vn/dang-ky-tham-gia-chuong-trinh-hoc-bong-yamada-nam-hoc-2019-2020/",
    // };

    // await facebook.sendNewsThumbnail(a, "3294845787206281");
    // facebook.sendNewsDescription(a, "3294845787206281");
    // handleSuccess(res, "", "Doneeee");

    // news.create(
    //     "Đăng ký tham gia chương trình học bổng Yamada, năm học 2019-2020",
    //     "https://uet.vnu.edu.vn/wp-content/uploads/2017/10/THONG-BAO-HOC-BONG.jpg",
    //     "https:// uet.vnu  .edu.vn/dang-  -tham-gia-chuong-trinh-hoc-bong-yamada-nam-hoc-2019-2020/"
    // ).then((data) => {
    //     handleSuccess(res, data);
    // });
    // var a = await news.delete();
    // handleSuccess(res, a);
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
