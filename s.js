const spawn = require('child_process').spawn;
const fs = require('fs');

var string = '';

    const streamIn = fs.createReadStream('./s.txt');
    const proc = spawn('anypoint-cli', []);
    streamIn.pipe(proc.stdin);
    proc.stdout.on('data', function (chunk) {
    	var part = ''+chunk;
      string += part;
      //console.log('' + part);
      //console.log('Received '+chunk.length+ ' bytes of data.');
    });
    proc.stdout.on('end', function () {
      console.log('There will be no more data.\n'+string);
    });
                      
