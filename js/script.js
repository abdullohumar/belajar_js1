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
    const todoObject = generateTodoObject(
      generatedID,
      textTodo,
      timeStamp,
      false
    );
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

  document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);
    const unCompletedTODOList = document.getElementById("todos");
    unCompletedTODOList.innerHTML = "";

    const completedTODOList = document.getElementById("todos");
    completedTODOList.innerHTML = "";

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if(!todoItem.isCompleted){
        unCompletedTODOList.append(todoElement);
      }else{
        completedTODOList.append(todoElement);
      }
    }
  });

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

    if (todoObject.isCompleted) {
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");

      undoButton.addEventListener("click", function () {
        undoTaskFromCompleted(todoObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");

      trashButton.addEventListener("click", function () {
        removeTaskFromCompleted(todoObject.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");

      checkButton.addEventListener("click", function () {
        addTaskToCompleted(todoObject.id);
      });

      container.append(checkButton);
    }


    return container;
  }
  
  function findTodo(todoId){
    for (todoItem of todos){
      if(todoItem.id == todoId){
        return todoItem
      }
    }
    return null;
  }

  function removeTaskFromCompleted(todoId){
    const todoTarget = findTodoIndex(todoId);
    
    if (todoTarget === -1 ){
      todos.splice(todoTarget, 1);
      document.dispatchEvent(new Event (RENDER_EVENT));
    }
  }

  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function findTodoIndex(todoId) {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
   
    return -1;
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const submitForm = document.getElementById("form");
//   submitForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     addTodo();
//   });

//   function addTodo() {
//     const textTodo = document.getElementById("title").value;
//     const timestamp = document.getElementById("date").value;

//     const generatedID = generateId();
//     const todoObject = generateTodoObject(
//       generatedID,
//       textTodo,
//       timestamp,
//       false
//     );
//     todos.push(todoObject);

//     document.dispatchEvent(new Event(RENDER_EVENT));
//   }

//   function generateId() {
//     return +new Date();
//   }

//   function generateTodoObject(id, todo, timestamp, isCompleted) {
//     return {
//       id,
//       todo,
//       timestamp,
//       isCompleted,
//     };
//   }

//   const todos = [];
//   const RENDER_EVENT = "render-todo";

//   document.addEventListener(RENDER_EVENT, function () {
//     const unCompletedTODOList = document.getElementById("todos");
//     unCompletedTODOList.innerHTML = "";

//     const completedTODOList = document.getElementById("completed-todos");
//     completedTODOList.innerHTML = "";

//     for (const todoItem of todos) {
//       const todoElement = makeTodo(todoItem);
//       if (!todoItem.isCompleted) {
//         unCompletedTODOList.append(todoElement);
//       } else {
//         completedTODOList.append(todoElement);
//       }
//     }
//   });

//   function makeTodo(todoObject) {
//     const textTitle = document.createElement("h2");
//     textTitle.innerText = todoObject.todo;

//     const textTimestamp = document.createElement("p");
//     textTimestamp.innerText = todoObject.timestamp;

//     const textContainer = document.createElement("div");
//     textContainer.classList.add("inner");
//     textContainer.append(textTitle, textTimestamp);

//     const container = document.createElement("div");
//     container.classList.add("item", "shadow");
//     container.append(textContainer);
//     container.setAttribute("id", `todo-${todoObject.id}`);

//     if (todoObject.isCompleted) {
//       const undoButton = document.createElement("button");
//       undoButton.classList.add("undo-button");

//       undoButton.addEventListener("click", function () {
//         undoTaskFromCompleted(todoObject.id);
//       });

//       const trashButton = document.createElement("button");
//       trashButton.classList.add("trash-button");

//       trashButton.addEventListener("click", function () {
//         removeTaskFromCompleted(todoObject.id);
//       });

//       container.append(undoButton, trashButton);
//     } else {
//       const checkButton = document.createElement("button");
//       checkButton.classList.add("check-button");

//       checkButton.addEventListener("click", function () {
//         addTaskToCompleted(todoObject.id);
//       });

//       container.append(checkButton);
//     }

//     return container;
//   }

//   function findTodoIndex(todoId) {
//     for (const index in todos) {
//       if (todos[index].id === todoId) {
//         return Number(index);
//       }
//     }
//     return -1;
//   }

//   function removeTaskFromCompleted(todoId) {
//     const todoTarget = findTodoIndex(todoId);

//     if (todoTarget !== -1) {
//       todos.splice(todoTarget, 1);
//       document.dispatchEvent(new Event(RENDER_EVENT));
//     }
//   }

//   function undoTaskFromCompleted(todoId) {
//     const todoTarget = findTodo(todoId);

//     if (todoTarget == null) return;

//     todoTarget.isCompleted = false;
//     document.dispatchEvent(new Event(RENDER_EVENT));
//   }

//   function addTaskToCompleted(todoId) {
//     const todoTarget = findTodo(todoId);

//     if (todoTarget == null) return;

//     todoTarget.isCompleted = true;
//     document.dispatchEvent(new Event(RENDER_EVENT));
//   }

//   function findTodo(todoId) {
//     return todos.find((todoItem) => todoItem.id === todoId) || null;
//   }
// });
