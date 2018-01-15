
var Buffer = require('buffer/').Buffer;
var toBuffer = require('./buffer');
var BSON = require('bson');
var Long = BSON.Long;
var bson = new BSON();
var removeUser = function() {
    return Buffer.from("eQAAAEoAAAAAAAAA2gcA", "base64");
}
var conn = require('./conn');
var fs = require('fs');
var strToUint8Array = require("./util").strToUint8Array;
var bufferToUint8Array = require("./util").bufferToUint8Array;

module.exports = function(config) {
    return {
        addUser: function(user, database, callback) {
            const _re = "XAEAAD4AAAAAAAAA2gcAAGFuYWxpdGlzAGNyZWF0ZVVzZXIAMwEAAAJjcmVhdGVVc2VyAA8AAABhY2NvdW50QWRtaW4wMQACcHdkACEAAAA5Y2Q0ODBmNmU4OWNjZGQ1N2RjYjI4NDUxOGY0YjVjMgADY3VzdG9tRGF0YQAZAAAAAWVtcGxveWVlSWQAAAAAAIAcyEAABHJvbGVzAHMAAAADMAAqAAAAAnJvbGUADQAAAGNsdXN0ZXJBZG1pbgACZGIABgAAAGFkbWluAAADMQAtAAAAAnJvbGUAEAAAAHJlYWRBbnlEYXRhYmFzZQACZGIABgAAAGFkbWluAAACMgAKAAAAcmVhZFdyaXRlAAAIZGlnZXN0UGFzc3dvcmQAAAN3cml0ZUNvbmNlcm4AJwAAAAJ3AAkAAABtYWpvcml0eQABd3RpbWVvdXQAAAAAAACIs0AAAAUAAAAA";
            var data = Buffer.from(_re, "base64");
            
            var bloques = [].concat(
                [70+database.length+user.length],
                bufferToUint8Array(data.slice(1, 4)),
                [57+user.length],
                bufferToUint8Array(data.slice(5, 16)),
                strToUint8Array(database),
                [0],
                bufferToUint8Array(data.slice(25, 36)),
                [37+user.length],
                bufferToUint8Array(data.slice(37, 52)),
                [1+user.length,0,0,0],
                strToUint8Array(user),
                bufferToUint8Array(data.slice(70))
            );
            toBuffer(new Uint8Array(bloques), function(command) {
                conn(config, function(conn) {
                    conn.request(command, callback);
                });
            });
        },
        removeUser: function(user, database, callback) {
            const _re = "dgAAACoAAAAAAAAA2gcAAGFuYWxpdGljbwBkcm9wVXNlcgBOAAAAAmRyb3BVc2VyAAYAAABhZG1pbgADd3JpdGVDb25jZXJuACcAAAACdwAJAAAAbWFqb3JpdHkAAXd0aW1lb3V0AAAAAACATyJBAAAFAAAAAA==";
            var data = Buffer.from(_re, "base64");
            
            var bloques = [].concat(
                [104+database.length+user.length],
                bufferToUint8Array(data.slice(1, 4)),
                [33+database.length],
                bufferToUint8Array(data.slice(5, 16)),
                strToUint8Array(database),
                bufferToUint8Array(data.slice(25, 35)),
                [73+user.length],
                bufferToUint8Array(data.slice(36, 49)),
                [1+user.length],
                [0,0,0],
                strToUint8Array(user),
                bufferToUint8Array(data.slice(58))
            );
            toBuffer(new Uint8Array(bloques), function(command) {
                conn(config, function(err, conn) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    conn.request(command, callback);
                });
            });
        },
        removeUser2: function(user, database, callback) {
            conn(config, function(conn) {
                var user = bson.serialize({ 
                    dropUser: 'admin',
                    writeConcern: { 
                        w: 'majority', 
                        wtimeout: 600000 
                    }
                })
                var data = Buffer.concat([
                    removeUser(), 
                    new Uint8Array([0]), 
                    strToUint8Array(database),
                    Buffer.from("AGRyb3BVc2VyAFEAAAA=", "base64"),
                    user
                ]);
                //console.log(data.length);
                //conn.request(Buffer.from(data), callback);
                console.log(data.length, user.toString('utf-8'))
                console.log(data.toString('base64'))
                callback("", "");
            });
        }
    }
}