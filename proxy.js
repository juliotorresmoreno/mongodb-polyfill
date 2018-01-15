var net = require('net');

var MongoProxy = function(config) {
    var conn;
    var _config = config;
    
    var client = {
        open: function(config) {
            conn = net.createConnection(config||_config, function() {
                client.onopen();
            });
            
            conn.on('data', function(data) {
                client.ondata(data);
            });
            
            conn.on('end', function() {
                conn.end();
                client.onend();
            });
        },
        onopen: function() {

        },
        ondata: function() {

        },
        onend: function() {

        },
        write: function(data) {
            conn.write(data);
        }
    }
    return client;
}

module.exports.MongoProxy = MongoProxy;