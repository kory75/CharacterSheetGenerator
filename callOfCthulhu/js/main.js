// global variable for random values
// TODO: should be a more delicate way tho...
randomValues = {
	name: ['Brogam Moore', 'Arthur R. Sulivan', 'Kyle Lukowsky', 'Benjamin T. Thomson'],
	age: Math.floor(Math.random()*100),
	occupation: ['advocat', 'archeologist', 'occultist', 'highschool teacher'],
	sex: ['male', 'female'],
	nationality: ['english', 'american', 'german'],
	redisence: ['Boston, MA', 'Arkham, MA', 'Quochag, MA']
};

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