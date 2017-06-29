
// Contains all methods related to Data of the App
var Data = {
	init: function() {
		if(typeof (Storage) !== "undefined") {

		} else {
			var todoJSON = localStorage.getItem("todos") || {};
			console.log(todoJSON);
		}
	},
};

// The main controller of the app
var App = {
	init: function() {
		Data.init();
		View.init();
	},
};

// This handles all the view related things
var View = {
	addButton: document.querySelector(".addButton"),
	todoModal: document.querySelector(".todoModal"),
	cards: document.querySelector(".cards"),
	init: function() {
		// Add all bindings
		this.addBindings();
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
			View.addNewTodo(inputText.value);
			View.todoModal.style.display = "none";
			inputText.value = "";
		});
	},
	addNewTodo: function(todo) {
		// Get the user locale
		var language = (navigator.language || navigator.browserLanguage);

		// Get the current date
		var dateObj = new Date();

		// Convert to a readable format in the current locale
		var date = dateObj.toLocaleDateString(language);

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
							'<span class="text">' + todo + '</span>' +
						'</div>' +
						'<div class="dateDiv">' +
							'<span class="date">' + date + '</span>' +
						'</div>' +
					'</div>';

		this.cards.innerHTML = html;
	}
}


App.init();