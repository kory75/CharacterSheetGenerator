(function(){

	Driver = new LocalStorage();
	Model = new Model();
	Model.setDriver(Driver);
	
	
	console.log(Model.getFreeId('PAR2'));
	
	//todo remove these arrays
	//var attributes = ['strength','endurance','agility','dexterity','moxie','chutzpah','mech','mutant_power'];
	//var skillbases = ['agility','dexterity','moxie','chutzpah','mech'];
	var service_groups = ['HPD&MC','Tech Services','R&D','PLC','CPU','Power Services','Armed Services','IntSec'];

	//----------------------------------//
	//--- Initialise Character Sheet ---//
	//----------------------------------//
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
					jQuery( "#"+one_skillbase.skills ).append('<div class="col-md-4"><input type="number" class="form-control input-sm skill_value"  name="'+one_skill.name+'" value="" title="'+one_skillbase.description+'" min="1" max="20" /></div>');
				}
			});
		});
		
		jQuery( "select[name=equipment_name]" ).append('<option value=""></option>');
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

	//----------------------------------//
	//--- Generate Character Sheet   ---//
	//----------------------------------//
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
	
	//----------------------------------//
	//--- Roll One attribute         ---//
	//----------------------------------//
	jQuery('.roll_one_attribute').click(function(){
		event.preventDefault();
		jQuery('#message_box').html('Rolls d20 for attributes!');
		randomAttribute(jQuery(this).siblings('input').attr('name'),"d20");
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
		markServiceGroupSkills();
	});
	//----------------------------------//
	//--- On Service Group  Change   ---//
	//----------------------------------//
	jQuery('.roll_service_group').click(function(){
		event.preventDefault();
		jQuery('#message_box').html('Rolls d20 for Service group!');
		randomServiceGroup();
		updateSkillBase();
		markServiceGroupSkills();
	});
	//----------------------------------//
	//--- Roll Character Name     ---//
	//----------------------------------//
	jQuery('.roll_character_name').click(function(){
		event.preventDefault();
		jQuery('#message_box').html('Random Character Name!');
		randomCharacterName();
	});	
	//----------------------------------//
	//--- Roll Service Group     	---//
	//----------------------------------//
	jQuery('.roll_service_group').change(function(){
		updateSkillBase();
		markServiceGroupSkills();
	});


	//----------------------------------//
	//--- Save Character sheet      ---//
	//----------------------------------//
	jQuery('#save').click(function(){
		event.preventDefault();
		
		jQuery( "input" ).each( function( index, element ){
		    localStorage.setItem( $( this ).attr("name"),$( this ).val() );
		});
		
		jQuery( "select" ).each( function( index, element ){
		    localStorage.setItem( $( this ).attr("name"),$( this ).val() );
		});
		
		jQuery('#message_box').html('Character Sheet Saved!');
		
		
		test = new Array();
		jQuery( "input" ).each( function( index, element ){
				theElement = new Object;
				theElement.name = $( this ).attr("name");
				theElement.value = $( this ).val();
			    test.push ( theElement );
			});
		Model.saveCharacter('PAR2',Model.getFreeId('PAR2'),test);
		
	});
	//----------------------------------//
	//--- Print Caharacter sheet      ---//
	//----------------------------------//
	jQuery('#print').click(function(){
		event.preventDefault();
		window.print();
		jQuery('#message_box').html('Printing character sheet!');
	});
	//----------------------------------//
	//--- Erase Caharacter sheet fields ---//
	//----------------------------------//
	jQuery('#reset').click(function(){
		event.preventDefault();
		jQuery('input').val('');
		jQuery('input[name=skill_points]').val('30');
		jQuery('input[name=armor_worn]').val('L');
		jQuery('input[name=armor_ratings]').val('4');
		jQuery('#message_box').html('Form resetted!');
	});
	
	//----------------------------------//
	//--- on Attribute change      ---//
	//----------------------------------//
	jQuery('#attributes_box_left div input').change(function(){
		updateCarryingCapacity();
		updateBonus();
		updateSkillBase();
		markServiceGroupSkills();
	});
	
	
	$('#character_navigator a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	//----------------------------------//
	//--- On Skill Point Change      ---//
	//----------------------------------//
	jQuery('input.skill_value').change(function(){
		var used_skill_points = 0;
		
		var skill_base_point = 0;
		jQuery('.skill_holder').each(function( i ) {
			skill_base_point = jQuery(this).prev().find('.skill_base').val();
			
			jQuery(this).find('.skill_value').each(function ( i ){
				
				if(skill_base_point != jQuery(this).val()){
					used_skill_points += jQuery(this).val() - skill_base_point; 
				}
			} );
			
		});
		//check for negative skill point
		if(used_skill_points > 30){
			jQuery(this).val(parseInt(jQuery(this).val())+(30-used_skill_points));
			jQuery('#skill_points').val(0);
		}else{
			//set skill points
			jQuery('#skill_points').val(30-used_skill_points);
		}
		jQuery('input[name=weapon_skill_number_1]').val(jQuery('input[name=skill_laser_weapons]').val());
	});
	
	//----------------------------------//
	//--- Random Character Name      ---//
	//----------------------------------//
	//functions
	function randomCharacterName(){
		jQuery('input[name=character_name]').val('Joe-'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 3).toUpperCase()+'-R-1');
		jQuery('.color-rank-red').button('toggle') ;
	}

	//----------------------------------//
	//--- Random attribute         ---//
	//----------------------------------//
	function randomAttribute(attribute_name,dice){
		jQuery('input[name='+attribute_name+']').val( Dice.roll(dice) );
	}
	//----------------------------------//
	//--- Random Service Group        ---//
	//----------------------------------//
	function randomServiceGroup(){
		
		random_number =  Dice.roll("d20");
		
		//Use new band on json
		//jsonObject.service_group.options.forEach(function(one_service_group) {
			
		//	if(random_number > one_service_group.band) random_service_group = one_service_group.label;
		//});
		//console.log(random_service_group);
		random_service_group = 7;
		if(random_number > 2) random_service_group = 1;	//Tech Services
		if(random_number > 4) random_service_group = 0; //HPD&MC
		if(random_number > 8) random_service_group = 6; //Armed Services
		if(random_number > 11) random_service_group = 3;//PLC
		if(random_number > 14) random_service_group = 5;//Power Services
		if(random_number > 16) random_service_group = 2;//R&D
		if(random_number > 18) random_service_group = 4;//CPU
		jQuery('select[name=service_group]').val(service_groups[random_service_group]);
		markServiceGroupSkills();
	}
	//----------------------------------//
	//--- Random Mutation       ---//
	//----------------------------------//
	function randomMutation(){
		random_number =  Dice.roll("d20");
		jQuery('select[name=mutation]').val(random_number);
	}
	//----------------------------------//
	//--- Random Secret Sociate      ---//
	//----------------------------------//
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
		
		jsonObject.skillbases.fields.forEach(function(one_skillbase) {
			skill_base_value=0; 
			jsonObject.skillbases.skillbase_bands.forEach(function(skillbase_band) {
				if ( parseInt(jQuery('input[name='+one_skillbase.attribute+']').val()) > skillbase_band.band ) {
					skill_base_value=skillbase_band.skill;
				}			
			});
			jQuery('input[name='+one_skillbase.attribute+'_skill_base]').val(skill_base_value);
		});
		updateSkills();
	}
	
	function updateSkills(){
		jsonObject.skills.forEach(function(one_skill) {
			jQuery('input[name='+one_skill.name+']').val(jQuery('input[name='+one_skill.skillbase+']').val());
			jQuery('input[name='+one_skill.name+']').attr('min',jQuery('input[name='+one_skill.skillbase+']').val());
			jQuery('input[name='+one_skill.name+']').attr('max',12);
		});
		jQuery('#skill_points').val(30);
		jQuery('input[name=weapon_skill_number_1]').val(jQuery('input[name=skill_laser_weapons]').val());
	}

	function updateCarryingCapacity(){
		carrying_capacity_base = 0
		if (jQuery('input[name=strength]').val()>12){
			carrying_capacity_base = jQuery('input[name=strength]').val() - 12;
		}
		jQuery('input[name=carrying_capacity]').val( ((carrying_capacity_base)*5)+25 );
	}
	//----------------------------------//
	//--- Service group skills can go up //
	//---- to 20 mark them grey      ---//
	//----------------------------------//
	function markServiceGroupSkills(){
		
		jQuery('.skill_value').removeClass('group_skill').attr('max',12);
		jsonObject.service_group_skills.groups.forEach(function(one_group_skill){
			if(jQuery('#service_group').val()==one_group_skill.group){
				one_group_skill.skills.forEach(function(one_skill) {
					jQuery('input[name='+one_skill.skill+']').addClass('group_skill').attr('max',20);
				});
			}
		});
	}
	
})();
