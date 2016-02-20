function logUser(){
	var url = window.location.href;
	var title = $(document).find("title").text();
	$.ajax({
	    type: "POST",  
	    url:  "/log_user",
	    data: {'url' : url, 'title' : title},
	    cache: false,
	    success : function(data){
	    	
	    }
	});
}

// function logAffiliateClick(target){
// 	var link = target.attr('data-link');
// 	var id = target.attr('data-id');
// 	var campaign = target.attr('data-cpn');
// 	$.ajax({
// 	    type: "POST",  
// 	    url:  "/log_affiliate_click",
// 	    data: {'id' : id, 'campaign' : campaign },
// 	    cache: false,
// 	    success : function(data){
// 	    	//alert(data);
// 	    }
// 	});
// 	// alert();
// 	//window.location.href = link;
// 	openInNewTab(target);
// }

// function createSearchLog(section, keyword, result_count, source){
// 	$.ajax({
// 	    type: "POST",  
// 	    url:  "/search/create_log",
// 	    data: {'section' : section, 'keyword' : keyword, 'result_count' : result_count, 'source' : source },
// 	    cache: false,
// 	    success : function(data){
// 	    	//alert(data);
// 	    }
// 	});
// }

function openInNewTab(element) {
    url = element.attr('data-link');
    element.attr("href", url).removeClass('afl-product').attr("target", "_blank")[0].click();
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

$(document).ready(function() {
    logUser();
});

// $('.afl-product').on('click',function(){
// 	logAffiliateClick($(this));
// });
