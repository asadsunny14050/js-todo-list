// selectors
const input = document.querySelector(".todo-input");
const btn = document.querySelector(".todo-btn");
const list = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded', gettodos)
btn.addEventListener('click', addtodo);
list.addEventListener('click', delegate);
filterOption.addEventListener('click', filter);

// functions 

function addtodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
   
    newTodo.innerText = input.value;
    savetodos(input.value);

    input.value = '';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const comBtn = document.createElement('i');
    // comBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    comBtn.classList.add('com-btn');
    comBtn.classList.add('fa-solid');
    comBtn.classList.add('fa-check');
    todoDiv.appendChild(comBtn);

    const trashBtn = document.createElement('i');
    trashBtn.classList.add('trash-btn');
    trashBtn.classList.add('fa-solid');
    trashBtn.classList.add('fa-trash');
    todoDiv.appendChild(trashBtn);

    list.appendChild(todoDiv);

}


function delegate(e) {
    
    const item = e.target;

    // delete button 
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        rmvlocaltodos(todo.children[0].innerText);
        todo.addEventListener('transitionend', function(){
            
            todo.remove();
        })
    }  

    //  check buttton 
    if (item.classList[0] === 'com-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filter(e) {

    const todos = list.childNodes;
    
    todos.forEach(function(todoDiv) {
        switch(e.target.value) {

            case "all":
                todoDiv.style.display = "flex";
            break;

            case "completed":
                if(todoDiv.classList.contains("completed")) {
                    todoDiv.style.display = "flex";

                } else {
                    todoDiv.style.display = "none";
                }
            break;

            case "uncompleted":
                if(todoDiv.classList.contains("completed")) {
                    todoDiv.style.display = "none";
                } else {
                    todoDiv.style.display = "flex";
                }
            break;

        };
    });
}

function savetodos(msg) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(msg);
    localStorage.setItem('todos', JSON.stringify(todos));

    
}

function gettodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo = document.createElement('li');
       
        newTodo.innerText = todo;
        
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        const comBtn = document.createElement('i');
        // comBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        comBtn.classList.add('com-btn');
        comBtn.classList.add('fa-solid');
        comBtn.classList.add('fa-check');
        todoDiv.appendChild(comBtn);
    
        const trashBtn = document.createElement('i');
        trashBtn.classList.add('trash-btn');
        trashBtn.classList.add('fa-solid');
        trashBtn.classList.add('fa-trash');
        todoDiv.appendChild(trashBtn);
    
        list.appendChild(todoDiv);
    })

    
}

function rmvlocaltodos(txt) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todosindex = todos.indexOf(txt);

    todos.splice(todos.indexOf(txt), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}