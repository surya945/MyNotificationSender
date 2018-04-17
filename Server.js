http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {

    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
		
	    var message = {
			to: "/topics/MyNotification",       		
    		data: {
    		    your_custom_data_key: 'your_custom_data_value' 
				},
			notification:JSON.parse(body) 
	     };
	    console.log(JSON.stringify(message));
	    fcm.send(message, function(err, response){
    		if (err) {
				console.log("Something has gone wrong!");
			} else {
				console.log("Successfully sent with response: ", response);  
			}
	    });

        });
        req.on('end', function () {
            console.log("Body: " + body);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('post received');
	
	

    }
    else
    {
        console.log("GET");
		var html = fs.readFileSync('index.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    }

});

port = 8081;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);


var FCM = require('fcm-push');

var serverKey = 'My_serverKey_I_have_removed';
var fcm = new FCM(serverKey);
