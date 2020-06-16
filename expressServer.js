const express = require('express')
const app = express()
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.get('/test', function (req, res) {
    res.send('안녕하세요 express 프레임 워크입니다.')
  })

app.listen(3000)