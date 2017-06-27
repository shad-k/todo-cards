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
			console.log(todo);
		}
	}


	App.init();
});