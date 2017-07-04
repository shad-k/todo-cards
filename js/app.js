
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
		this.todos[id] = todo;
	},
	saveTodos: function() {
		localStorage.setItem("todos", JSON.stringify(this.todos));
	},
	deleteTodo: function(id) {
		delete this.todos[id];
	},
	markAsDone: function(id) {
		this.todos[id].done = !this.todos[id].done;
	},
	editTodo: function(id, text) {
		this.todos[id].text = text;
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
	deleteTodo: function(id) {
		Data.deleteTodo(id);
	},
	markAsDone: function(id) {
		Data.markAsDone(id);
	},
	editTodo: function(id, text) {
		Data.editTodo(id, text);
	}
};

// This handles all the view related things
var View = {
	addButton: document.querySelector(".addButton"),
	todoModal: document.querySelector(".todoModal"),
	cards: document.querySelector(".cards"),
	id: 0,
	currentTodo: 0,
	editModal: document.querySelector(".editModal"),
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

		// Hides the modal
		var close = document.querySelector(".close");
		close.addEventListener("click", function() {
			View.editModal.style.display = "none";
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
				console.log(View.currentTodo);

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
					if(todos[i].id == View.currentTodo) {
						// And delete it
						console.log(View.currentTodo, todos[i].id);
						View.cards.removeChild(todos[i]);
						App.deleteTodo(View.currentTodo);
						// Update the current todo
						if(i > 0)
							View.currentTodo = todos[i - 1].id;
						else {
							View.currentTodo = 0;
							View.id = 0;
						}
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


		var editButton = document.querySelector(".editButton");

		editButton.addEventListener("click", function() {
			View.editModal.style.display = "flex";
		});


		var edit = document.querySelector(".edit");
		edit.addEventListener("click", function() {
			var editText = document.querySelector(".editText").value;

			App.editTodo(View.currentTodo, editText);
			View.editModal.style.display = "none";

			var text = document.querySelectorAll(".text");
			text[View.currentTodo - 1].innerHTML = editText;
		});


		var leftArrow = document.querySelector(".leftArrow");
		leftArrow.addEventListener("click", function() {
			var todos = document.querySelectorAll(".card");

			if(View.currentTodo > 1) {
				console.log(View.currentTodo);
				todos[View.currentTodo - 1].style.zIndex = 0;
				View.currentTodo--;
				todos[View.currentTodo - 1].style.zIndex = 100;
			}
		});

		var rightArrow = document.querySelector(".rightArrow");
		rightArrow.addEventListener("click", function() {
			var todos = document.querySelectorAll(".card");

			if(View.currentTodo <= todos.length - 1) {
				console.log(View.currentTodo);
				todos[View.currentTodo - 1].style.zIndex = 0;
				View.currentTodo++;
				todos[View.currentTodo - 1].style.zIndex = 100;
			}
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