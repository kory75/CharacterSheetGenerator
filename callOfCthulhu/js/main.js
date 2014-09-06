angular.module('cthulhuApp', [])

	.controller('CharSheetController', ['$scope', function($scope) {
// TODO: should be a more delicate way tho...
	$scope.generic = {};
	$scope.statistic = {};
	var form = [
		{
			fieldsetName: 'General Information',
			fields: [
				{
					name: 'name',
					type: 'text',
					label: 'Name',
					description: '',
					size: 'medium' //indicates the size of the field
				},
				{
					name: 'occupation',
					type: 'text',
					label: 'Occupation',
					description: '',
					size: 'medium'
				},
			]
		},
		{
			fieldsetName: 'Statistics',
			fields: [
				{
					name: 'str',
					type: 'number',
					label: 'STR',
					description: 'Strength',
					dice: '3d6'
				},
				{
					name: 'dex',
					type: 'number',
					label: 'DEX',
					description: 'Dexterity',
					dice: '3d6'
				},
			]
		}
	];

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