(function() {

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

	var app = angular.module('cthulhuApp', []);

	app.controller('CharSheetController', ['$scope', function($scope) {

		this.form = form;
		this.values = {};

		$scope.onDebugger = function () {
			debugger;
		};

		$scope.diceRoll = function (inputName, dice) {
			$('input[name=' + inputName + ']').val(Dice.roll(dice)).trigger('input');
		};
	}]);
})();
