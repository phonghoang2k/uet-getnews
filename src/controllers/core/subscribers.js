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

module.exports.delete = async (id) => {
    Subscriber.deleteMany({ id: id }, (err) => {
        if (err) {
            console.log("___delete subscriber error", err);
        }
    });
};
