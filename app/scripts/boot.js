var htmlTemplates = {};


/** 
* boot up
*
*/
jQuery(document).ready(function () {
	compileTemplates();
	startUi();
});


function compileTemplates() {
	$('script[type=\'text/x-handlebars-template\']').each(function(elem) {
		htmlTemplates[this.id] = Handlebars.compile($(this).html());
	});
}


