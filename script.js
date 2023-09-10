var todos = document.getElementById('todos-input') ;
var add = document.getElementById('add');
var todo = document.getElementById('todo-list');

const getTodosFromLocalStorage = () => {
  return localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
};


class Todos{
    constructor(id,title , state ) {
     this.id = id ; 
     this.title = title; 
     this.state = state ; 
    } 
 };


add.addEventListener('click' , ()=> {
  const value = todos.value ; 
  const id = Date.now().toString() ; 
  const title = value ; 
  let state = '0' ; 
  let item = new Todos(id,title,state) ; 
  createTodo(item) ;

  let todoList = getTodosFromLocalStorage() ; 
  todoList.push(item) ; 
  localStorage.setItem('items' ,JSON.stringify(todoList)) ; 
  todos.value = '' ;
}) 


function createTodo(item) {
    const p = document.createElement('p') ; 
    p.className ='font-bold text-3xl' ; 
    p.innerHTML = item.title ; 

    const div = document.createElement('div') ; 
    div.className = 'buttons' ;  

    const block = document.createElement('div') ;  ; 
    block.className = 'flex flex-col gap-1 text-center';
    block.id = item.id ; 
    

    let stateBtn = document.createElement('button');
    stateBtn.className = 'Task bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2';
    stateBtn.id = item.state;

    if (stateBtn.id === '0') {
        stateBtn.innerHTML = 'To-do';
        stateBtn.style.backgroundColor = 'rgb(89, 183, 186)';
    }

    else if (stateBtn.id === '1') {
        stateBtn.innerHTML = 'Doing';
        stateBtn.style.backgroundColor = 'blue';
    }

    else if (stateBtn.id === '2') {
        stateBtn.innerHTML = 'Done';
        stateBtn.style.backgroundColor = 'green';
    }

   const deleteBtn = document.createElement('button') ; 
   deleteBtn.innerHTML = 'Delete' ; 
   deleteBtn.className = 'Delete bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

   div.append(stateBtn,deleteBtn) ; 

   block.append(p,div) ; 
   
   todo.append(block) ;

   stateBtn.addEventListener('click' , stateTodo) ; 
   deleteBtn.addEventListener('click' , deleteTodo) ; 

}


const stateTodo = (e) => {
  let state = e.target;
  const situation = e.target.parentElement.parentElement;
 
  let todo_list = getTodosFromLocalStorage();
  todo_list = todo_list.filter((item) => {
      if (item.id === situation.id) {
          if (item.state === '0') {
              item.state = '1';
              state.innerHTML = 'Doing';
              state.style.backgroundColor = 'blue';

          }
          else if (item.state === '1') {
              item.state = '2';
              state.innerHTML = 'Done';
              state.style.backgroundColor = 'green';

          }
          else if (item.state === '2') {
              item.state = '0';
              state.innerHTML = 'To-do';
              state.style.backgroundColor = 'rgb(89, 183, 186)';

          }
          localStorage.setItem('items', JSON.stringify(todo_list));
      }
  });
}

const deleteTodo = (e) => {
   const selectTodo = e.target.parentElement.parentElement ; 

   todo.removeChild(selectTodo) ; 
   let todo_list = getTodosFromLocalStorage() ; 
   
   todo_list = todo_list.filter((items) => {
    return items.id !== selectTodo.id ; 
   });

   localStorage.setItem('items' , JSON.stringify(todo_list)) ; 


}


function load(){
  let todo_list = getTodosFromLocalStorage() ; 
  todo_list.map((item) => createTodo(item));
}


window.addEventListener("DOMContentLoaded" , load ) ; 