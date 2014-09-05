angular.module('cthulhuApp', [])

	.controller('CharSheetController', ['$scope', function($scope) {
// TODO: should be a more delicate way tho...
	$scope.generic = {};
	$scope.statistic = {};

// console.log actual state of the `generic` model
// only here for demonstrational purposes
	$scope.onDebugger = function () {
		console.log(this.generic);
		console.log(this.statistic);
		// debugger;
	};

	$scope.onRandom = function () {
		debugger;
	};

	$scope.diceRoll = function (inputName, dice) {
		$('input[name=' + inputName + ']').val(Dice.roll(dice)).trigger('input');
	};
}]);