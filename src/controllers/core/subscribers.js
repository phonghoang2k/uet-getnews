const Subscriber = require("../../models/subscribers");

module.exports.create = async (id, firstName, lastName) => {
    let data = {
        id: id,
        isSubscribed: true,
        firstName: firstName,
        lastName: lastName,
    };
    let subscriber = new Subscriber(data);
    await subscriber.save();
};

module.exports.read = async () => {
    return await Subscriber.find({});
};

module.exports.find = async (id, callback) => {
    Subscriber.findOne({ id: id }, (err, doc) => {
        if (err) {
            console.log("___find subscribers error");
            callback(null);
        }
        callback(doc);
    });
};

module.exports.delete = async (id) => {
    Subscriber.deleteMany({ id: id }, (err) => {
        if (err) {
            console.log("___delete subscriber error", err);
        }
    });
};
