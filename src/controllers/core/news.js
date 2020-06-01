const News = require("../../models/news");

module.exports.create = async (title, image_url, url) => {
    let data = {
        title: title,
        image_url: image_url,
        url: url,
    };

    let news = new News(data);
    await news.save();
};

module.exports.delete = async () => {
    News.deleteMany({}, (err) => {
        if (err) {
            console.log("___delete news error", err);
        }
    });
};
