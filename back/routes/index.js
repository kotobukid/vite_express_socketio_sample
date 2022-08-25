var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/v1/users.json', (req, res, next) => {
    res.json([
        { id: 1, name: 'Taro', age: 18 },
        { id: 2, name: 'Jiro', age: 19 },
        { id: 3, name: 'Hanako', age: 20 },
    ])
})

module.exports = router;
