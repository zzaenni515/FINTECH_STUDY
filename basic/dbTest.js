var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '930515',
  database : 'fintech'
});
 
connection.connect();
 
connection.query('select * from fintech.user', function (error, results, fields) {
  if (error) throw error;
  console.log('모든 회원정보: ', results);
});
 
connection.end();