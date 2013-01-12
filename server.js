var redirectTable = {
  pdf_kit: { status: 302, url: 'http://pdfkit.org/example.pdf'},
  moz_pdf: { status: 307, url: 'http://plugindoc.mozdev.org/testpages/test.pdf'}
};

var http = require('http');
var urlMod = require('url');

var server = http.createServer(function(req, res) {
  var pathname = urlMod.parse(req.url).pathname;
  // drop the leading '/asset/' portion of the request url
  pathname = pathname.replace('/asset/', '');

  if (redirectTable[pathname] !== undefined) {
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
