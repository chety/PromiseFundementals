const fetch = require("node-fetch");

const USER_API_URL = "http://localhost:3000/users";

async function getUsers() {
  const response = await fetch(`${USER_API_URL}`);
  const users = await response.json();
  //   console.log(users);
  return users;
}

// getUsers();

//******************************************************************************* */

//we can also call our async function in a promise chain seamlessly
// getUsers()
//   .then((users) => console.log(users))
//   .catch((err) => console.error(err));

// class UserManager {
//   async getUsers() {
//     const response = await fetch(`${USER_API_URL}`);
//     const users = await response.json();
//     return users;
//   }
// }

// (async () => {
//   const user = new UserManager();
//   const users = await user.getUsers();
//   console.log(users);
// })();

//******************************************************************************* */

// async function getUsersWithErrorThrow() {
//   const response = await fetch(`${USER_API_URL}/bip`);
//   const users = await response.json();
//   if (response.status === 200) {
//     return users;
//   }
//   throw new Error("Error occured in Network. Details: ", users.message);
// }

// (async function () {
//   try {
//     const users = await getUsersWithErrorThrow();
//     console.log(users);
//   } catch (err) {
//     console.error(err);
//   }
// })();

//******************************************************************************* */

async function getUserById(id) {
  console.log(`Request with id ${id} started`);
  const response = await fetch(`${USER_API_URL}/${id}`);
  for (let i = 0; i < 10 ** 9; i++) {}
  const user = await response.json();
  return user;
}

(async function () {
  //This makes call  sequentially (If one call depend on another then it is understandable but otherwise not efficient)
  //   console.time("sequentially");
  //   const firstUser = await getUserById(1);
  //   const secondUser = await getUserById(2);
  //   console.timeEnd("sequentially");
  //   this makes call concurrently
  // console.time("conccurent");
  // const firstUserPromise = getUserById(1);
  // const secondUserPromise = getUserById(2);
  // const firstUser = await firstUserPromise;
  // const secondUser = await secondUserPromise;
  // console.timeEnd("conccurent");
  //   console.time("Parallel");
  //   const [firstUser, secondUser] = await Promise.all([
  //     getUserById(1),
  //     getUserById(2),
  //   ]);
  //   console.timeEnd("Parallel");
  //   console.log(`First User: ${firstUser.username} --> ${firstUser.email}`);
  //   console.log(`Second User: ${secondUser.username} --> ${secondUser.email}`);
})();

//******************************************************************************* */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function* myGenerator() {
  await delay(1000);
  //Every yield returns a resolved promise
  let input = yield 1;
  console.log("Sent1 -> ", input);

  await delay(2000);
  input = yield 2;
  console.log("Sent2 -> ", input);

  await delay(3000);
  input = yield 3;
  console.log("Sent3 -> ", input);
}

async function main() {
  const gen = myGenerator();
  const val0 = await gen.next();
  console.log("Val0: ", val0);

  const val1 = await gen.next("First");
  console.log("Val1: ", val1);

  const val2 = await gen.next("Second");
  console.log("Val2: ", val2);

  const val3 = await gen.next("Third");
  console.log("Val3:", val3);

  //or instead of manuel calling next function of our generator
  //we can use for await of

  //   for await (const value of myGenerator()) {
  //     console.log(value);
  //   }
}
main();

