// Retrieve tasks and nextId from localStorage
document.addEventListener('DOMContentLoaded', function () {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
//function generateTaskId() {
  //  const timestamp = dayjs().format('YYYYMMDDHHmmssSSS'); // Get current timestamp in a specific format
    //const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    //return timestamp + '-' + randomNum; // Combine timestamp and random number to create a unique ID
//}
function generateTaskId() {
    return nextId++;
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    // Create a new task card element
    const card = document.createElement('div');
    card.classList.add('task-card', 'card', 'mb-3');
    card.setAttribute('data-id', task.id);

    // Populate the card with task details
 card.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${task.title}</h3>
                <p class="card-text">${task.description}</p>
                <p class="card-text"><small>Deadline: ${dayjs(task.deadline).format('MMMM D, YYYY')}</small></p>
                <button class="btn btn-danger delete-task">Delete</button>
            </div>
        `;
        card.draggable = true;

        return card;
    }

    // Return the created task card
    function createTaskCard(task) {
        const card = document.createElement('div');
        card.classList.add('task-card');
      
        const title = document.createElement('h3');
        title.textContent = task.title;
      
        const description = document.createElement('p');
        description.textContent = task.description;
      
        const deadline = document.createElement('p');
        deadline.textContent = `Deadline: ${task.deadline}`;
      
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(deadline);
      
        return card;
      }

function renderTaskList(tasks) {
        const todoCardsContainer = document.getElementById('todo-cards');
        const inProgressCardsContainer = document.getElementById('in-progress-cards');
        const doneCardsContainer = document.getElementById('done-cards');

        todoCardsContainer.innerHTML = '';
        inProgressCardsContainer.innerHTML = '';
        doneCardsContainer.innerHTML = '';

        tasks.forEach(task => {
            const card = createTaskCard(task);
            if (task.status === 'todo') {
                todoCardsContainer.appendChild(card);
            } else if (task.status === 'inProgress') {
                inProgressCardsContainer.appendChild(card);
            } else if (task.status === 'done') {
                doneCardsContainer.appendChild(card);
            }
        });

      // Todo: create a function to render the task list and make cards draggable
$('.task-card').draggable({
            revert: 'invalid',
            cursor: 'move',
            helper: 'clone',
            start: function(event, ui) {
                ui.helper.addClass('dragging');
            },
            stop: function(event, ui) {
                ui.helper.removeClass('dragging');
            }
        });
    }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
        event.preventDefault();

        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const deadline = document.getElementById('task-deadline').value;

        const newTask = {
            id: generateTaskId(),
            title: title,
            description: description,
            deadline: deadline,
            status: 'todo'
        };

        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        localStorage.setItem('nextId', JSON.stringify(nextId));

        renderTaskList(taskList);

        $('#formModal').modal('hide');
    }
// Todo: create a function to handle deleting a task
// Function to handle deleting a task
function handleDeleteTask(event) {
    if (event.target.classList.contains('delete-task')) {
        const taskCard = event.target.closest('.task-card');
        const taskId = taskCard.getAttribute('data-id');

        taskList = taskList.filter(task => task.id !== parseInt(taskId));
        localStorage.setItem('tasks', JSON.stringify(taskList));

        renderTaskList(taskList);
    }
}

// Example: Attach event listener to the document for handling task deletions
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-task')) {
        handleDeleteTask(event);
    }
});

// Todo: create a function to handle dropping a task into a new status lane
// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const droppedTask = ui.draggable;
    const newStatusLane = $(this);
    const taskId = droppedTask.attr('data-id');

    const task = taskList.find(task => task.id === parseInt(taskId));
    if (newStatusLane.attr('id') === 'to-do') {
        task.status = 'todo';
    } else if (newStatusLane.attr('id') === 'in-progress') {
        task.status = 'inProgress';
    } else if (newStatusLane.attr('id') === 'done') {
        task.status = 'done';
    }

    localStorage.setItem('tasks', JSON.stringify(taskList));

    renderTaskList(taskList);
}

document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
document.addEventListener('click', handleDeleteTask);

$('.lane').droppable({
    drop: handleDrop
});

$('#task-deadline').datepicker({
    changeMonth: true,
    changeYear: true,
});

renderTaskList(taskList);
});

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Render the task list
    // You can fetch tasks from localStorage or an API and render them in the respective lanes

    // Add event listeners
    // Add event listeners for buttons, forms, or any interactive elements on the page

    // Make lanes droppable
    $('.lane').droppable({
        drop: handleDrop // Call handleDrop function when a task is dropped
    });

    // Make the due date field a date picker
    $('#due-date').datepicker({
        changeMonth: true,
        changeYear: true,
    });
