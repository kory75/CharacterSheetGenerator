var LocalStorage = LocalStorage || {};
/*************************
	Local storage driver for model
*************************/

function LocalStorage(){
	/* par [ game : str ] game name (paranoia, D&D)  */
	/* par [ game table str ] name of the data type Characters , Character */
	/* par [ id : int ] character sheet id  */
	/* par [ id : data ] array of varable names    */
	/* return array values   */
	this.select = function(game,table,id,data) {
		result = new Array();
		
		data.forEach(function(name) {
			result[name] = localStorage.getItem([game,table,id,name].join('_'));
		});
		return result;
	}
	
	/* par [ game : str ] game name (paranoia, D&D)  */
	/* par [ game table str ] name of the data type Characters , Character */
	/* par [ id : int ] character sheet id  */
	/* par [ id : data ] array of objects names and values  */
	/* return true */
	this.save = function(game,table,id,data) {
		data.forEach(function(item) { 
			localStorage.setItem( [game,table,id,item.name].join('_'),item.value);
		});
	}
}

