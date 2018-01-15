var net = require('net');
var Buffer = require('buffer/').Buffer;
var BSON = require('bson')
var Long = BSON.Long;
var bson = new BSON();
var fs = require("fs");

var adminCommand = Buffer.from("CQEAAH4AAAAAAAAA1AcAAA==", "base64");

module.exports = function (config, callback) {
    var conn = net.createConnection(config, function () {
        callback(undefined, {
            request: function (message, callback) {
                if (!callback) {
                    conn.end();
                    return;
                }
                var data;
                fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\buffer.txt", new Date() + " conn.request\n");

                conn.setTimeout(500)
                conn.on('data', function (_data) {
                    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\buffer.txt", new Date() + " data: " + data + "\n");
                    if(data !== undefined) {
                        data = Buffer.concat([data, _data]);
                        return;
                    };
                    data = _data;
                });
                conn.on('error', function(err) {
                    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\buffer.txt", new Date() + " " + err.message + "\n");
                    this.end();
                    callback(err);
                });
                conn.on('timeout', function() {
                    if (data === undefined || data.length === 0) {
                        this.end();
                        callback(new Error("Unknow error"), undefined);
                        return;
                    }
                    this.end();
                    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\buffer.txt", new Date() + " timeout: " + data + "\n");
                    callback(undefined, bson.deserialize(data.slice(16)));
                });
                conn.write(message);
            },
            end: function () {
                conn.unref();
            }
        });
    });
    conn.on("close", function() {
        
    });
    conn.on("error", function(err) {
        fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\buffer.txt", new Date() + " " + err.message + "\n");
        callback(err);
    });
}