//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");

//EventListeners
document.addEventListener('DOMContentLoaded' , getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);

//FUNCTIONS
function addTodo(event) {
    //prevent form to submit
    event.preventDefault();
    //ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('Todo-item');
    todoDiv.appendChild(newTodo);
    //ADD todo to localStorage
savelocaltodos(todoInput.value);
    //Check Icon Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class= "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Trash Icon Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //AppendChild to todo Div
    todoList.appendChild(todoDiv);
    //Clear todoInput Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removelocaltodos(todo);
        todo.addEventListener('transitioned', function () {
            todo.remove();
        })


    }
    //Check Mark Running
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}
//Saving Todos in localstorage-----
function savelocaltodos(todo){
let todos;
if(localStorage.getItem("todos")=== null){
    todos = [];
} else{
    todos = JSON.parse(localStorage.getItem("todos"));
}
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos));

}
function getTodos(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
//ToDo DIV
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

const newTodo = document.createElement("li");
newTodo.innerText = todo;
newTodo.classList.add('Todo-item');
todoDiv.appendChild(newTodo);
//Check Icon Button
const completeButton = document.createElement('button');
completeButton.innerHTML = '<i class= "fas fa-check"></i>';
completeButton.classList.add("complete-btn");
todoDiv.appendChild(completeButton);
//Trash Icon Button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);
//AppendChild to todo Div
todoList.appendChild(todoDiv);
    });
}
function removelocaltodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}