/*JS for explore more category images*/
$(document).on('click','.wmg-browse-more',function(){
  $('.wmg-toggle-browse').toggle();
});
/*END*/

/*JS for horizontal tabing*/
$('#horizontalTab').easyResponsiveTabs({
    type: 'default', //Types: default, vertical, accordion           
    width: 'auto', //auto or any width like 600px
    fit: true   // 100% fit in a container
});
/*END JS for horizontal tabing*/


/*JS for facebook*/
(function(d, s, id)
  {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "../connect.facebook.net/en_US/all.js#xfbml=1&appId="; // addyour appId here
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
/*END JS for facebook*/

/*JS for MENU*/
(function($)
  {
  $(document).ready(function(){
    var pathname = window.location.pathname,
    page = pathname.split(/[/ ]+/).pop(),
    menuItems = $('#main_menu a');
    menuItems.each(function(){
      var mi = $(this),
      miHrefs = mi.attr("href"),
      miParents = mi.parents('li');
      if(page == miHrefs) {
        miParents.addClass("active").siblings().removeClass('active');
      }
    });
  });
})(jQuery);
/*END JS for MENU*/

/* JS for Close Div*/
function close_div(id){
    document.getElementById(id).style.display='none';
}
/*END JS for Close Div*/      

/* JS for Wedding consulting panel*/
function refreshCaptcha(){
  TINY.box.show(document.getElementById('wedding_consulting_panel').innerHTML,0,0,0,1);
  document.getElementById('tinymask').onclick=null;
}
/* END JS for Wedding consulting panel*/

/* JS for captcha*/
var a = Math.ceil(Math.random() * 10);
var b = Math.ceil(Math.random() * 10);
var c = a + b;
function DrawBotBoot()
{
  document.write("<font style='font-size:12px;'><i>Spam protection check :</i></font><br><br><lable style='font-size: 24px; background-color:#ffffff;padding:10px 27px; font-style:italic; border:1px solid #f7f7f7; float:left;'>"+ a + " + " + b +"</lable>");
  document.write("<input type='hidden' name='captcha_value' id='captcha_value' value='"+c+"'>");
  document.write("<input id='BotBootInput' name='BotBoootInput' type='text' style='width:34%; margin-left:10px; margin-top:5px; background-color:#ffffff;' required='required'>");
}
/* END JS for captcha*/


/* JS for Carousels (by CarouFredSel)*/
/*;(function($) {
  $('#partners_carousel').carouFredSel({
    responsive: true,
    scroll: 1,
    auto: false,
    items: {
      width: 250,
      visible: {
        min: 3,
        max: 10
      }
    },
    prev: {
      button    : ".partners_carousel .prev",
      key       : "left"
    },
    next: {
      button    : ".partners_carousel .next",
      key       : "right"
    }
  });
})(jQuery);*/
/* END for Carousels*/

/* JS for Google Analystics*/
  var _gaq=[["_setAccount","UA-XXXXX-X"],["_trackPageview"]];
  (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
  g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
  s.parentNode.insertBefore(g,s)}(document,"script"));
/*END JS for Google Analystics*/    
    
/* JS for Category*/
function show_more_category()
{
  document.getElementById("category_da").style.display="block";
}
/*END JS for Google Analystics*/    

/* JS for Star Rating*/
$(document).on('click','input:radio',function(e){
  $(this).prevAll('input:radio').attr('checked', true);
  var selectedVal = "";
  var selected = $("input:radio:checked").val();

  var currentClick = $('input:radio').val();
  if(currentClick >= selected){
  $(this).nextAll('input:radio').attr('checked', false);
  }

  var newClick = $(this).val();
  if( newClick > selected){
    $(this).prevAll('input:radio').prop('checked', true);	
  }
});
/*END JS for Rating*/


/*JS for Back to Top*/
$("#back-top").hide();
// fade in #back-top
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#back-top').fadeIn();
    } else {
      $('#back-top').fadeOut();
    }
  });

  // scroll body to 0px on click
  $('#back-top a').click(function () {
    $('body,html').animate({
      scrollTop: 100
    }, 800);
    return false;
  });
});
/*END JS for Back to Top*/

/* JS to show More vendor type on homepage*/
$(document).on('click', '.maxlist-more' , function(){
  $('.maxlist-more').hide();
  $('.maxlist-hidden').show();
});
/* JS to show More vendor type on hpmepage */
