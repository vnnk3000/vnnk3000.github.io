;(function($){
	$.fn.slider = function(options){
		var defaults = {
			speed : 1000,
			pause : 2000,
			transition : 'slide',
			buttons: false
		},
		options = $.extend(defaults, options);
		if(options.pause <= options.speed){
			options.pause = options.speed + 200
		}
		this.each(function(){
			var slider = $(this);
			var sliderName = slider.attr("class")
			slider.wrap('<div class="'+ sliderName + '-wrap" />');
			var sliderWrap = slider.parent()
			var minHeight = 99999;
			slider.children().each(function(){
				if ( $(this).height() < minHeight ) {
					minHeight = $(this).height();
				}
			});
			slider.height(minHeight)
			sliderWrap.css({
				'position' : 'relative',
				'width': '100%',
				'margin' : '0 auto',
				'overflow' : 'hidden'
			});
			slider.css({
				'width': slider.children().width(),
				'position' : 'relative',
			});
			if(options.transition === 'slide'){
				slider.addClass('clearfix');
				slider.css({
					'width' : (slider.children().length+1)*slider.children().width()+'px',
				})
				slider.children().css({
					'float' : 'left',
				})
				slider.children(':first').clone().appendTo(slider)
				slide()
			}
			if(options.transition === 'fade'){
				slider.children().css({
					'width' : slider.children().width(),
					'position' : 'absolute',
					'left' : 0,
					'top' : 0,
				})
				slider.children(':gt(0)').hide()
				fade();
			}
			if(options.buttons === true){
				sliderWrap.append('<a href="#" class="slider-btn slider-btn-prev" /> <a href="#" class="slider-btn slider-btn-next" />')
			}
			function fade(){
				setInterval(function(){
					slider.children(':first')
				    .fadeOut(options.speed)
				    .next()
				    .fadeIn(options.speed)
				    .end()
				    .appendTo(slider);
				}, options.pause);
			}
			function slide(){
				var count = 1;
				setInterval(function(){
					slider.animate({
						'margin-left' : '-=' + slider.children().width(),
					}, options.speed, function(){
						if(++count === slider.children().length){
							count = 1;
							slider.css({
								'margin-left' : 0,
							})
						}
					})
					$('.btn-next').on('click', function(e){
						$(this).preventDefault(e)
					count++
					})
				}, options.pause)
			}
		})
	}
})(jQuery)