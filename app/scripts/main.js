var htmlTemplates = {};


/** 
* boot up
*
*/
jQuery(document).ready(function () {

	console.log('\'Allo \'Allo!');
	compileTemplates();


	initRatingStars("div.starrr");
});


function compileTemplates() {
	$("script[type='text/x-handlebars-template']").each(function(elem) {
		htmlTemplates[this.id] = Handlebars.compile($(this).html());
	});
}


function initRatingStars(selector, onChangeHandler) {
	jQuery(selector).each(function (i,e) {
		// init element e with default rating;
		var rating = jQuery(e).attr("data-rating");
		if(rating != "") {
			jQuery(e).starrr({rating: rating});
		} else {
			jQuery(e).starrr();
		}
	});

	jQuery(selector).on('starrr:change', function(e, value){
  		jQuery(e.target).attr("data-rating", value);
  		if(onChangeHandler) {
  			onChangeHandler(e, value);
  		}
	});
}

