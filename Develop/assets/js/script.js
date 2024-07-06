// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const timestamp = dayjs().format('YYYYMMDDHHmmssSSS'); // Get current timestamp in a specific format
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    return timestamp + '-' + randomNum; // Combine timestamp and random number to create a unique ID
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    // Create a new task card element
    const card = document.createElement('div');
    card.classList.add('task-card');

    // Populate the card with task details
    card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Deadline: ${task.deadline}</p>
    `;

    // Return the created task card
    return card;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
