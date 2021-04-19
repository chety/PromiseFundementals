//#region Setup
const TODO_API_URL = "https://jsonplaceholder.typicode.com/";

const todosDiv = document.getElementById("todos");
const spinner = document.getElementById("spinner");

todosDiv.innerText = "Loading Todos. Please Wait...";


async function queryAPI(endPoint) {
  const response = await fetch(TODO_API_URL + endPoint);
  if (response.ok) {
    // Returning response.json() or await response.json() is  same in this case
    return response.json();
  }
  throw new Error("Failed to get ${endPoint} endpoint");
}

//#endregion

async function getTodos() {
  try {
    const [todos, posts, comments] = await Promise.all([
      queryAPI("todos"),
      queryAPI("posts"),
      queryAPI("comments"),
    ]);
    const result = `${todos.length} todos\n${posts.length} posts\n${comments.length} comments`;
    todosDiv.innerText = result;
  } catch (err) {
    console.warn(err);
    todosDiv.innerText = " :(";
  } finally {
    spinner.remove();
  }
}
getTodos();
