import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
	databaseURL: "https://playground-e11f0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tasksInDb = ref(database, "Tasks");

console.log(tasksInDb)

const userInput = document.getElementById("input-field");

const addButton = document.getElementById("add-button");
const taskList = document.getElementById("list");

onValue(tasksInDb, function(snapshot) {
	if (snapshot.val()) {
		let tasksArr = Object.entries(snapshot.val());
		clearTaskList();
		for (let task of tasksArr) {
			let currentId = task[0];
			let currentTask = task[1];
			appendTaskToList(currentId, currentTask);
		}
	}
	else {
		taskList.innerHTML = `🥳🎉 You have no tasks! 👏😃`;
	}

});

function clearInput() {
	userInput.value = "";
}

function appendTaskToList(id, task) {
	let newLi = document.createElement("li");
	newLi.textContent = task;
	taskList.append(newLi);
	newLi.addEventListener('click', () => {
		let selectedTask = ref(database, `Tasks/${id}`);
		remove(selectedTask);
	})
}

function clearTaskList() {
	taskList.innerHTML = "";
}

addButton.addEventListener('click', () => {
	let inputVal = userInput.value;
	push(tasksInDb, inputVal);
	clearInput();
	});

