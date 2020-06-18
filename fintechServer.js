const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const jwt = require('jsonwebtoken');
const auth = require('./lib/auth');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '930515',
  database : 'fintech'
});

connection.connect();

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
//로그인페이지
app.get('/login', function(req, res){
    res.render('login');
})
//메인페이지
app.get('/main', function(req, res){
    res.render('main');
})

app.get('/balance', function(req, res){
    res.render('balance');
})

app.post('/login',function(req, res){
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;

    var sql = "SELECT * FROM fintech.user WHERE email = ?"
    connection.query(sql, [userEmail], function(error, result){
        if(error) throw error;
        //console.log(result);
        if(result.length == 0){
            res.json('사용자가 없습니다.');
        }
        else{
            console.log(result[0].userAccessToken);
            var dbPassword = result[0].password;
            console.log('DataBase Password : ', dbPassword);
            if(dbPassword == userPassword){
                console.log('Login 성공!');
                //JWT 발급
                jwt.sign(
                    {
                        userId : result[0].id,
                        userName : result[0].name
                    },  //payload
                    'f%intech#service!1234#',
                    {
                        expiresIn : '1d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    },
                    function(err, token){
                        console.log('우리가 발급한 토큰', token);
                        res.json(token);
                    }
                );
            }
            else if(dbPassword != userPassword){
                res.json('패스워드가 다릅니다.');
            }
        }
    })
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
    });
})

app.post('/signup', function(req, res){
    //ßßres.send('Post!!!!!!!');
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;
    console.log(userAccessToken, userRefreshToken, userSeqNo);
    var sql = "INSERT INTO fintech.user (name, email, password, accesstoken, refreshtoken, userseqno) VALUES (?, ?, ?, ?, ?, ?)"
    connection.query(sql,[userName, userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo], function(error, results, fields){
        if(error) throw error;
        res.json('가입완료');
    });
})

app.post('/list', auth, function(req, res){
    var userId = req.decoded.userId;
    var sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, [userId], function (err, result){
        if(err) throw err;

        var accesstoken = result[0].accesstoken;
        var userseqno = result[0].userseqno;
        console.log(accesstoken, userseqno);

        var option = {
            method : "GET",
            url : "https://testapi.openbanking.or.kr/v2.0/user/me",
            headers : {
                'Authorization' : 'Bearer ' + accesstoken
            },
            qs : {
                user_seq_no : userseqno
            }
        }
        request(option, function(error, response, body){
            console.log(body);
            var requestResultJSON = JSON.parse(body);
            res.json(requestResultJSON)
        });
    })
    
})

app.post('/balance', auth, function(req, res){
    var finusenum = req.body.fin_use_num;
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "T991637160U" + countnum; //이용기관번호 본인것 입력
    var transDtime = '20200618133507';
    //database 조회
    //=> 잔액조회 request 요청
    var userId = req.decoded.userId;
    var sql = "SELECT * FROM user WHERE id = ?";

    connection.query(sql, [userId], function (err, result){
        if(err) throw err;

        var accesstoken = result[0].accesstoken;
        var userseqno = result[0].userseqno;
        var balanceamt = result[0].balance_amt;
        console.log(accesstoken, userseqno, balanceamt);

        var option = {
            method : "GET",
            url : "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
            headers : {
                'Authorization' : 'Bearer ' + accesstoken
            },
            qs : {
                fintech_use_num : finusenum,
                bank_tran_id : transId,
                tran_dtime : transDtime
            }
        }
        request(option, function(error, response, body){
            if(err){
                console.error(err);
                throw err;
            }
            else{
                console.log(body);
                var requestResultJSON = JSON.parse(body);
                res.json(requestResultJSON)
            }
        });
    })

})

// app.get('/authTest', auth, function(req, res){
//     res.json(req.decoded);
// })

app.listen(3000)