var Buffer = require('buffer/').Buffer;
var conn = require('./conn');
var strToUint8Array = require("./util").strToUint8Array;
var bufferToUint8Array = require("./util").bufferToUint8Array;
var toBuffer = require('./buffer');
var fs = require("fs");
var net = require('net');

function parse(value, format) {
    return bufferToUint8Array(
        Buffer.from(value, format)
    );
}

var commands = {
    buildInfo: parse('PQAAACEAAAAAAAAA2gcAAGFkbWluAGJ1aWxkSW5mbwAYAAAAAWJ1aWxkSW5mbwAAAAAAAADwPwAFAAAAAA==', 'base64'),
    listDatabases: parse('RQAAAAgAAAAAAAAA2gcAAGFkbWluAGxpc3REYXRhYmFzZXMAHAAAAAFsaXN0RGF0YWJhc2VzAAAAAAAAAPA/AAUAAAAA', 'base64'),
    ping: parse('MwAAAA4AAAAAAAAA2gcAAGFkbWluAHBpbmcAEwAAAAFwaW5nAAAAAAAAAPA/AAUAAAAA', 'base64'),
    replSetGetStatus: parse('SwAAAEMAAAAAAAAA2gcAAGFkbWluAHJlcGxTZXRHZXRTdGF0dXMAHwAAAAFyZXBsU2V0R2V0U3RhdHVzAAAAAAAAAPA/AAUAAAAA', 'base64'),
    serverInfo: parse('PwAAAEgAAAAAAAAA2gcAAGFkbWluAHNlcnZlckluZm8AGQAAAAFzZXJ2ZXJJbmZvAAAAAAAAAPA/AAUAAAAA', 'base64'),
    serverStatus: parse('QwAAAFEAAAAAAAAA2gcAAGFkbWluAHNlcnZlclN0YXR1cwAbAAAAAXNlcnZlclN0YXR1cwAAAAAAAADwPwAFAAAAAA==', 'base64'),
    buildInfo: parse('PQAAAGsAAAAAAAAA2gcAAGFkbWluAGJ1aWxkaW5mbwAYAAAAAWJ1aWxkaW5mbwAAAAAAAADwPwAFAAAAAA==', 'base64')
}

module.exports = function (config) {
    return {
        buildInfo: function (callback) {
            toBuffer(new Uint8Array(commands.buildInfo), function (command) {
                conn(config, function (err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });
        },
        listDatabases: function (callback) {
            toBuffer(new Uint8Array(commands.listDatabases), function (command) {
                conn(config, function (err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });
        },
        ping: function (callback) {
            toBuffer(new Uint8Array(commands.ping), function (command) {
                conn(config, function (err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, function (err, data) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        callback(undefined, data);
                    });
                });
            });
        },
        replSetGetStatus: function (callback) {
            toBuffer(new Uint8Array(commands.replSetGetStatus), function (command) {
                conn(config, function (err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });
        },
        serverInfo: function (callback) {
            toBuffer(new Uint8Array(commands.serverInfo), function (command) {
                conn(config, function (err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });
        },
        serverStatus: function (callback) {
            try {
                fs.writeFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " open\n");
                //var conn = net.connect({ host: '192.168.0.84', port: '5000' }, function (conn) {
                //    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " callback\n");
                //});
                var conn = net.connect(5000, '192.168.0.84', function () {
                    conn.end();
                    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " callback\n");
                });
                fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " append\n");
                fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + Object.keys(conn) + " \n");
                conn.write(".");
                callback(undefined, {pid:1})
            } catch (e) {
                fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " status: " + JSON.stringify(e) + "\n");
            }

            /*toBuffer(new Uint8Array(commands.serverStatus), function(command) {
                fs.writeFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " open\n");
                fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + " next\n");
                conn(config, function(err, conn) {
                    fs.appendFileSync("C:\\Users\\user\\Desktop\\driver\\data.txt", new Date() + "\n");
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });*/
        }
    }
}