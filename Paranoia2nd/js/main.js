(function(){

	//var attributes = ['strength','endurance','agility','dexterity','moxie','chutzpah','mech','mutant_power'];
	var skillbases = ['agility','dexterity','moxie','chutzpah','mech'];
	var service_groups = ['HPD&MC','Tech Services','R&D','PLC','CPU','Power Services','Armed Services','IntSec'];

	var service_group_skills_1 = ['Truncheon','Unarmed', 'Interrogation','Intimidation', 'Laser Weap' ,'Security','Surveillance'];
	
	function init_sheet(){
		jsonObject.attributes.fields.forEach(function(one_field) {
			jQuery( "#attributes_box_left" ).append('<label for="'+one_field.name+'" class="col-md-7 control-label">'+one_field.label+'</label>');
			jQuery( "#attributes_box_left" ).append('<div class="input-group col-md-4"><input type="number" class="form-control input-sm"  name="'+one_field.name+'" value="" min="1" max="20" /><span class="glyphicon glyphicon-refresh input-group-addon roll_one_attribute"></span></div>');
			//console.log(one_attribute.label);
		});
		jsonObject.carrying_capacity.fields.forEach(function(one_field) { 
			jQuery( "#attributes_box_right" ).append('<label for="'+one_field.name+'" class="col-md-8 control-label">'+one_field.label+'</label>');
			jQuery( "#attributes_box_right" ).append('<div class="input-group col-md-4"><input type="number" class="form-control input-sm"  name="'+one_field.name+'" value="" min="25" max="65" disabled="disabled" /><span class="input-group-addon">'+one_field.addon+'</span></div>');
		});
		jsonObject.bonus.fields.forEach(function(one_field) { 
			jQuery( "#attributes_box_right" ).append('<label for="'+one_field.name+'" class="col-md-8 control-label">'+one_field.label+'</label>');
			jQuery( "#attributes_box_right" ).append('<div class="col-md-4"><input type="number" class="form-control input-sm"  name="'+one_field.name+'" value="" min="25" max="65" disabled="disabled" /></div>');
		});
		jsonObject.skillbases.fields.forEach(function(one_field) { 
			jQuery( "#attributes_box_right" ).append('<label for="'+one_field.name+'" class="col-md-8 control-label">'+one_field.label+'</label>');
			jQuery( "#attributes_box_right" ).append('<div class="col-md-4"><input type="number" class="form-control input-sm"  name="'+one_field.name+'" value="" min="25" max="65" disabled="disabled" /></div>');
		});
		jsonObject.service_group.options.forEach(function(one_group) { 
			jQuery( "select[name=service_group]" ).append(' <option title="'+one_group.description+' '+one_group.provide+'">'+one_group.label+'</option>');
		});
		
		
		jsonObject.skillbases.fields.forEach(function(one_skillbase) {
		
			jsonObject.skills.forEach(function(one_skill) {
		
				if (one_skillbase.name == one_skill.skillbase) {
					jQuery( "#"+one_skillbase.skills ).append('<label for="'+one_skill.name+'" class="col-md-8 control-label">'+one_skill.label+'</label>');
					jQuery( "#"+one_skillbase.skills ).append('<div class="col-md-4"><input type="number" class="form-control input-sm"  name="'+one_skill.name+'" value="" title="'+one_skillbase.description+'" min="1" max="20" /></div>');
				}
			});
		});
		
		jsonObject.avaliable_equipments.items.forEach(function(one_equipment) {
			if(one_equipment.clerence="red"){
				jQuery( "select[name=equipment_name]" ).append('<option value="'+one_equipment.cost+'">'+one_equipment.name+ ' - ' + one_equipment.cost + ' plasticredits</option>');

			}
		});
		
		
	}
	
	init_sheet();
	
	jQuery('#load').click(function(){
		event.preventDefault();
		//Load all input
		jQuery( "input" ).each( function( index, element ){
			    jQuery(this).val(localStorage.getItem($( this ).attr("name")));
		});
		jQuery( "select" ).each( function( index, element ){
			    jQuery(this).val(localStorage.getItem($( this ).attr("name")));
		});
		jQuery('#message_box').html('Character Sheet Loaded!');
	});

	jQuery('#generate').click(function(){
		event.preventDefault();
		jsonObject.attributes.fields.forEach(function(one_attribute) {
			randomAttribute(one_attribute.name,one_attribute.dice);
		});
		//console.log(entry);
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
		randomServiceGroup();
		randomCharacterName();
		randomMutation();
		randomSecretSociate();
		jQuery('#message_box').html('Random character has been generated!');
	});
	
	jQuery('.roll_one_attribute').click(function(){
		event.preventDefault();
		jQuery('#message_box').html('Rolls d20!');
		randomAttribute(jQuery(this).siblings('input').attr('name'),"d20");
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
	});

	jQuery('#save').click(function(){
		event.preventDefault();
		
		jQuery( "input" ).each( function( index, element ){
		    localStorage.setItem( $( this ).attr("name"),$( this ).val() );
		});
		
		jQuery( "select" ).each( function( index, element ){
		    localStorage.setItem( $( this ).attr("name"),$( this ).val() );
		});
		
		jQuery('#message_box').html('Character Sheet Saved!');
	});

	jQuery('#print').click(function(){
		event.preventDefault();
		window.print();
		jQuery('#message_box').html('Printing character sheet!');
	});
	
	jQuery('#reset').click(function(){
		event.preventDefault();
		jQuery('input').val('');
		jQuery('input[name=skill_points]').val('30');
		jQuery('input[name=armor_worn]').val('L');
		jQuery('input[name=armor_ratings]').val('4');
		jQuery('#message_box').html('Form resetted!');
	});
	
	jQuery('#attributes_box_left div input').change(function(){
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
	});
	
	$('#character_navigator a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	
	//functions

	function randomCharacterName(){
		jQuery('input[name=character_name]').val('Joe-'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3).toUpperCase()+'-R-1');
		jQuery('.color-rank-red').button('toggle') ;
	}

	function randomAttribute(attribute_name,dice){
		jQuery('input[name='+attribute_name+']').val( Dice.roll(dice) );
	}
	
	function randomServiceGroup(){
		random_number =  Dice.roll("d20");
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
	
	function randomMutation(){
		random_number =  Dice.roll("d20");
		jQuery('select[name=mutation]').val(random_number);
	}
	
	function randomSecretSociate(){
		// TODO some of the secret sociates has higher chance. There are less  sec. soc. than 20 
		random_number =  Dice.roll("d20");
		jQuery('select[name=secret_sociate]').val(random_number);
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
		updateSkills();
	}
	
	function updateSkills(){
		jsonObject.skills.forEach(function(one_skill) {
			jQuery('input[name='+one_skill.name+']').val(jQuery('input[name='+one_skill.skillbase+']').val());
			jQuery('input[name='+one_skill.name+']').attr('min',jQuery('input[name='+one_skill.skillbase+']').val());
			jQuery('input[name='+one_skill.name+']').attr('max',12);
		});
	}

	function updateCarryingCapacity(){
		carrying_capacity_base = 0
		if (jQuery('input[name=strength]').val()>12){
			carrying_capacity_base = jQuery('input[name=strength]').val() - 12;
		}
		jQuery('input[name=carrying_capacity]').val( ((carrying_capacity_base)*5)+25 );
	}
	
	function markServiceGroupSkills(){
		if(jQuery('select[name=service_group]').val() == 'IntSec'){
			service_group_skills_1.forEach(function(service_group_skill) {
				//jQuery('input[name='+service_group_skill+'_skill_base]').addClass('specialised');
			});
		}
	}
	
})();
