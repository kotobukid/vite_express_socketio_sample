"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    fs.readFile('../front/dist/index.html', 'utf-8', (err, result) => {
        if (err)
            throw err;
        res.end(result);
    });
});
router.get('/api/v1/users.json', (req, res, next) => {
    res.json([
        { id: 1, name: 'Taro', age: 18 },
        { id: 2, name: 'Jiro', age: 19 },
        { id: 3, name: 'Hanako', age: 20 },
    ]);
});
exports.default = router;
