import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
	databaseURL: "https://playground-e11f0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDb = ref(database, "items");

console.log(itemsInDb)

const userInput = document.getElementById("input-field");

const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

function addListItem(inputVal) {
	shoppingList.innerHTML += `<li>${inputVal}</li>`
}

function clearInput() {
	userInput.value = "";
}

addButton.addEventListener('click', () => {
	let inputVal = userInput.value;
	push(itemsInDb, inputVal);
	addListItem(inputVal);
	clearInput();
	});
