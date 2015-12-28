var Model = Model || {};
/*************************
	Model for storing caharctersheets
*************************/
function Model(){

	this.setDriver = function(driver) {
		this.driver = driver;
	}
	
	this.selectCharacters = function(game) {
		car_ids = this.driver.select(game,'characters',0,['char_ids']);
		console.log(car_ids['char_ids']);
		if(car_ids['char_ids'] != null)
			return car_ids['char_ids'].split(",");
		else
			return 0;
			
	}
	// private  
	this.isCharacterExists = function(game,id){
		char_ids = this.selectCharacters(game);
		exists = false;
		char_ids.forEach(function(item) {
			if(item == id) { exists = true ;}
		});
		return exists;
	}
	
	//private 
	this.addCharacters = function(game,id) {
		if( !this.isCharacterExists(game,id) ){
			char_ids = this.selectCharacters(game);
			char_ids.push( id );
			char_ids_data = new Object;
			char_ids_data.name = 'char_ids';
			char_ids_data.value = char_ids.join();
			this.driver.save(game,'characters',0,[char_ids_data]);
		}
	}
	
	this.getMaxId = function(game){
		char_ids = this.selectCharacters(game) ;
		max_id = 0;
		if(char_ids.length >0){
		char_ids.forEach(function(item) {
			if (item > max_id){ max_id = item }
			
		});
		}
		return max_id;
	}
	
	this.getFreeId = function(game){
		return this.getMaxId(game)+1;
	} 
	
	/* data is array of field names */
	this.deleteCharacter = function(game,id,data) {
		return false;
	}
	
	/* data is array of field name and value pairs */
	this.saveCharacter = function(game,id,data) {
		this.addCharacters(game,id);
		this.driver.save(game,'character',id,data);
	}
	
	/* data is array of field names */
	this.selectCharacter = function(game,id,data) {
		this.driver.select(game,'character',id,data);
	}
}