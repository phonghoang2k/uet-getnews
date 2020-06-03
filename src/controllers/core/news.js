const News = require("../../models/news");
const https = require("https");

// STUFF
const regex = /<div class="item-thumbnail">\s*<a href="(.*?)"\s*title="(.*?)">\s*<img src="(.*?)"/gm;
const url = "https://uet.vnu.edu.vn/category/tin-tuc/tin-sinh-vien/";

module.exports.create = async (title, image_url, url) => {
    let data = {
        title: title,
        image_url: image_url,
        url: url,
    };

    let news = new News(data);
    await news.save({});
};

module.exports.delete = async () => {
    News.deleteMany({}, (err) => {
        if (err) {
            console.log("___delete news error", err);
        }
    });
};

module.exports.read = async () => {
    return await News.findOne({});
};

module.exports.getStarted = async () => {
    return (await getNews(await getRawData(), "latest"))[0];
};

var getRawData = () => {
    return new Promise((resovle, reject) => {
        let buff = "";
        https
            .get(url, (response) => {
                response.on("data", (chunk) => {
                    buff += chunk;
                });
                response.on("end", () => {
                    console.log("Saved Raw Data!");
                    resovle(buff);
                });
            })
            .on("error", () => {
                reject(new Error("Error :<"));
            });
    });
};

exports.getRawData = getRawData;

/**
 *
 * @param {*} data : html_data
 * @param {*} type : string ["latest", "all"]
 */
var getNews = (data, type) => {
    return new Promise((resovle, reject) => {
        let arr = [];
        let m;
        while ((m = regex.exec(data)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            var _link = "";
            var _title = "";

            m.forEach((match, groupIndex) => {
                if (groupIndex == 1) {
                    _link = match;
                } else if (groupIndex == 2) {
                    _title = match;
                } else if (groupIndex == 3) {
                    if (type == "all") {
                        let news = {
                            title: _title,
                            image_url: match,
                            subtitle: "Click to see more →",
                            buttons: [
                                {
                                    type: "web_url",
                                    url: _link,
                                    title: "Xem tin",
                                },
                            ],
                        };
                        arr.push(news);
                    } else if (type == "latest") {
                        let news = {
                            title: _title,
                            url: _link,
                            image_url: match,
                        };
                        arr.push(news);
                    }
                }
            });
        }
        resovle(arr);
    });
};

exports.getNews = getNews;
