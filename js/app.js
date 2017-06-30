
// Contains all methods related to Data of the App
var Data = {
	todos: {},
	init: function() {
		// Restoring data from localStorage, if any
		try{
			this.todos = JSON.parse(localStorage.getItem("todos")) || {};
		} catch(e) {
			// If localStorage is not supported
			this.todos = null;
		}
		return this.todos;
	},
	addTodo: function(id, todo) {
		console.log(id);
		this.todos[id] = todo;
	},
	saveTodos: function() {
		localStorage.setItem("todos", JSON.stringify(this.todos));
	},
	markAsDone: function(id) {
		this.todos[id].done = !this.todos[id].done;
	}
};

// The main controller of the app
var App = {
	init: function() {
		window.onload = function() {
			var todos = Data.init();
			View.init(todos);
		}

		window.onbeforeunload = function() {
			console.log("closing");
			// Save current todos list
			Data.saveTodos();
		}
	},
	addTodoToData: function(id, todo) {
		Data.addTodo(id, todo);
	},
	markAsDone: function(id) {
		Data.markAsDone(id);
	}
};

// This handles all the view related things
var View = {
	addButton: document.querySelector(".addButton"),
	todoModal: document.querySelector(".todoModal"),
	cards: document.querySelector(".cards"),
	id: 0,
	currentTodo: 0,

	init: function(todos) {
		// Add all bindings
		this.addBindings();

		// Populate todos from local storage
		this.addTodos(todos);
	},
	addBindings: function() {
		// Displays the modal
		this.addButton.addEventListener("click",function() {
			View.todoModal.style.display = "flex";
		});

		// Hides the modal
		var closeModal = document.querySelector(".closeModal");
		closeModal.addEventListener("click", function() {
			View.todoModal.style.display = "none";
		});

		// Adds a new todo
		var submit = document.querySelector(".submit");
		submit.addEventListener("click", function() {
			var inputText = document.querySelector(".inputText");
			if(inputText.value.length > 0) {
				// Get the user locale
				var language = (navigator.language || navigator.browserLanguage);

				// Get the current date
				var dateObj = new Date();

				// Convert to a readable format in the current locale
				var date = dateObj.toLocaleDateString(language);
				var todo = 	{
								text: inputText.value,
								date: date,
								done: false
							};
				View.addNewTodo(++View.id, todo);
				View.todoModal.style.display = "none";
				inputText.value = "";

				View.currentTodo = View.id;

				App.addTodoToData(View.id, todo);
			} else {
				alert("Please enter some text!");
			}
		});

		var deleteButton = document.querySelector(".deleteButton");

		// Fired when delete button is clicked
		deleteButton.addEventListener("click", function() {
			// Get all the todos available
			var todos = document.querySelectorAll(".card");

			if(todos.length > 0) {
				for(var i = 0; i < todos.length; i++) {
					// Find the top most todo
					if(todos[i].id === View.currentTodo) {
						// And delete it
						View.cards.removeChild(todos[i]);
						// Update the current todo
						if(i > 0)
							View.currentTodo = todos[i - 1].id;
						else
							View.currentTodo = 0;
						break;
					}
				}
			}
		});


		var doneButton = document.querySelector(".doneButton");

		doneButton.addEventListener("click", function() {
			View.markAsDone(View.currentTodo);
			App.markAsDone(View.currentTodo);
		});
	},
	addTodos: function(todos) {
		if(todos) {
			console.log(todos);
			for(var i in todos) {
				if(todos[i].text.length > 0) {
					this.addNewTodo(i, todos[i]);
					this.id = i;
					View.currentTodo = i;
				}
			}
		} else {
			alert("Your browser does not support local storage." +
				" Please use a browser that support local storage to enjoy the app!");
		}
	},
	addNewTodo: function(id, todo) {
		var html = '<div class="card" id="'+ id +'"> ' +
						'<div class="textDiv">' +
							'<span class="text">' + todo.text + '</span>' +
						'</div>' +
						'<div class="dateDiv">' +
							'<span class="date">' + todo.date + '</span>' +
						'</div>' +
					'</div>';

		this.cards.innerHTML += html;

		if(todo.done) {
			this.markAsDone(id, todo);
		}
	},
	markAsDone: function(id) {
		document.getElementById(id).classList.toggle("done");
	}
}


App.init();