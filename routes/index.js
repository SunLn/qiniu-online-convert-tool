var express = require('express');
var config = require('./config');
var qiniu = require('qiniu');
var http = require('http');

var router = express.Router();

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

/* GET home page. */
router.get('/', function(req, res) {
    console.log(config.Domain);
    res.render('index', {
        domain: config.Domain,
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

router.post('/md2html', function(req, res, next) {

    var resource = req.param('resource');
    var mode = req.param('mode');
    var style = req.param('css');
    if (resource == '') {
        res.json({
            error: 'invailed args'
        });
    }
    // console.log(resource);
    if (resource.indexOf('http://') != -1) {
        resource = resource.substr(7);
    }
    var prefix = 'html/';
    var name = resource.split('/').pop().split('.')[0] + '.html';
    var newKey = prefix + name;
    var newEntryURI = config.Bucket_Name + ':' + newKey;

    // console.log(newKey);
    resource = resource + '?md2html/' + mode + '/style/' + qiniu.util.urlsafeBase64Encode(style);

    resource = resource + '|saveas/' + qiniu.util.urlsafeBase64Encode(newEntryURI);
    var sign = qiniu.util.hmacSha1(resource, config.SECRET_KEY)
    var signUrl = 'http://' + resource + '/sign/' + config.ACCESS_KEY + ':' + qiniu.util.base64ToUrlSafe(sign);
    // var path = signUrl.substr(signUrl.indexOf('/'))
    // console.log(path)
    // var host = config.Domain.indexOf('http://') != -1 ? config.Domain.substr(7) : config.Domain;
    // console.log(host)
    // var options = {
    //     host: host,
    //     path: path,
    //     method: 'get'
    // };
    var outer_res = res;
    // var inner_req = http.request(options, function(res) {

    //     res.on('end', function() {
    //         if (res.statusCode == 200) {
    //             outer_res.json({
    //                 sign: signUrl,
    //                 resource: config.Domain + '/html/' + resource.split('/').pop().split('.')[0] + '.html'
    //             });
    //         }
    //     });

    // });
    // inner_req.on('error', function(e) {
    //     console.log('problem with request: ' + e.message);
    // })
    // inner_req.end();

    http.get(signUrl, function(res) {
        console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {
            outer_res.json({
                sign: signUrl,
                resource: config.Domain + '/' + newKey
            });
        } else {
            outer_res.json({
                ok: 'not ok'
            });
        }
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

});

module.exports = router;
