

module.exports.strToUint8Array = function(str) {
    var arr = [];
    for(var i = 0; i < str.length; ++i) {
        arr.push(str.charCodeAt(i));
    }
    return arr;
}

module.exports.bufferToUint8Array = function(buffer) {
    var arr = [];
    for(var i = 0; i < buffer.length; ++i) {
        arr.push(buffer[i]);
    }
    return arr;
}