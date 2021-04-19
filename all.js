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

Promise.all([queryAPI("todos"), queryAPI("posts"), queryAPI("comments")])
  .then(([todos, posts, comments]) => {
    const result = `${todos.length} todos,
    ${posts.length} posts,
    ${comments.length} comments`;
    todosDiv.innerText = result;
  })
  .catch((err) => {
    console.error(err);
    todosDiv.innerText = " :(";
  })
  .finally((_) => {
    spinner.remove();
  });
