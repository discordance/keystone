jQuery(function($) {

	$('.field.type-textarray, .field.type-numberarray').on("click", ".btn.btn-remove-item", function(e) {
		e.preventDefault();
		$(this).parent().remove();
	});

	$('.field.type-textarray .btn.btn-add-item, .field.type-numberarray .btn.btn-add-item').on("click", function(e) {
		e.preventDefault();
		var name = $(this).parent().parent().attr("data-field-path");
		$(this).before('<div class="field-item"><input type="text" name="' + name + '" value="" autocomplete="off" class="form-control multi"><a href="javascript:;" class="btn btn-link btn-cancel btn-remove-item"><span class="ion-close-round"></span></a></div>');
	});

	 /*
		* Questionnaire UI
	  */

	// rajout de la gestion des questionnaires
	$('.field.type-questionnaire .btn.btn-add-item').on("click", function(e) {
		e.preventDefault();
		var name = $(this).parent().parent().attr("data-field-path");
		$(this).before('<div class="field-item questionnaire"><a class="btn btn-link btn-expand"><span class="ion-play"></span></a><a class="btn btn-link btn-add-subitem"><span class="ion-plus-circled"></span></a>&nbsp;<input type="text" name="' + name + '" value="" autocomplete="off" class="form-control questionnaire"><a href="javascript:;" class="btn btn-link btn-cancel btn-remove-item"><span class="ion-close-round"></span></a></div>');
		add_subitem_add_callback();
	});
	$('.field.type-questionnaire').on("click", ".btn.btn-remove-item", function(e) {
		e.preventDefault();
		$(this).parent().remove();
	});

	var add_subitem_add_callback = function(){
		// sous item
		$('.field.type-questionnaire .btn.btn-add-subitem').unbind("click");
		$('.field.type-questionnaire .btn.btn-add-subitem').on("click", function(e) {
			//var name = $('.field.type-questionnaire').attr("data-field-path");
			var prev = $(this).parent().find('input').attr('name');
			prev += '[sub]';
			var field_item = $(this).parent();
			$(field_item).append('<div class="field-item questionnaire"><a class="btn btn-link btn-expand"><span class="ion-play"></span></a><a class="btn btn-link btn-add-subitem"><span class="ion-plus-circled"></span></a>&nbsp;<input type="text" name="' + name + '" value="" autocomplete="off" class="form-control questionnaire"><a href="javascript:;" class="btn btn-link btn-cancel btn-remove-item"><span class="ion-close-round"></span></a></div>');
			add_subitem_add_callback();
		});
	}
	add_subitem_add_callback();


});
