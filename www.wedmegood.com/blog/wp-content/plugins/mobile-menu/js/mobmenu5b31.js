		

		 

				

	jQuery(document).ready(function() {

				

							

			jQuery('#mobmenu-center').click(function(e){

				

				

					jQuery('.mob_menu_left_panel').toggleClass('mob_menu_left_panel_anim');

					jQuery('.mob_menu_right_panel').removeClass('mob_menu_right_panel_anim');

										

					e.preventDefault();

					e.stopPropagation();

					

				});

			



				

			jQuery('body').click(function(e){

					

				jQuery('.mob_menu_right_panel').removeClass('mob_menu_right_panel_anim');

				jQuery('.mob_menu_left_panel').removeClass('mob_menu_left_panel_anim');	

					

			});

				

			jQuery('.mob_menu_right_panel, .mob_menu_left_panel').click(function(e){

					

				jQuery('.mob_menu_right_panel').removeClass('mob_menu_right_panel_anim');

				jQuery('.mob_menu_left_panel').removeClass('mob_menu_left_panel_anim');
				
				e.stopPropagation();

					

			});

				

			jQuery('#mobmenu-right').click(function(e){

										

					jQuery('.mob_menu_right_panel').toggleClass('mob_menu_right_panel_anim');

					jQuery('.mob_menu_left_panel').removeClass('mob_menu_left_panel_anim');

										

					e.preventDefault();

					e.stopPropagation();

			});





	}); 





