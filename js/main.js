$(function(){	
	//check to see if cookies already exist
	if($.cookie('theColor') != null){
		swatchPickinator($.cookie('theColor'));
	}
	if($.cookie('theFont') != null){
		fontPickinator($.cookie('theFont'));
	}

	//Change the text based on input
	$('#theInput').keyup(function(){
		if($('#theInput').val() != ''){
			$('#preview').html($('#theInput').val());
			swatchPickinator($.cookie('theColor'));
			fontPickinator($.cookie('theFont'));
		} else {
			$('#preview').html('Vinyl Preview');
		}
	})
	
	$('#so').click(function(){
		wwAlert('Do you really want to start over? All of your choices will be deleted.');
	})
	
	//open/close option drawers
	$('.option_btn').click(function(){
		var theBtn = this
		$(this).closest('.off').switchClass('off', 'on', 1000, 'easeOutExpo');
		$(this).closest('.on').switchClass('on', 'off', 1000, 'easeOutCirc');
		return false;
	})
	
	//close option drawers
	$('.done_btn').click(function(){
		$(this).closest('.options').find('.option_btn').click();
	})
	
})

function allClearinator() {
	$.cookie('theFont', null);
	$.cookie('theColor', null);
	$('#preview').css('color', '#000');
	$('#theInput').val('');
	$('#preview').html('Vinyl Preview');
}

function swatchPickinator(color) {
	$.cookie('theColor', color, {expires: 7});
	var theColor = $.cookie('theColor');
	var theFont = $.cookie('theFont');
	if(theFont!= null){
		Cufon.replace('#preview', {
			fontFamily: theFont,
			color: theColor
		});
	}
	else{
		$('#preview').css('color', theColor);
	}
}

function fontPickinator(font) {
	$.cookie('theFont', font, {expires: 7});
	var theElse = $('#theInput').val();
	var theColor = $.cookie('theColor');
	var theFont = $.cookie('theFont');
	if(theFont !='selectFont'){
		Cufon.replace('#preview', {
			fontFamily: theFont,
			color: theColor				
		});
	}
	else{
		if(theElse != ''){
			$('#preview').html(theElse);
		}
		else{
			$('#preview').html('Vinyl Preview');
		}
	}			
}

function wwAlert(str){
	jQuery('<div title="Are you sure..." class="wwAlert">'+str+'</div>').dialog({
		modal:true,
		buttons: {
			"Yes": function(){
				allClearinator();
				jQuery(this).dialog('close');
			},
			"No": function(){jQuery(this).dialog('close');}
		}
	});
}