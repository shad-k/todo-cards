$(function() {
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
		init: function() {
			// Add all bindings
			this.addBindings();
		},
		addBindings: function() {
			// Displays the modal
			$(".addButton").click(function() {
				$(".todoModal").css("display", "flex");
			});

			// Hides the modal
			$(".closeModal").click(function() {
				$(".todoModal").hide();
			});

			// Adds a new todo
			$(".submit").click(function() {
				View.addNewTodo($(".inputText").val());
				$(".todoModal").hide();
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
			$(".cards").append(html);
		}
	}


	App.init();
});