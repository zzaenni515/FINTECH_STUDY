const express = require('express')
const app = express()
const path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));//to use static asset

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.get('/test', function (req, res) {
    res.send('안녕하세요 express 프레임 워크입니다.')
  })

app.get('/test2', function (req, res) {
    res.render('test')
  })

app.get('/test3', function (req, res) {
    res.render('test2')
})

app.get('/inputTest', function(req, res){
    res.render('inputTest');
})

//브라우저는 Get방식으로만 요청가능!

app.post('/inputTest', function(req, res){
  console.log('request!!');
  //console.log(req.body);
  console.log(req.body.userIdBody);
  console.log(req.body.userPasswordBoby);
  res.json(1);
})

app.post('/postTest', function(req, res){
  res.render('post!!!!!!!');
})

app.listen(3000)