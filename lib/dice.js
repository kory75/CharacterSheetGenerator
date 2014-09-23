var Dice = Dice || {};
/*************************
	Dice roller
	Accepted value ex:
	'd20+ 4d3 -3+1d6 +2D4'
*************************/
Dice.roll = function(dices) {
	var total = 0;
	var elements = new Array();
	var regex = /^(\d*)[d]{1}(\d+)$/gi;
	if (Object.prototype.toString.call(dices) === '[object String]') {
		dices = dices.toLowerCase().replace(/\s+/g,'').replace(/\+/g,',+').replace(/-/g,',-');	// Strip whitespaces
		elements = dices.split(',');												// Split elements
		elements.forEach(function(element) {
			var addition;
			if (element.substring(0,1) == '+' || element.substring(0,1) == '-') {
				if (element.substring(0,1) == '+') {
					addition = true;
				} else {
					addition = false;
				}
				element = element.substring(1);
			} else {
				addition = true;
			}
			if (element.match(regex)) {
				var dice = regex.exec(element);
				var num = 0;
				if (!dice[1]) {
					dice[1] = '1';
				}
				for (var i = 0; i < Number(dice[1]); i++) {
					num += Math.ceil(Math.random()*Number(dice[2]));
				}
				if (addition) {
					total += Number(num);
				} else {
					total -= Number(num);
				}
			} else if (Number(element)) {
				console.log(element + " " + Number(element));
				if (addition) {
					total += Number(element);
				} else {
					total -= Number(element);
				}
			}
		});
		return total;
	} else {
		return false;
	}
}