const exec = require('child_process').exec;
exec('anypoint-cli runtime-mgr standalone-application describe AlexAPI -o json --environment=Dev', (e, stdout, stderr)=> {
    if (e instanceof Error) {
        console.error(e);
        throw e;
    }
    console.log('stdout ', stdout);
    console.log('stderr ', stderr);
});
