const
exec = require('child_process').exec;
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
						for (var i = 0; i < lines.length; i++) {
							if (lines[i].indexOf('.zip')>0) {
								console.log(i + ') ' + lines[i]);
							}
						}

					}
				});
}
