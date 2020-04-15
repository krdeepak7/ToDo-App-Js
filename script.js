 /* Selectors */
 const todoInput = document.querySelector('.todo-input');
 const todoButton = document.querySelector('.todo-button');
 const todoList = document.querySelector('.todo-list');
 const filterOption = document.querySelector('.filter-todo');

 /* Event Listeners */
  document.addEventListener('DOMContentLoaded', getTodos);
  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  filterOption.addEventListener('click', filterTodo);

 /* Functions */
 function addTodo(event) {
   // Prevent form from Submitting
    event.preventDefault();
   // Todo div
   if (todoInput.value !== '') {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    // Add Todo to Local Storage
    saveLocalTodos(todoInput.value);
    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
     // Append Todo List
    todoList.appendChild(todoDiv); 
    // Clear Todo Input value
    todoInput.value = '';
   }
 }

 function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    // removing todos from local storage
    removeLocolTodos(todo)
    todo.addEventListener('transitionend', function(){
      todo.remove();
    });
  }

  //Check Mark
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
 }

 function filterTodo(e) {
   const todos = todoList.childNodes;
   todos.forEach(function(todo) {
     switch(e.target.value) {
       case 'all':
         todo.style.display = 'flex';
         break;
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
         case 'uncompleted':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
     }
   })
 }

 function saveLocalTodos(todo) {
   // check local storage array availability
   let todos;
   if(localStorage.getItem('todos') === null) {
     todos = [];
   } else {
     todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
 }

  function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      // Create Li
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo); 
      // Check Mark Button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>'
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
      // Trash Button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>'
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);
        // Append Todo List
      todoList.appendChild(todoDiv); 
    })
  }

  function removeLocolTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }