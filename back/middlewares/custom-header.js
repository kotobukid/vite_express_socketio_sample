"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowCrossDomain = void 0;
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, access_token');
    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
exports.allowCrossDomain = allowCrossDomain;
