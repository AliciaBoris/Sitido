document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskDisplay = document.getElementById('taskDisplay');

    // Store all cases
    let tasks = [];

    // Format numbers with commas
    function formatNumberWithCommas(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    // Load tasks from local storage if any exist
    function loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            displayTasks();
        }
    }

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to display tasks
    function displayTasks() {
        taskDisplay.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Client:</strong> ${task.clientName} <br>
                <strong>Job Type:</strong> ${task.jobType} <br>
                <strong>Start Date:</strong> ${task.startDate} <br>
                <strong>Expected Completion Date:</strong> ${task.expectedCompletionDate} <br>
                <strong>Amount Charged:</strong> ${formatNumberWithCommas(task.amountCharged)} <br>
                <strong>Amount Paid:</strong> ${formatNumberWithCommas(task.amountPaid)} <br>
                <strong>Nature of Job:</strong> ${task.natureOfJob} <br>
                <strong>Expenditure:</strong> ${formatNumberWithCommas(task.expenditure)} <br>
                <strong>Balance:</strong> ${formatNumberWithCommas(task.balance)} <br>
                <strong>Profit:</strong> ${formatNumberWithCommas(task.profit)} <br>
                <button onclick="removeTask(${index})">Remove Task</button>
            `;
            taskDisplay.appendChild(li);
        });
    }

    // Function to handle task submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientName = document.getElementById('clientName').value;
        const jobType = document.getElementById('jobType').value;
        const startDate = document.getElementById('startDate').value;
        const expectedCompletionDate = document.getElementById('expectedCompletionDate').value;
        const amountCharged = parseFloat(document.getElementById('amountCharged').value);
        const amountPaid = parseFloat(document.getElementById('amountPaid').value);
        const natureOfJob = document.getElementById('natureOfJob').value;
        const expenditure = parseFloat(document.getElementById('expenditure').value);

        const balance = amountCharged - amountPaid;
        const profit = amountCharged - expenditure;

        const task = {
            clientName,
            jobType,
            startDate,
            expectedCompletionDate,
            amountCharged,
            amountPaid,
            natureOfJob,
            expenditure,
            balance,
            profit
        };

        tasks.push(task);
        displayTasks();
        saveTasksToLocalStorage(); // Save tasks to local storage

        taskForm.reset();
    });

    // Remove task and update local storage
    window.removeTask = (index) => {
        tasks.splice(index, 1);
        displayTasks();
        saveTasksToLocalStorage(); // Save tasks after removing
    };

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();
});
// Function to handle setting a reminder for task completion
function setTaskReminder(task) {
    const expectedCompletionDate = new Date(task.expectedCompletionDate);
    const now = new Date();
    const timeUntilDeadline = expectedCompletionDate.getTime() - now.getTime();

    if (timeUntilDeadline > 0) {
        setTimeout(() => {
            alert(`Reminder: The expected completion date for ${task.clientName}'s case is on ${task.expectedCompletionDate}`);
        }, timeUntilDeadline - 86400000); // Notify 1 day before completion
    }
}

// Call this inside the submit event handler
setTaskReminder(task);

