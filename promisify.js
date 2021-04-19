const fs = require("fs");
const path = require("path");
const util = require("util")

const readFilePromisify = util.promisify(fs.readFile)

readFilePromisify(path.join(__dirname,"notes.txt"), "utf-8")
.then(content => {
    const {name,age} = JSON.parse(content)
    console.log(`${name} is ${age} years old`);
})
.catch(err => {
    console.error(err.message)
})


//Make callback based fs.readFile promisify explicitly
// function readFile(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, { encoding: "utf-8" }, (err, content) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(content);
//     });
//   });
// }

// readFile(path.join(__dirname,"note.txt"))
// .then(content => {
//     const {name,age} = JSON.parse(content);
//     console.log(`${name} is ${age} years old`)
// })
// .catch(err =>{
//     console.error(err)
// })