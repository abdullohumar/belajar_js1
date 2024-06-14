document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
  });

  function addTodo() {
    const textTodo = document.getElementById("title").value;
    const timeStamp = document.getElementById("date").value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timeStamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }

  function generateTodoObject(id, todo, timestamp, isCompleted) {
    return {
      id,
      todo,
      timestamp,
      isCompleted,
    };
  }

  const todos = [];
  const RENDER_EVENT = "render-todo";

  function makeTodo(todoObject) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.todo; // use todoObject.todo instead of todoObject.task

    const textTimeStamp = document.createElement("p");
    textTimeStamp.innerText = todoObject.timestamp; // use todoObject.timestamp instead of todoObject.timeStamp

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    return container;
  }

  document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);
    const unCompletedTODOList = document.getElementById("todos");
    unCompletedTODOList.innerHTML = '';

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      unCompletedTODOList.append(todoElement);
    }
  });
});
