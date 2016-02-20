$(function() {

    $('#wmg-messenger-box').perfectScrollbar();

    // with vanilla JS!
  //  Ps.initialize(document.getElementById('Demo'));
});
// $(function() {
// 	$("#inbox-thread-box").scrollTop( $( "#inbox-thread-box" ).prop( "scrollHeight" ) );
//     $('#inbox-thread-box').perfectScrollbar();

//     // with vanilla JS!
//   //  Ps.initialize(document.getElementById('Demo'));
// });



 function firstMessageThread(thread_id){

    //var thread_id = $(this).parent().data('id');
    //console.log(thread_id);
    $('#wmg-messenger-box li.current').removeClass('current');
    $('#wmg-messenger-box li:first').addClass('current');
    $("#inbox-thread-box").scrollTop( $( "#inbox-thread-box" ).prop( "scrollHeight" ) );
   	$('#inbox-thread-box').perfectScrollbar();

   	messageThread(thread_id);
}

function messageThread(thread_id){

    //var thread_id = $(this).parent().data('id');
    //console.log(thread_id);
    // $('#wmg-messenger-box li.current').removeClass('current');
    // $(this).closest('li').addClass('current');

    $.ajax
    ({
        url: "/vendors/getVendorInboxMsg",
        data: {"thread_id": thread_id},
        type: 'POST',
        success: function(result)
        {
            $('#msg_thread').empty();
            $("#msg_thread").append(result);

            $("#inbox-thread-box").scrollTop( $( "#inbox-thread-box" ).prop( "scrollHeight" ) );
   			$('#inbox-thread-box').perfectScrollbar();
           //console.log(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.responseText);
            console.log(thrownError);
          }
    });


}
$(document).ready(function() {
	$('#wmg-messenger-box li').click(function() {
	    $('#wmg-messenger-box li.current').removeClass('current');
	    $(this).closest('li').addClass('current');
	});

//  var monkeyList = new List('inbox-list', {
//  valueNames: ['name'],
//  plugins: [ ListFuzzySearch() ]
//});
});
function inboxReply(){

  //$('#inbox-reply').on("click", "#inbox-reply", function (e) {
	 	// e.preventDefault();
    	//console.log("j");
        var message= $.trim($("#message_desc").val());

        if(message.length == 0)
        {

        }else{

          $("#message").val(message);
          $.ajax({
  		    type: "POST",
  		    url: "/vendors/saveVendorInboxMsg",
  		    data: $("#myform").serialize(),
  		    success: function(data){
  		    	  $("#inbox-thread-box li:last").after(data);
  		        $("#message_desc").val("");
  		        $("#inbox-thread-box").scrollTop( $( "#inbox-thread-box" ).prop( "scrollHeight" ) );
     	  			$('#inbox-thread-box').perfectScrollbar();
  		        $('#message_desc').focus();
  		    },
  		    error: function(xhr, status, error) {
                  var err = eval("(" + xhr.responseText + ")");
                  //console.log(err.Message);
          }
  		  });
      }
}
