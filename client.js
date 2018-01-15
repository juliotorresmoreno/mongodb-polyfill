var open = require('./const').open;
var admin = require('./admin');
var conn = require('./conn');
var actions = require('./actions');

var MongoClient = function (config, callback) {
    try {
        var _actions = actions(config);
        var client = {
            onopen: function () {

            },
            addUser: _actions.addUser,
            removeUser: _actions.removeUser,
            admin: admin(config)
        };
        client.onopen();
        callback(undefined, client);
    } catch (e) {
        callback(e);
    }
}

module.exports.MongoClient = MongoClient;