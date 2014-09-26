var express = require('express');
var config = require('./config');
var qiniu = require('qiniu');

var router = express.Router();

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        domain: config.domain,
        uptoken_url: config.Uptoken_Url,
        title: 'Metro UI Blog'
    });
});

router.get('/uptoken', function(req, res, next) {
    var uptoken = new qiniu.rs.PutPolicy(config.Bucket_Name);
    var token = uptoken.token();
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        res.json({
            uptoken: token
        });
    }
});

module.exports = router;
