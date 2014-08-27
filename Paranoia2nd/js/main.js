(function(){
	var attributes = ['strength','endurance','agility','dexterity','moxie','chutzpah','mech','mutant_power'];
	var skillbases = ['agility','dexterity','moxie','chutzpah','mech'];

	//load attributes
	attributes.forEach(function(one_attribute) {
			jQuery('input[name='+one_attribute+']').val(localStorage.getItem(one_attribute));
	});

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

	function randomAttribute(attribute_name,dice){
		jQuery('input[name='+attribute_name+']').val( Math.floor((Math.random() * dice) + 1));
	}

	function updateBonus(){
		jQuery('input[name=damage_bonus]').val(jQuery('input[name=strength]').val()/4);
		jQuery('input[name=macho_bonus]').val(jQuery('input[name=endurance]').val()/4);
	}

	function updateSkillBase(){
		
		skillbases.forEach(function(one_skillbase) {
			jQuery('input[name='+one_skillbase+'_skill_base]').val(jQuery('input[name='+one_skillbase+']').val()/4);
		});
	}

	function updateCarryingCapacity(){
		jQuery('input[name=carrying_capacity]').val(jQuery('input[name=strength]').val()*5);
	}
})();
