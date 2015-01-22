jQuery(function($) {
  /*
  * Questionnaire UI
  */

  // construct the recursive object on save
  $('.field.type-questionnaire').closest('form').submit(function(e){
    var recFind = function(root, selector, tree_root){
      var results = root.find("input[name='"+selector+"']");
      results.each(function(i,e){
        var val = $(e).val();
        var question = {question:val, questions:[]};
        tree_root.push(question);
        // remove name
        $(e).attr("name",'');
        // recursion
        recFind($(e).parent(), selector+'[]', question.questions);
      });
    }
    var field_name = $('.field.type-questionnaire').attr("data-field-path");
    var questions = [];
    recFind($(e.target), field_name, questions);
    // stringify
    var str = JSON.stringify(questions);
    // add hiddenfield
    $(e.target).append("<input type='hidden' name='"+field_name+"' value='"+encodeURIComponent(str)+"'>");

  });
  // rajout de la gestion des questionnaires
  // ADD
  $('.field.type-questionnaire .btn.btn-add-item').on("click", function(e) {
    e.preventDefault();
    var name = $(this).parent().parent().attr("data-field-path");
    $(this).before('<div class="field-item questionnaire"><a class="btn btn-link btn-expand"><span class="ion-play"></span></a><a class="btn btn-link btn-add-subitem"><span class="ion-plus-circled"></span></a>&nbsp;<input type="text" name="' + name + '" value="" autocomplete="off" class="form-control questionnaire"><a href="javascript:;" class="btn btn-link btn-cancel btn-remove-item"><span class="ion-close-round"></span></a></div>');
    add_subitem_add_callback();
  });
  // REMOVE
  $('.field.type-questionnaire').on("click", ".btn.btn-remove-item", function(e) {
    e.preventDefault();
    $(this).parent().remove();
  });
  // ADD SUB
  var add_subitem_add_callback = function(){
    // sous item
    $('.field.type-questionnaire .btn.btn-add-subitem').unbind("click");
    $('.field.type-questionnaire .btn.btn-add-subitem').on("click", function(e) {
      var parent_name = $(this).parent().find('input').attr('name');
      parent_name += '[]';
      var field_item = $(this).parent();
      $(field_item).append('<div class="field-item questionnaire"><a class="btn btn-link btn-expand"><span class="ion-play"></span></a><a class="btn btn-link btn-add-subitem"><span class="ion-plus-circled"></span></a>&nbsp;<input type="text" name="' + parent_name + '" value="" autocomplete="off" class="form-control questionnaire"><a href="javascript:;" class="btn btn-link btn-cancel btn-remove-item"><span class="ion-close-round"></span></a></div>');
      add_subitem_add_callback();
    });
  }
  add_subitem_add_callback();

});
