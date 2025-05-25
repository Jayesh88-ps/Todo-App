const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();
// Retrieve todos from localStorage
/*Use the event listener to listen for the 'submit' event on the form.
When the form is submitted, prevent the default action and call the addTodo function.
*/
todoForm.addEventListener('submit', function(e) {
   e.preventDefault();
   addTodo(); 
});

function addTodo() {
    //Use todoInput.value to get the value of the input field.
    //Trim the value to remove any leading or trailing whitespace.
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {

    const todoObject = {
        text: todoText,
        completed: false 
    }

    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
     
    todoInput.value = ""; 
    // Clear the input field after adding the todo
     //Check if the input is not empty before adding it to the list.  if (todoText !== '') {
  }
}


function updateTodoList(){
    todoListUL.innerHTML = ""; 
    // Clear the list before updating
    //Iterate over allTodos and create a list item for each todo.
      allTodos.forEach((todo, todoIndex)=>{
      todoItem = createTodoItem(todo, todoIndex);
      todoListUL.append(todoItem);  
    })
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    /*Use backqoute (``) to create a template literal for the innerHTML of the list item.
    Use the todoText variable to set the text content of the label element.*/ 
    todoLI.innerHTML = `
       <input type="checkbox" id="${todoId}" class="checkbox" />
                
                <label class="costum-checkbox" for="${todoId}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label class="todo-text" for="${todoId}">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button> 
    `
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLI.querySelector('input');
    checkbox .addEventListener("change", ()=>{
       allTodos[todoIndex].completed = checkbox.checked;
       saveTodos(); 
    })
    checkbox.checked = todo.completed;
    return todoLI;
} 

function deleteTodoItem(todoIndex){
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos(); // Save the updated todos to localStorage
  updateTodoList(); // Update the displayed todo list
}

//Use localStorage to save the data in the browser.
function saveTodos(){
    //use set item to save the allTodos array as a JSON string.
    const todosJson = JSON.stringify(allTodos);
   localStorage.setItem("todos", todosJson);
 }

//Use the getItem method to retrieve the data from localStorage and parse it back into an array.    
/*for seeing the stored data in local storage
inspector > application > local storage > website url*/
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]"; // Default to an empty array if no todos are found
    return JSON.parse(todos);
}


