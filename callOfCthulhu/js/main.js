angular.module('cthulhuApp', [])
	.controller('GenericController', ['$scope', function($scope) {
// set default values for the generic infos
// TODO: should be a more delicate way tho...
	$scope.generic = {
		name: '',
		occupation: '',
		age: '',
		sex: '',
		nationality: '',
		residence: ''
	};

// console.log actual state of the `generic` model
// only here for demonstrational purposes
	$scope.onDebugger = function () {
		console.log(this.generic);
		//debugger;
	};
}]);