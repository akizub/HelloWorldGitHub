const exec = require('child_process').exec;
exec('git status -s', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    //console.log('stdout ', stdout);
    //console.log('stderr ', stderr);
    
    //console.log('['+ typeof stdout +']')
    if (!stdout || stdout.length <=0) {
	console.log('No changes');
    } else {
	console.log('Processing:\n'+stdout);
    }
});


