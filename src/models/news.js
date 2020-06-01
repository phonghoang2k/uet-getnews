var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var news_schema = new Schema({
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    url: { type: String, required: true },
});

news_schema.index({ url: 1 }, { unique: true });

var News = mongoose.model("News", news_schema);
module.exports = News;
