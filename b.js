Promise.resolve([1, 2, 3, 4])

.then(function(v) {console.log(v); return v;})

.then(function(v){console.log('a'+v); return v;})

.then(function(v){console.log('a'+v+v); return v;})

.then(function(v){console.log('a'); 
//throw new Error('aaaaaaa'); 
return v;})

.then(function(v1) {console.log(v1);}

, function onError(error){console.log('Error:'+error)});
