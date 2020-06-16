const request = require('request');
request('http://www.naver.com', function (error, response, body) {
  console.error('error:', error);
  console.log('body:', body);
});