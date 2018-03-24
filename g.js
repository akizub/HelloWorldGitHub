var environments=['Dev','QA','Performance'];
var items={};
var servers=['HQESAPD01_3_8_6','ESB-QA-3-8-6','ESB-PT-3-8-6'];

var exec = require('child_process').exec;

exec(
			'git status -s', function(e, stdout, stderr) {
				if (e instanceof Error) {
					console.error(e);
					throw e;
				}
				// console.log('stdout ', stdout);
				// console.log('stderr ', stderr);

				// console.log('['+ typeof stdout +']')
				if (!stdout || stdout.length <= 0) {
					console.log('No changes');
				} else {
					console.log('Start:Processing:\n' + stdout);
					gitAdd();
				}
			});

function gitAdd() {
	exec(
				'git add .', function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						throw e;
					}
					console.log('done: git add .');
					gitStatus();
				});
}

function gitStatus() {
	exec(
				'git status -s', function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						throw e;
					}
					if (!stdout || stdout.length <= 0) {
						console.log('No changes');
					} else {
						var lines = stdout.split('\n');
						workWithLines(lines, 0);
					}
				});
}

function workWithLines(lines, indexInLines) {
	if (indexInLines < lines.length) {

		var line = lines[indexInLines];
		//console.log('workWithLines:line[' + indexInLines + ']:' + line);
		var nextIndexInLine = indexInLines + 1;
		function done() {
			if (nextIndexInLine < lines.length) {
				//console.log('continue with ' + nextIndexInLine);
				workWithLines(lines, nextIndexInLine);
			}else {
				console.log('\nDone done\n'+JSON.stringify(items,null,4));
				gitCommit();
			}
		}
		workWithOneLine(line, done);
	} 
}

function workWithOneLine(line, done) {
	//console.log('workWithOneLine:' + line);
	if (line.indexOf('M  ') == 0 && line.indexOf('.zip') > 0) {
		workWithZipFileName(line.substring(3), done);
	} else {
		done();
	}
}

function workWithZipFileName(fileName, done){
	
	//console.log('workWithZipFileName:'+fileName);
	var package=fileName.split('/');
	if (package.length==2){
		console.log('\t'+package[0]+ '\t\t\t'+ package[1]);
		checkApp(package[0],package[1],done,0);
	} else {
	done();
	}
	
} 

function checkApp(apiName,apiFile,done, indexInEnvironments){
	if (indexInEnvironments<environments.length){
	var env=environments[indexInEnvironments];
	console.log('---start---'+env+'---');
		
	exec(
				'/usr/local/bin/anypoint-cli runtime-mgr standalone-application describe '+apiName+' -o json --environment='+env, function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						done();
						return;
					}
					if (!stdout || stdout.length <= 0) {
						console.log('No changes');
					} else {
						var apiJson = JSON.parse(stdout);
						items[env]=apiJson;
						console.log('---done----'+env+'---');
						console.log(JSON.stringify(apiJson,null,2));
						if (apiJson['File Name']=='apiFile' || 'Dev' == env){
							
							deployApp(indexInEnvironments,apiName,apiFile,env, function(){checkApp(apiName,apiFile,done,indexInEnvironments+1);});
							return;
						}
					}
					checkApp(apiName,apiFile,done,indexInEnvironments+1);
					return;
				});
	}
	else {
		done();
	}
}

function deployApp(indexInEnvironments, apiName, apiFile,environment, done){
	console.log('deployApp('+apiName+' '+apiFile+' '+environment+')');
	var command='/usr/local/bin/anypoint-cli runtime-mgr standalone-application deploy '+servers[indexInEnvironments]+' '+apiName+' '+apiName+'/'+apiFile;
	console.log(command);
	exec( command
				, function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						done();
						return;
					}
					if (!stdout || stdout.length <= 0) {
						console.log('No changes');
					} else {
						console.log('---done----['+stdout+']---');
						
					}
					done();
				});
}

function gitCommit() {
	var command='git commit -m "Auto '+(new Date())+'"';
	exec(
				command, function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						throw e;
					}
					console.log(stdout);
					console.log('done: git commit');
					gitPush();
				});
}

function gitPush() {
	var command='git push';
	exec(
				command, function(e, stdout, stderr) {
					if (e instanceof Error) {
						console.error(e);
						throw e;
					}
					console.log(stdout);
					console.log('done: git push');
					
				});
}

