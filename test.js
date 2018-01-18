

var net = require("net");

var conn = net.connect(5000, '192.168.0.84', function () {
    conn.end();
    console.log("ok")
});
/*
conn({ host: '192.168.0.84', port: '5000' }, function(err, conn) {
    conn.end();
    console.log("ok")
});*/