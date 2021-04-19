const FAKE_API_URL = "https://jsonplaceholder.typicode.coms/";
console.log("Beginning Fetch");
const todosDiv = document.getElementById("todos");
const spinner = document.getElementById("spinner");

todosDiv.innerText = "Loading Todos. Please Wait...";

function getTodosDescription(todos, count = 100) {
  return todos
    .slice(0, count)
    .map(({ id, title }) => {
      return `${id}. ${title}`;
    })
    .join("\n");
}

fetch(FAKE_API_URL + "todos")
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(new Error("Unable to get todos"))
    }
    return response.json().then((todos) => {
      todosDiv.innerText = getTodosDescription(todos);
      return "Miro u Rodik from inner then in previous then";
    });
  })
  .then((val) => console.log(val))
  .catch((err) => {
    console.error(err);
    todosDiv.innerText = " :(";
  })
  .finally((_) => {
    console.log("All Done!!!");
    spinner.remove();
  });

console.log("End of program");
