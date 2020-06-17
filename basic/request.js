const request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
  //console.error('error:', error);
  //console.log('body:', body);
  var xml = body
  parseString(xml, function (err, result) {
        //#work2 wf 태그안에 있는 기상 예보 값을 불러오기
        console.dir(result.rss.channel[0].item[0].description[0].header[0].wf[0]);
    });
});