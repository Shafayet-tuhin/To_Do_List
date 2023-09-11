const inputTodo = document.getElementById('to-do');
const addTodoBtn = document.getElementById('add-todo');
const editTodoBtn = document.getElementById('edit-todo');
const deleteTodoBtn = document.getElementById('delete-todo');
const todoList = document.getElementById('todo-list'); 

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTodos() {  
  todoList.innerHTML = '' ; 
  todos.forEach((todo,index) => {
    const todoItem = document.createElement('div') ; 
    todoItem.textContent = todo ; 
    todoItem.dataset.index = index ; 
    todoItem.addEventListener('click' , () => selectTodoItem(index) ) ; 
    todoList.appendChild(todoItem) ; 
  });
}


function addTodo() {  
  const todoText = inputTodo.value.trim() ; // ekhane muloto extra space baad ditesi aaage and pore 
  if(todoText) 
  {
    todos.push(todoText) ; 
    saveTodos() ; 
    inputTodo.value = '' ; // ekhane aager content gulo clear kore ditesi 
    displayTodos() ;
  }
}



let selectedTodoIndex = null ; 
function selectTodoItem(index){
 selectedTodoIndex = index ; 
 inputTodo.value = todos[index] ; 
 editTodoBtn.disabled = false ;
 deleteTodoBtn.disabled = false ;
}


function editTodo() {
  if(selectedTodoIndex !== null){
    const editedTodoText = inputTodo.value.trim() ; 

    if(editedTodoText) 
    {
      todos[selectedTodoIndex] = editedTodoText ;
      saveTodos() ; 
      inputTodo.value = '' ; 
      selectedTodoIndex = null ;
      editTodoBtn.disabled = true ;
      deleteTodoBtn.disabled = true ;
      displayTodos() ; 
    }
  }
}


function deleteTodo(){
  if(selectedTodoIndex !== null) {
    todos.splice(selectedTodoIndex,1) ;
    saveTodos() ; 
    inputTodo.value='' ;
    selectedTodoIndex = null ; 
    editTodoBtn.disabled = true ; 
    deleteTodoBtn.disabled = true ; 
    displayTodos() ;
  }
}

addTodoBtn.addEventListener('click',addTodo ) ;
editTodoBtn.addEventListener('click' ,editTodo) ;
deleteTodoBtn.addEventListener('click' ,deleteTodo) ;

displayTodos() ; 
