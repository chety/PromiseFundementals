//#region  setup
const TODO_API_URL = "https://jsonplaceholder.typicode.com/";

const todosDiv = document.getElementById("todos");
const spinner = document.getElementById("spinner");

todosDiv.innerText = "Loading Todos. Please Wait...";

const queryAPI = (endPoint) => {
  return fetch(TODO_API_URL + endPoint).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(new Error("Fetch error"));
  });
};
//#endregion

Promise.allSettled([
  queryAPI("todos").then((todos) => `${todos.length} todos`),
  queryAPI("postss").then((posts) => `${posts.length} posts`),
  queryAPI("comments").then((comments) => `${comments.length} comments`),
])
  .then((response) => {
    const output = response.filter(res => res.status === "fulfilled").map(res => res.value)
    todosDiv.innerText = output.length > 0 ? output.join("\n") : "Failed to load statistics :(";
  })
  .catch((err) => {
    console.error("in catch",err);
    todosDiv.innerText = " :(";
  })
  .finally((_) => {
    spinner.remove();
  });
