var redirectTable = {
  stribild_pi: { status: 302, url: 'https://www.stribild.com/Content/pdf/stribild_prescribing_information.pdf'},
  complera_pi: { status: 307, url: 'http://www.gilead.com/pdf/complera_pi.pdf'}
};

var http = require('http');
var urlMod = require('url');

var server = http.createServer(function(req, res) {
  var pathname = urlMod.parse(req.url).pathname;
  pathname = pathname.slice(1, pathname.length);

  if (redirectTable.hasOwnProperty(pathname)) {
    var row = redirectTable[pathname];
    res.writeHead(row.status, {
      'Location': row.url
    });
    res.end();
  }
  else {
    var message = 'Asset not found';
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': message.length
    });
    res.end(message);
  }
    
 
});
server.listen(1337, '127.0.0.1');
console.log('Redirect handler started');
