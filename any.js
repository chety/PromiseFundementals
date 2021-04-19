//#region Setup
const TODO_API_URL = "https://jsonplaceholder.typicode.com/";
const TODO_FAKE_API_URL = "https://jsonplaceholder.typicodes.com/";

const todosDiv = document.getElementById("todos");
const spinner = document.getElementById("spinner");

todosDiv.innerText = "Loading Todos. Please Wait...";

const query = (rootURL, endPoint) => {
  return fetch(rootURL + endPoint).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(new Error(`Unsuccessfull response`));
  });
};

const queryAPI = (endPoint) => {
  return Promise.any([
      query(TODO_FAKE_API_URL, endPoint),
    query(TODO_API_URL, endPoint),
  ]).catch((_) => { 
    return Promise.reject(
      new Error(`Got error while fetching ${endPoint} endpoint`),
    );
  });
};
//#endregion

queryAPI("comments")
  .then((val) => {
    const commentText = val
      .slice(0, 10)
      .map(({ name, email }) => {
        return `${name} by ${email}`;
      })
      .join("\n");
    todosDiv.innerText = commentText;
  })
  .catch((err) => {
    console.log(err.message);
    todosDiv.innerText = ":(";
  })
  .finally((_) => spinner.remove());
