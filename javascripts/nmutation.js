var nmutation = (function(){
	var _config = {childList: true},
		_callback = {};

	return {
		render: function(patient) {
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					var parentNode = mutation.target,
						addedNodes = mutation.addedNodes,
						removedNodes = mutation.removedNodes;

					_callback(parentNode, addedNodes, removedNodes);
				});
			});
			observer.observe(patient, _config);
		},
		init: function(patients, callback) {

			_callback = callback;
			
			if(Array.isArray(patients)) {//if array i.e ['.container', '.your-container']
				patients.forEach(function(value){
					elements = document.querySelectorAll(value);
					for(var i = 0; i < elements.length; i++) {
						this.render(elements[i]);
					}
				}.bind(this));
			} else { //if single element or class i.e '.my-container'
				elements = document.querySelectorAll(patients);
				for(var i = 0; i < elements.length; i++) {
					this.render(elements[i]);
				}
			}
		}
	};
})();