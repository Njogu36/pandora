// JavaScript Document

if ($('div[class*="GallerySync"]')[0]) {
	var classlist = $('.DT_product-details-page').attr('class').split(" ");
	var target = classlist[classlist.length-1].split('-');
	target = ".attribute."+target[1]; 
	$(target +' input').each(function(index){
		$(this).click( function() {
			
			if ($('.DT_picture .flex-control-nav li')[index]) {
				$('.DT_picture .flex-control-nav li:nth-child('+(index+1)+') a').click();
			}
		});
		
	});
	$('.DT_picture .flex-control-nav').hide();
}