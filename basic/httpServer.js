var http = require("http");

http.createServer(function (req, res) {
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
    //res.end("<h1>안녕하세요</h1><div>teste</div>")
    res.end("<h1>안녕하세요</h1><div>"+ body +"</div>")
}).listen(3000);
console.log("Server is Started");