var net = require('net');


module.exports = function(data, callback) {
    var server = net.createServer(function (socket) {
        socket.on('data', function (message) {
            callback(message.__proto__.constructor(data));
            socket.end();
            server.close();
        });
    }).listen(45950);

    var conn = net.createConnection({port: 45950}, function () {
        conn.write(".");
        conn.end();
    });
}
