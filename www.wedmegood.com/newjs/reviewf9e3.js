$(document).ready(function(){
        var rating = '';
        
        $('#rating-value .fa').on('mouseenter',function(){
            $('#rating-value .fa').addClass('empty');
            value = $(this).attr('data-value');
            sequence = $(this).attr('data-sequence');
            $('#rating-value .fa:lt('+sequence+')').removeClass('empty');
            $('#rating-display').html(value+'');
        });
        
        $('#rating-value').on('mouseleave',function(){
            if(!($('#rating-display').hasClass('fix'))){
                value = $(this).attr('data-value');
                $('#rating-value .fa').addClass('empty');
                
            }
            if(rating != ''){
                $('#rating-display').html(rating+' stars');
                $('#rating-value .fa:nth-child('+rating+')').trigger('mouseenter');
            }else{
                $('#rating-display').html(rating);
            }

        });       
        $('#rating-value .fa').on('click',function(){
            rating = $(this).attr('data-sequence');
            $('#rating-display').addClass('fix');
            $('#rating-count input').prop('checked',false);
            $('#rating-count input[name="star'+rating+'"]').prop('checked',true);
        });

        $('#review-toggle form').on('submit',function(e){
            $('#review-error').text('');
            $('#review-error').css('color','red');
            if(rating == ''){
                $('#review-error').text('You must rate this vendor.');
                e.preventDefault();
            }else if($('#review-toggle form textarea').val().length < 100){
                $('#review-error').text('Review must be at least 100 characters long.');
                e.preventDefault();
            }
        });
    });