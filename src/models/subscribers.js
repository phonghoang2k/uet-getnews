var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var subscriber_schema = new Schema({
    id: { type: String, required: true },
    isSubscribed: { type: Boolean, required: true },
    firstName: { type: String },
    lastName: { type: String },
});

subscriber_schema.index({ id: 1 }, { unique: true });

var Subscriber = mongoose.model("Subscribers", subscriber_schema);
module.exports = Subscriber;
