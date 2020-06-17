const express = require('express')
const app = express()
const path = require('path');
const request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));//to use static asset

app.get('/design', function(req, res){
    res.render('wallet');
})

//회원가입페이지
app.get('/signup', function(req, res){
    res.render('signup');
})

app.get('/authResult', function(req, res){
    console.log('authResult');
    console.log(req.query);
    var authCode = req.query.code;
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        header : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            code : authCode,
            client_id : 'MTjFQJ2tkHnPNTWfOSi3p1oiIF1BZ9WE0I2HW6RQ',
            client_secret : 'jHBnRMjW2V8qxUcoj5ES14kemzwIuELgu7z2wkfK',
            redirect_uri : 'http://localhost:3000/authResult',
            grant_type : 'authorization_code'
        }
    }
    request(option, function(error, response, body){
        console.log(body);
        var requestResultJSON = JSON.parse(body);
        res.render('resultChild',{data : requestResultJSON})
    })
})

app.post('/signup', function(req, res){
    res.send('Post!!!!!!!');
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;
    console.log(userAccessToken, userRefreshToken, userSeqNo);
})

app.listen(3000)