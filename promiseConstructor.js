//Promise constructor take a function(executor function) which takes two parameters(resolve,reject)
//which are also functions. This executor functions starts executing immediately as soon as you
//create Promise

function sleep(ms) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            Math.random() > .5 ? resolve("Hele luah") : reject("Pore delala min sore")
        }, ms);
    })
}

sleep(1000)
.then(val => {
    console.log(`After 1 seconds -> ${val}`);
    return sleep(1000)
})
.then(val => {
    console.log(`After 2 seconds -> ${val}`);
})
.catch(err => {
    console.error(`After 1 or 2 seconds. I am not sure -> ${err}`)
})
.finally(_ => console.log("All Done!!!"))