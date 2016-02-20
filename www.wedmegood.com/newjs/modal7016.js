var source = "";
var loadmore = false;
var navigation = true;

     function preLoadModalImage(src){
        var image = new Image();
        src = src.replace("thumb_270", "thumb_800");
        src = src.replace("thumb_400", "thumb_800");
        image.src = src;
        //console.log(src+" image loaded");
     }

     function set_vendor_image(image_id, vendor_id, autoload, nav)
     {   
         var img_link = $('#image_'+ image_id );
         source = img_link.parents('li');
         img_src = img_link.find('img').attr('src');
         preLoadModalImage(img_src);
         $('#modal-loader').css('visibility','visible');

         $.ajax({
             type: "POST",
             url: "/getmodalvendorimagegalleryfullcategory",
             async: true,
             data: { imageID: image_id, vendorId: vendor_id },
             success:function(res){
                 if(history.pushState && history.replaceState) {
                   url = "/photos/"+image_id;
                   history.pushState({"id":image_id}, "new title", url);
                 }
                 showModal(res, source, autoload, nav);
              }
             
          });
     }

     function set_realwedding_image(image_id,realwedding_id, autoload, nav)
     {
          var img_link = $('#image_'+ image_id );
          source = img_link.parents('li');
          img_src = img_link.find('img').attr('src');
          preLoadModalImage(img_src);
         $('#modal-loader').css('visibility','visible');
         $.ajax({
             url: "/getmodalrealweddingimagegalleryfullcategory",  
             type: "POST",  
             data: { imageID: image_id, realWeddingID: realwedding_id },
             success: function (res) {
                 //alert(res);
                 if(history.pushState && history.replaceState) {
                   url = "/photos/"+image_id;
                   history.pushState({"id":image_id}, "new title", url);
                 }
                 showModal(res, source, autoload, nav);
                 //TINY.box.show(res,0,971,0,1);
                 //document.getElementById("transparent_panel").innerHTML=res;
             }  
         });
     }

     function set_project_image(image_id, project_id, autoload, nav)
     {   
         var img_link = $('#image_'+ image_id );
         source = img_link.parents('li');
         img_src = img_link.find('img').attr('src');
         preLoadModalImage(img_src);
         $('#modal-loader').css('visibility','visible');
         $.ajax({
             type: "POST",
             url: "/getmodalprojectimagegalleryfullcategory",
             async: true,
             data: { imageID: image_id, projectId: project_id },
             success:function(res){
                 if(history.pushState && history.replaceState) {
                   url = "/photos/"+image_id;
                   history.pushState({"id":image_id}, "new title", url);
                 }
                 showModal(res, source, autoload, nav);
              }
             
          });
     }

     function set_affiliate_image(image_id, product_id, autoload, nav)
     {   
         var img_link = $('#image_'+ image_id );
         source = img_link.parents('li');
         img_src = img_link.find('img').attr('src');
         preLoadModalImage(img_src);
         $('#modal-loader').css('visibility','visible');
         $.ajax({
             type: "POST",
             url: "/getmodalaffiliateimagegalleryfullcategory",
             async: true,
             data: { imageID: image_id, productId: product_id },
             success:function(res){
                 if(history.pushState && history.replaceState) {
                   url = "/image/"+image_id;
                   history.pushState({"id":image_id}, "new title", url);
                 }
                 showModal(res, source, autoload, nav);
              }
             
          });
     }

     function set_promotion_image(image_id, autoload, nav)
     {
        var img_link = $('#image_'+ image_id );
        source = img_link.parents('li');
        img_src = img_link.find('img').attr('src');
        preLoadModalImage(img_src);
        $('#modal-loader').css('visibility','visible');
        $.ajax({
           type: "POST",
           url: "/getmodalpromotionimagegalleryfullcategory",
           async: true,
           data: { imageID: image_id },
           success:function(res){
               if(history.pushState && history.replaceState) {
                 url = "/photos/"+image_id;
                 history.pushState({"id":image_id}, "new title", url);
               }
               showModal(res, source, autoload, nav);
            }
        });
      }
 
  function next_image(source){
      var next = source.next('li');
      if(next.length > 0){
          next.find('a:first').trigger('click');
          if(loadmore){
            last = next.next('li');
            if(last.length <= 0){
              onScroll(true);
            }
          }
        }else{
          next = source.next('a.modal-nav-help');
          if(next.length > 0){
            next.trigger('click');
          }
        }
    }

    function prev_image(source){
      var prev = source.prev('li');
        if(prev.length > 0){
            prev.find('a:first').trigger('click');
        }else{
          prev = source.prev('a.modal-nav-help');
          if(prev.length > 0){
            prev.trigger('click');
          }
        }
    }

    function keypressHandler(e) {
          
          switch (e.keyCode) {
            case 37: //left
                prev_image(source);
                break;
            case 39: //right
                next_image(source);
                break;
          }
    }
    
    function showModal(result, target, autoload, nav)
    {
      document.addEventListener("keydown", keypressHandler, false);

      source = target;
      loadmore = autoload;
      if($('#myModal').css('visibility') === 'hidden'){
        $('#myModal').reveal({
         animation: 'fadeAndPop',                   //fade, fadeAndPop, none
         animationspeed: 300,                       //how fast animtions are
         closeonbackgroundclick: false,              //if you click background will modal close?
         dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
        });
      }
      $('#modal-loader').css('visibility','hidden');
      $('#modal-loader').css('left','35%');
      $("#load_content").html(result);
      if (window.stButtons){stButtons.locateElements();} //load share this buttons dynamically
      $('#filter-row').addClass('hidden');
      $('#header').addClass('hidden');
      navigation = nav;
      if(nav){
        $('.arrow').show();
      }else{
        $('.arrow').hide();
      }
      //document.getElementById("transparent_panel").innerHTML=res;
    }

      $('.arrow.right').click(function(){
          next_image(source);
      });

      $('.arrow.left').click(function(){
          prev_image(source);
      });

      $('#myModal').on('reveal:close',function(){
          if($('#return_path').val() != ""){
            if(history.pushState && history.replaceState) {
              url = $('#return_path').val();
              history.pushState({"id":""}, "new title", url);
            }
          }
          $('#header').removeClass('hidden');
          $('#filter-row').removeClass('hidden');
          $('#modal-loader').css('left','calc(50% - 25px)');

          document.removeEventListener("keydown", keypressHandler, false);
      });