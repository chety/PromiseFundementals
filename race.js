const resolveAfter = (ms, value) => {
  let timerId;
  return new Promise((resolve, _) => {
    timerId = setTimeout(() => {
      resolve(value);
    }, ms);
  }).finally((_) => {
    clearTimeout(timerId);
  });
};

function timeout(ms, promise) {
  let timerId;
  const rejectedPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error("Promise rejected because of timeout"));
    }, ms);
  });
  return Promise.race([promise, rejectedPromise]).finally((_) =>
    clearTimeout(timerId),
  );
}

const promiseA = resolveAfter(1000, "Chety ++");
timeout(5000, promiseA)
  .then((val) => console.log(val))
  .catch((err) => console.error(err));
