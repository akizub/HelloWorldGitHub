

var message = "";


promise1 = new Promise(function (resolve, reject) {
    setTimeout(function ()  {
        message += "my";
        resolve(message);
    }, 2000)
})

promise2 = new Promise(function (resolve, reject)  {
    setTimeout(function()  {
        message += " first";
        resolve(message);
    }, 2000)
})

promise3 = new Promise(function(resolve, reject)  {
    setTimeout(function ()  {
        message += " promise";
        resolve(message);
    }, 2000)
})
.then(function(){console.log('aaa')})
.then(function(){console.log('aaa')})
.then(function(){console.log('aaa')})

function printResult (results) {console.log("Results = ", results, "message = ", message)}

function main() {
    // See the order of promises. Final result will be according to it
    Promise.all([promise1, promise2, promise3]).then(printResult);
    Promise.all([promise2, promise1, promise3]).then(printResult);
    Promise.all([promise3, promise2, promise1]).then(printResult);
    console.log("\"\"" + message);
}

main();
console.log(''+new Date());