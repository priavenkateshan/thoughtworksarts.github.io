$(document).ready(function() {
	function init() {
		populateEvents();
		enableMenuButton();
		enableSocialLinks();
		fixResizableHeights();
		populateSignupBox();
	}

	function populateEvents() {
		if(window.location.pathname == '/') {
			$.ajax({
			  url: "https://api.meetup.com/volumetric/events?only=name,local_date,local_time,link,venue&page=2",
			  jsonp: "callback",
			  dataType: "jsonp",
			  data: { format: "json" },
			  success: function(response) {
			    alert(JSON.stringify(response.data[0]));
			    alert(JSON.stringify(response.data[1]));
			  }
			});
		}
	}

	function enableMenuButton() {
		var menuOverlaid = false;

		$('#menu-button').click(function() {
			if(menuOverlaid){
				$('header>#logonav>nav').removeClass('popout');
			} else {
				$('header>#logonav>nav').addClass('popout');
			}
			menuOverlaid = !menuOverlaid;
		});
	}

	function enableSocialLinks() {
		$('.social a').click(function(event) {
			var width =  575,
			    height = 400,
				left =   ($(window).width()	- width) / 2,
				top	 =   ($(window).height() - height) / 2,
				url	=    this.href,
				opts =   'status=1' +
						 ',width='	+ width	+
						 ',height=' + height +
						 ',top='	+ top +
						 ',left='	+ left;

			window.open(url, 'social-share', opts);
			event.preventDefault();
		});
	}

	function fixResizableHeights() {
		//Fixes problem with viewport height changing on mobile, as the URL bar disappears
		if($(window).width() <= 639) {
			$('.flex-col').each(function(index, value) {
				$(this).css('height', $(this).height() + 'px');
			});
		}
	}

	function populateSignupBox() {
		$('#tlemail').focusin(function(){
			if($(this).val() === 'your email'){
				prepForEmailEntry($(this));
			}
		});

		$('#tlemail').focusout(function(){
			if($(this).val() === ''){
				unprepForEmailEntry($(this));
			}
		});

		$('form.newsletter-form').submit(function(e){
			var tlemail = $('#tlemail');
			if(tlemail.val() === 'your email'){
				prepForEmailEntry(tlemail);
				e.preventDefault();
				unprepForEmailEntry(tlemail);
			}
		});
	}

	function prepForEmailEntry(el){
		el.val('');
		el.removeClass('faded');
	}

	function unprepForEmailEntry(el){
		el.val('your email');
		el.addClass('faded');
	}

	init();
});