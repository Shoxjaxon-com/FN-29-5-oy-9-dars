const form = document.querySelector("#form");
const input = document.querySelector("#input");
const block = document.querySelector("#block");
const btn = document.querySelector("#btn");

function veledet(input) {
    if (input.value.length < 4) {
        alert('Todo eng kamida 4 ta so‘zdan iborat bo‘lsin');
        input.focus();
        return false;
    }
    return true;
}

function creatCard(data) {
    const todoItem = document.createElement("div");
    todoItem.className = "block";
    todoItem.style.width = "300px";
    todoItem.style.border = "1px solid black";
    todoItem.style.borderRadius = "15px";
    todoItem.style.display = "flex";
    todoItem.style.justifyContent = "space-between";
    todoItem.style.alignItems = "center";
    todoItem.style.padding = "15px";
    todoItem.style.marginBottom = "20px";

    const todoText = document.createElement("p");
    todoText.textContent = data.name;

    const deleteButton = document.createElement("img");
    deleteButton.src = "https://img.icons8.com/ios-glyphs/30/000000/trash.png";
    deleteButton.alt = "Trash Icon";
    deleteButton.height = 25;
    deleteButton.style.cursor = "pointer";

    deleteButton.addEventListener("click", function () {
        // Todo itemni sahifadan o'chirish
        block.removeChild(todoItem);

        // `localStorage`dan o‘chirish
        let todos = getData();
        todos = todos.filter(todo => todo.id !== data.id);
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    block.appendChild(todoItem);
}

function getData() {
    let data = [];
    if (localStorage.getItem("todos")) {
        data = JSON.parse(localStorage.getItem("todos"));
    }
    return data;
}

btn && btn.addEventListener("click", function (event) {
    event.preventDefault();

    const isValed = veledet(input);
    if (!isValed) {
        return;
    }

    const todo = {
        id: Date.now(),
        name: input.value
    };

    creatCard(todo);
    input.value = "";

    // `localStorage`ga saqlash
    let todos = getData();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
});

document.addEventListener("DOMContentLoaded", function () {
    let todos = getData();

    todos.forEach(todo => {
        creatCard(todo);
    });
});

   


// function loadTodos() {
//     const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
//     savedTodos.forEach(todo => {
//         createTodoItem(todo);
//     });
// }

// function saveTodos(todos) {
//     localStorage.setItem("todos", JSON.stringify(todos));
// }

// function createTodoItem(text) {
//     const todoItem = document.createElement("div");
//     todoItem.style.display = "flex";
//     todoItem.style.alignItems = "center";
//     todoItem.style.justifyContent = "space-between";
//     todoItem.style.border = "1px solid #ddd";
//     todoItem.style.borderRadius = "8px";
//     todoItem.style.marginTop = "10px";
//     todoItem.style.padding = "10px";
//     todoItem.style.backgroundColor = "#f4f4f4";
//     todoItem.style.width = "300px";

//     const todoText = document.createElement("span");
//     todoText.textContent = text;

    // const deleteButton = document.createElement("img");
    // deleteButton.src = "https://img.icons8.com/ios-glyphs/30/000000/trash.png";
    // deleteButton.alt = "Trash Icon";
    // deleteButton.style.marginLeft = "10px";
    // deleteButton.style.cursor = "pointer";

//     deleteButton.addEventListener("click", () => {
//         block.removeChild(todoItem);

//         let todos = JSON.parse(localStorage.getItem("todos")) || [];
//         todos = todos.filter(todo => todo !== text);
//         saveTodos(todos);
//     });

//     todoItem.appendChild(todoText);
//     todoItem.appendChild(deleteButton);
//     block.appendChild(todoItem);
// }

// btn.addEventListener("click", function(event) {
//     event.preventDefault();
//     const text = input.value.trim();
//     if (text) {
//         createTodoItem(text);

//         const todos = JSON.parse(localStorage.getItem("todos")) || [];
//         todos.push(text);
//         saveTodos(todos);

//         input.value = ""; 
//     }
// });

// loadTodos();
    