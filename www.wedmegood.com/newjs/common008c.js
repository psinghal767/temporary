

function showForm(target){
	//$('#formModal').trigger('reveal:close');

	var screen_width = $(window).innerWidth();
	if(screen_width > 1400){
		screen_width = 1400;
	}
	var screen_height = $(window).innerHeight();
	var content = $(target).html();
	$("#load_form").html(content);
	var width = $("#formModal").width();
	var height = $("#formModal").height();
	// $('#formModal').css('top',parseInt((screen_height-height)/2));
	// $('#formModal').css('left',parseInt((screen_width-width)/2));
	//$('body').css('overflow','hidden');
	$('#formModal').reveal({
		 animation: 'fade',                   //fade, fadeAndPop, none
		 animationspeed: 300,                       //how fast animtions are
		 closeonbackgroundclick: true,              //if you click background will modal close?
		 dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
	});

	$('#formModal').css('top',parseInt($(window).scrollTop() + (screen_height-height)/2));
	$('#formModal').css('left',parseInt($(window).scrollLeft() +(screen_width-width)/2));

	$('#formModal').on('reveal:close',function(){
   		//$('body').css('overflow','visible');
 	});

}

timeoutID = "";

function showSearchSuggestions(keyword){
	timeoutID = window.setTimeout(function(){
    	getSearchSuggestions(keyword).done(setList);
  	}, 200);
	//vendors = getSearchSuggestions(keyword).done(setList);
	//images = getSearchSuggestions(keyword, "image");
}

function getSearchSuggestions(keyword){
	if(keyword != ''){
		return $.ajax({
        	type: "get",
         	url: "/search/suggest/"+keyword,
      	});
	}else{
		return $.ajax({
        	type: "get",
         	url: "/search/suggest",
      	});
	}
}

function setList(data){
  $('#search-results,#search-results1').html(data).removeClass('hidden');
  $('body').unbind("keydown");
  focused = null;
  focused_section = null;

  //set mouse hover
  $('#search-results .result-section ul li,#search-results1 .result-section ul li').on('mouseover',function(){
  	focused = $(this);
  	focused_section = focused.parents('.result-section');
  	$('#search-results .result-section ul li,#search-results1 .result-section ul li').removeClass('focused');
  	$(this).addClass('focused');
  });

  $('body').bind( "keydown", function(e) {

  	focused = $('#search-results .result-section ul li.focused, #search-results1 .result-section ul li.focused');
  	focused_section = $('#search-results .result-section ul li.focused,#search-results1 .result-section ul li.focused').parents('.result-section');
  	if(e.which == 38){ //up key down
  		if(focused.length){
  			if(focused.prev('li').length){
  				focused.removeClass('focused');
  				focused = focused.prev('li');
  				focused.addClass('focused');

  			}else if(focused_section.prev('.result-section').length){
  				focused.removeClass('focused');
  				focused_section = focused_section.prev('.result-section');
  				focused = focused_section.find('ul li:last');
  				focused.addClass('focused');
  			}else{
  				focused.removeClass('focused');
  				focused_section = $('#search-results .result-section:last,#search-results1 .result-section:last');
  				focused = focused_section.find('ul li:last');
  				focused.addClass('focused');
  			}
  		}else{
  			$('#search-results .result-section:last li:last,#search-results1 .result-section:last li:last').addClass('focused');
  		}

  		//stop page scroll
  		e.stopPropagation();
  	}else if(e.which == 40){ //down key down
  		if(focused.length){
  			if(focused.next('li').length){
  				focused.removeClass('focused');
  				focused = focused.next('li');
  				focused.addClass('focused');
  			}else if(focused_section.next('.result-section').length){
  				focused.removeClass('focused');
  				focused_section = focused_section.next('.result-section');
  				focused = focused_section.find('ul li:first');
  				focused.addClass('focused');
  			}else{
  				focused.removeClass('focused');
  				focused_section = $('#search-results .result-section:first,#search-results1 .result-section:first');
  				focused = focused_section.find('ul li:first');
  				focused.addClass('focused');
  			}
  		}else{
  			$('#search-results .result-section:first li:first,#search-results1 .result-section:first li:first').addClass('focused');
  		}
  		//stop page scroll
  		e.stopPropagation();

  	}else if(e.which == 13){
		keyword = $('#search-value,#search-value1').val();
		if(keyword != null || keyword != ''){
			if(focused.length){
				window.location.href = focused.find('a').attr('href');
			}else{
				// if($('#search-results .result-section:first li:first a').length){
				// 	alert();
				// 	$('#search-results .result-section:first li:first a').trigger('click');
				// }else{
					keyword = keyword.replace(/\s+/g, '-').toLowerCase();
					window.location.href = '/search/image/'+keyword;
				//}
			}
			e.stopPropagation();
		}else{
			//alert();
		}
	}else if(e.keyCode == 27){
		//alert();
		$('#search-results,#search-results1').addClass('hidden');
		e.stopPropagation();
	}
  });
}

function slideThis(target){
	console.log($(target));
	$(target).slideToggle();
}

$('#search-value,#search-value1').on('focus',function(){
	if($('#search-results,#search-results1').html() != ''){

		$('#search-results,#search-results1').removeClass('hidden');

	}
	$('#search-value,#search-value1').on('keyup paste', function(e){

		if(e.which != 38 && e.which != 40 && e.which != 13 && e.keyCode != 27){
			var _this = $(this);
		    window.clearTimeout(timeoutID);
		    keyword = $(this).val();
		    // if(keyword.length){
		    	showSearchSuggestions(keyword);
		    // }else{
		    	$('#search-results,#search-results1').html('').addClass('hidden');
		    // }
		}
	});

	$("body").click(function(e) {
	  if(!$(e.target).parents('#search-bar,#mobile_search_box').length){
	    $('#search-results,.mobile_search').addClass('hidden');
	  }
	});
});

function logSearch(keyword, section, path){
	$.ajax({
	    type: "POST",
	    url:  "/log-search",
	    data: { 'keyword': keyword, 'section': section , 'path' : path},
	    success : function(){
	    	//alert("yes");
	    }
	});
}

$(document).ready(function() {

    if($("#vendors-type-list").length){
     	$("#vendors-type-list").flexisel({
	        visibleItems:14,
	        animationSpeed: 700,
	        autoPlay: false,
	        autoPlaySpeed: 3000,
	        pauseOnHover: true,
	        enableResponsiveBreakpoints: true,
	        responsiveBreakpoints: {
	            portrait: {
	                changePoint:480,
	                visibleItems: 3
	            },
	            landscape: {
	                changePoint:640,
	                visibleItems: 5
	            },
	            tablet: {
	                changePoint:1024,
	                visibleItems: 5
	            }

	        }
	    });
	}
});


$(function () {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('#scroll-top').fadeIn();
		} else {
			$('#scroll-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#scroll-top').click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});
$(document).ready(function(e) {
	$('.nav-account').click(function() {
		$('.sub-nav').toggle();
		e.preventDefault();
	});

	if(window.location.hash) {
  		var hash = window.location.hash.substring(1);
  		if(hash == 'login'){
  			if($('.usr-login-btn').length){
  				$('.usr-login-btn').click();
  			}
  		}

	}
});

$(document).click(function(e) {
    var container = $(".nav-account");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".sub-nav").hide();
    }
});


$("#search_mobile_nav").click(function(e) {
	console.log('hi');
	//$("#mobile_search_box").toggleClass("hidden");
	$(".mobile_search").toggle();

});
