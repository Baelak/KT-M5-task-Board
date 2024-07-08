// Retrieve tasks and nextId from localStorage

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id

function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card

function createTaskCard(task) {
    let deadlineDate = dayjs(task.deadline);
    let currentDate = dayjs();
    let cardClass = "";

    if (deadlineDate.isBefore(currentDate)) {
        cardClass = "bg-danger text-white";
    } else if (deadlineDate.diff(currentDate, 'days') <= 2) {
        cardClass = "bg-warning text-dark";
    }

    return `<div class="card mb-3 ${cardClass}" id="task-${task.id}">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><small class="text-muted">${dayjs(task.deadline).format('YYYY-MM-DD')}</small></p>
                    <button type="button" class="btn btn-danger btn-sm float-end delete-task">Delete</button>
                </div>
            </div>`;
}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
    $("#todo-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(task => {
        let card = createTaskCard(task);
        if (task.status === "todo") {
            $("#todo-cards").append(card);
        } else if (task.status === "in-progress") {
            $("#in-progress-cards").append(card);
        } else if (task.status === "done") {
            $("#done-cards").append(card);
        }
    });

    $(".card").draggable({
        revert: true,
        revertDuration: 0,
        zIndex: 100,
        start: function(event, ui) {
            $(this).addClass('dragging');
        },
        stop: function(event, ui) {
            $(this).removeClass('dragging');
        }
    });
}

// Todo: create a function to handle adding a new task

function handleAddTask(event) {
    event.preventDefault();

    let title = $("#task-title").val().trim();
    let description = $("#task-description").val().trim();
    let deadline = $("#task-deadline").val().trim();

    if (!title || !description || !deadline) {
        alert("Please fill out all fields.");
        return;
    }

    let newTask = {
        id: generateTaskId(),
        title: title,
        description: description,
        deadline: dayjs(deadline).format(),
        status: "todo"
    };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);
    $("#task-form")[0].reset();
    $("#formModal").modal("hide");
    renderTaskList();
}

// Todo: create a function to handle deleting a task

function handleDeleteTask(event) {
    let taskId = $(event.target).closest(".card").attr("id").replace("task-", "");
    taskList = taskList.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane

function handleDrop(event, ui) {
    let taskId = ui.draggable.attr("id").replace("task-", "");
    let newStatus = $(this).attr("id");

    let taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));
    taskList[taskIndex].status = newStatus;

    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

$(document).ready(function () {
    renderTaskList();

    $("#task-form").submit(handleAddTask);

    $(document).on("click", ".delete-task", handleDeleteTask);

    $(".lane").droppable({
        accept: ".card",
        drop: handleDrop
    });

    $("#task-deadline").datepicker({
        dateFormat: "yy-mm-dd"
    });
});
