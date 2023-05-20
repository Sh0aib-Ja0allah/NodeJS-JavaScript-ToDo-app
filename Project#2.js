const readline = require('readline');

class Task {
  constructor(description, dueDate, priority) {
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark the task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by the due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');
  rl.question('What\'s your choice? ', ChooseAnAction);
}

function ChooseAnAction(choice) {
  switch (choice) {
    case '1':
      addNewTask();
      break;
    case '2':
      AllTasks();
      break;
    case '3':
      CompletedTasks();
      break;
    case '4':
      DoneTask();
      break;
    case '5':
      deleteTask();
      break;
    case '6':
      sortTasksByDueDate();
      break;
    case '7':
      sortTasksByPriority();
      break;
    case '8':
      deleteAllTasks();
      break;
    default:
      console.log('Invalid choice. Please try again.');
  }
}

function addNewTask() {
  rl.question('Enter task description: ', function (description) {
    rl.question('Enter due date (YYYY-MM-DD): ', function (dueDate) {
      rl.question('Enter priority: ', function (priority) {
        const task = new Task(description, new Date(dueDate), priority);
        tasks.push(task);
        console.log('Task added successfully.');
        displayMenu();
      });
    });
  });
}

function AllTasks() {
  console.log('All tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}) Description: ${task.description}`);
    console.log(`   Due Date: ${task.dueDate.toISOString().substring(0, 10)}`);
    console.log(`   Priority: ${task.priority}`);
    console.log(`   Completed: ${task.completed ? 'Yes' : 'No'}`);
    console.log('-----------------------');
  });
  displayMenu();
}

function CompletedTasks() {
  console.log('Completed tasks:');
  const completedTasks = tasks.filter(task => task.completed);
  completedTasks.forEach((task, index) => {
    console.log(`${index + 1}) Description: ${task.description}`);
    console.log(`   Due Date: ${task.dueDate.toISOString().substring(0, 10)}`);
    console.log(`   Priority: ${task.priority}`);
    console.log('-----------------------');
  });
  displayMenu();
}

function DoneTask() {
  rl.question('Enter the task number to mark as done: ', function (taskNumber) {
    const index = parseInt(taskNumber) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      console.log('Task marked as done.');
    } else {
      console.log('Invalid task number.');
    }
  })
}

displayMenu()