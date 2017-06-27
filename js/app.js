$(function() {
	var Data = {
		init: function() {
			if(typeof (Storage) !== "undefined") {

			} else {
				var todoJSON = localStorage.getItem("todos") || {};
			}
		},
	};


	var App = {
		init: function() {
			Data.init();
			View.init();
		},
	};


	var View = {
		init: function() {
			this.addBindings();
		}
	}
});