const request = require('request');
var parseString = require('xml2js').parseString;

request('https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json?page=1', function (error, response, body) {
    var data = JSON.parse(body);
    console.log(data);
});
