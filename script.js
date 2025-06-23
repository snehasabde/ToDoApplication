const todoTitle = document.getElementById('todo-title');
const todoList = document.getElementById('todo-list');
const messageBox = document.getElementById('message-box');

function showMessage(message, type = 'success') {
    messageBox.style.display = 'block';
    messageBox.textContent = message;
    messageBox.style.backgroundColor = type === 'error' ? '#f8d7da' : '#dff0d8';
    messageBox.style.color = type === 'error' ? '#721c24' : '#3c763d';
    messageBox.style.border = `1px solid ${type === 'error' ? '#f5c6cb' : '#d6e9c6'}`;

    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

document.getElementById('add-btn').addEventListener('click', () => {
    const title = todoTitle.value.trim();
    if (!title) return showMessage("Please enter a todo title.", 'error');

    fetch('http://localhost:8080/api/todo/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    }).then(() => {
        todoTitle.value = "";
        getTodoItems();
        showMessage("Todo added successfully!");
    }).catch(() => showMessage("Error adding todo", 'error'));
});

document.getElementById('display-btn').addEventListener('click', getTodoItems);

document.getElementById('update-btn').addEventListener('click', () => {
    const id = prompt("Enter ID of the todo item to update:");
    const newTitle = prompt("Enter new title:");
    if (!id || !newTitle) return showMessage("Invalid input", 'error');

    fetch(`http://localhost:8080/api/todo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, completed: false })
    }).then(() => {
        getTodoItems();
        showMessage("Todo updated successfully!");
    }).catch(() => showMessage("Error updating todo", 'error'));
});

document.getElementById('delete-btn').addEventListener('click', () => {
    const id = prompt("Enter ID of the todo item to delete:");
    if (!id) return showMessage("Invalid ID", 'error');

    fetch(`http://localhost:8080/api/todo/${id}`, {
        method: 'DELETE'
    }).then(() => {
        getTodoItems();
        showMessage("Todo deleted successfully!");
    }).catch(() => showMessage("Error deleting todo", 'error'));
});

function getTodoItems() {
    fetch('http://localhost:8080/api/todo/task')
        .then(response => response.json())
        .then(data => {
            todoList.innerHTML = '';
            data.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = `ID: ${todo.id} | ${todo.title}`;
                todoList.appendChild(li);
            });
        });
}
