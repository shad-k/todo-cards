
// Contains all methods related to Data of the App
var Data = {
	todos: [],
	init: function() {
		if(typeof (Storage) !== "undefined") {
			this.todos = JSON.parse(localStorage.getItem("todos")) || [];
		} else {
			this.todos = null;
		}
		return this.todos;
	},
	addTodo: function(todo) {
		this.todos.push(todo);
	}
};

// The main controller of the app
var App = {
	init: function() {
		window.onload = function() {
			var todos = Data.init();
			View.init(todos);
		}

		window.onclose = function() {
			// Save current todos list
		}
	},
	addTodoToData: function(todo) {
		Data.addTodoToData(todo);
	}
};

// This handles all the view related things
var View = {
	addButton: document.querySelector(".addButton"),
	todoModal: document.querySelector(".todoModal"),
	cards: document.querySelector(".cards"),
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

			// Get the current date
			var dateObj = new Date();

			// Convert to a readable format in the current locale
			var date = dateObj.toLocaleDateString(language);
			var todo = 	{
							text: inputText.value,
							date: date
						};
			View.addNewTodo(todo);
			View.todoModal.style.display = "none";
			inputText.value = "";

			App.addTodoToData(todo);
		});
	},
	addTodos: function(todos) {
		if(todos) {
			for(var i = 0; i < todos.length; i++) {
				this.addNewTodo(todos[i]);
			}
		} else {
			alert("Your browser does not support local storage." +
				" Please use a browser that support local storage to enjoy the app!");
		}
	},
	addNewTodo: function(todo) {
		console.log(todo);
		// Get the user locale
		var language = (navigator.language || navigator.browserLanguage);

		var html = '<div class="card"> ' +
						'<div class="actionDiv">' +
							'<div class="deleteButton">' +
								'<i class="fa fa-trash-o" aria-hidden="true"></i>' +
							'</div>' +
							'<div class="doneButton">' +
								'<i class="fa fa-check" aria-hidden="true"></i>' +
							'</div>' +
							'<div class="editButton">' +
								'<i class="fa fa-pencil-square-o" aria-hidden="true"></i>' +
							'</div>' +
						'</div>' +
						'<div class="textDiv">' +
							'<span class="text">' + todo.text + '</span>' +
						'</div>' +
						'<div class="dateDiv">' +
							'<span class="date">' + todo.date + '</span>' +
						'</div>' +
					'</div>';

		this.cards.innerHTML += html;
	}
}


App.init();