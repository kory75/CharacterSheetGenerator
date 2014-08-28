(function(){
	var attributes = ['strength','endurance','agility','dexterity','moxie','chutzpah','mech','mutant_power'];
	var skillbases = ['agility','dexterity','moxie','chutzpah','mech'];
	var service_groups = ['HPD&MC','Tech Services','R&D','PLC','CPU','Power Services','Armed Services','IntSec'];

	var service_group_skills_1 = ['Truncheon','Unarmed', 'Interrogation','Intimidation', 'Laser Weap' ,'Security','Surveillance'];
	//load all input fields in form att once??
	//jQuery('form input').each(function(){  this.name this.val = localStorage.getItem(this.name) });

	//load attributes
	attributes.forEach(function(one_attribute) {
			jQuery('input[name='+one_attribute+']').val(localStorage.getItem(one_attribute));
	});

	//load skills
	skillbases.forEach(function(one_skillbase) {
			jQuery('input[name='+one_skillbase+'_skill_base]').val(localStorage.getItem(one_skillbase+'_skill_base'));
	});

	jQuery('#generate').click(function(){
		event.preventDefault();
		jQuery('#message_box').html('Random character has been generated!');
		attributes.forEach(function(one_attribute) {
			randomAttribute(one_attribute,20);
		});
		//console.log(entry);
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
		randomServiceGroup();
		randomCharacterName();
		
	});

	jQuery('#save').click(function(){
		event.preventDefault();
		
		//console.log(attributes);
		attributes.forEach(function(one_attribute) {
			localStorage.setItem(one_attribute, jQuery('input[name='+one_attribute+']').val());
		});
		
		skillbases.forEach(function(one_skillbase) {
			localStorage.setItem(one_skillbase+'_skill_base', jQuery('input[name='+one_skillbase+'_skill_base]').val());
		});
		
		localStorage.setItem('damage_bonus', jQuery('input[name=strength]').val());
		localStorage.setItem('macho_bonus', jQuery('input[name=endurance]').val());
		
		jQuery('#message_box').html('Saving Character Sheet!');
	});

	jQuery('#print').click(function(){
		event.preventDefault();
		window.print();
		jQuery('#message_box').html('Printing Character Sheet!');
	});
	
	jQuery('#reset').click(function(){
		event.preventDefault();
		jQuery('input').val('');
		jQuery('input[name=skill_points]').val('30');
		jQuery('input[name=armor_worn]').val('L');
		jQuery('input[name=armor_ratings]').val('4');
		jQuery('#message_box').html('Empty Form!');
	});
	
	jQuery('#servic-group-dropdown').click(function(){
		event.preventDefault();
	});

	function randomCharacterName(){
		jQuery('input[name=character_name]').val('Joe-'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3).toUpperCase()+'-R-1');
		jQuery('.color-rank-red').button('toggle') ;
	}

	function randomAttribute(attribute_name,dice){
		jQuery('input[name='+attribute_name+']').val( Math.floor((Math.random() * dice) + 1));
	}
	
	function randomServiceGroup(){
		random_number =  Math.floor((Math.random() * 20) + 1);
		random_service_group = 7;
		if(random_number > 2) random_service_group = 1;
		if(random_number > 4) random_service_group = 0;
		if(random_number > 8) random_service_group = 6;
		if(random_number > 11) random_service_group = 3;
		if(random_number > 14) random_service_group = 5;
		if(random_number > 16) random_service_group = 2;
		if(random_number > 18) random_service_group = 4;
		jQuery('select[name=service_group]').val(service_groups[random_service_group]);
	}

	function updateBonus(){
		damage_bonus = 0; macho_bonus = 0;
		if(jQuery('input[name=strength]').val() > 13) damage_bonus = 1;
		if(jQuery('input[name=strength]').val() > 18) damage_bonus = 2;
		if(jQuery('input[name=endurance]').val() > 13) macho_bonus = 1;
		if(jQuery('input[name=endurance]').val() > 18) macho_bonus = 2;
		jQuery('input[name=damage_bonus]').val(damage_bonus);
		jQuery('input[name=macho_bonus]').val(macho_bonus);
	}

	function updateSkillBase(){
		
		skillbases.forEach(function(one_skillbase) {
			skill_base_value=0; 
			if ( jQuery('input[name='+one_skillbase+']').val() > 3 )  skill_base_value=1;
			if ( jQuery('input[name='+one_skillbase+']').val() > 6 )  skill_base_value=2; 
			if ( jQuery('input[name='+one_skillbase+']').val() > 10 )  skill_base_value=3; 
			if ( jQuery('input[name='+one_skillbase+']').val() > 14 )  skill_base_value=4; 
			if ( jQuery('input[name='+one_skillbase+']').val() > 17 )  skill_base_value=5; 
			jQuery('input[name='+one_skillbase+'_skill_base]').val(skill_base_value);
		});
	}

	function updateCarryingCapacity(){
		carrying_capacity_base = 0
		if (jQuery('input[name=strength]').val()>12){
			carrying_capacity_base = jQuery('input[name=strength]').val() - 12;
		}
		jQuery('input[name=carrying_capacity]').val( ((carrying_capacity_base)*5)+25 );
	}
})();
