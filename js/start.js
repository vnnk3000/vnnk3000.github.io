/* блок с картой */
function initialize() {  
	var myLatlng = new google.maps.LatLng(34.8123749,-111.76);
	var myOptions = {
		zoom: 9,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
	}
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
	var markerImage = {
	    url: ('img/logo-small.png'),
	    size: new google.maps.Size(176, 147),
	    scaledSize: new google.maps.Size(88, 73),
	    origin: new google.maps.Point(0,0)
	}
	var marker = new google.maps.Marker({
		position: {lat: 34.7123749, lng: -111.66},
		map: map,
		title:"Welcome to Sedona!",
		animation: google.maps.Animation.DROP,
		icon: markerImage
	});
	google.maps.event.addListener(marker, 'click', toggleBounce);
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
}

/* выборка по категориям */
var checkbox = document.querySelectorAll('.selection input[type=checkbox]');
var hotelItem = document.querySelectorAll('.cat-list-item-wrap');
var select = document.querySelectorAll('.selection');
var sum = document.querySelector('.sort-title-sum');
var itemsRes = [];
for (var i = 0; i < checkbox.length; i++) {
	checkbox[i].addEventListener('click', checkHotel);
	function checkHotel(){
		var check = this.checked;
		var checkValue = this.value;
		var checked = document.getElementsByClassName('checked');
		for (var j = 0; j < hotelItem.length; j++) {
			if (check) {
				this.classList.add('checked');
				if (hotelItem[j].dataset.value.search(checkValue) == -1){
					hotelItem[j].classList.add('hide');
					
				} 
				itemsRes.push(hotelItem[j]);
					console.log(itemsRes.length);
					sum.innerHTML = hotelItem.length;
			}
		}
	}	
}



//////////////////////////////////////////////////////


$(document).ready(function(){

	if($('#map_canvas').length){
		initialize(); 	
	}

	/* передвижение к якорям */
	$('nav li a').on('click', function(e){
		e.preventDefault();
		var index = $(this).attr('href');
		var scrolled = $(index).offset().top;
		$('html,body').animate({scrollTop: scrolled},1000);
	})

	/* появление кнопки "Наверх" */
	$(window).on('scroll', function(){
		var scrolled = $(this).scrollTop();
		$('.info-item__blue').addClass('hide')
        if ( $(this).scrollTop() > 300 ){
        	$('.toTheTop').addClass('up');
            $('.toTheTop').addClass('animated');
            $('.toTheTop').addClass('flipInY');
            $('.toTheTop').removeClass('flipOutY');
        } else if (($('.toTheTop').hasClass('flipInY')) && ($(this).scrollTop() < 600)){
        	$('.toTheTop').removeClass('flipInY');
        	$('.toTheTop').addClass('flipOutY');
        }
        if ( $(this).scrollTop() > 550 ){
        	$('.info-item').addClass('animated');
        }

		if ($('#info').length) {
			var limit = $('#info').offset().top
				$('.title').css({backgroundPosition: '50% ' + '0' + scrolled*0.4 + 'px'})
				$('.title-text>img').css({transform: 'scale('+(1-scrolled*0.0005)+')',
					opacity: (1-scrolled*0.0005)})
		}

        var row = $('.info-items');
        row.each(function(){
        	var item = $(this).find('.info-item, .info-bg');
        	if (scrolled + 400 >= $(this).offset().top){
        		item.each(function(i){
        			$(this).delay((i++) * 500).fadeTo(1000, 1);
        		})
        	} 
        })
        var decor = $('.title-decoration img');
		var decorHeight = decor.height();
		if ( scrolled > 0 ){
			$(decor).height(decorHeight*(1-scrolled*.001));
		}
	})


	/* скролл наверх */
	$('.toTheTop').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop: '0'});
	})

	/* подключение виджета календаря */

	$("#datepicker1").datepicker({
		defaultDate: null,
		firstDay: 1,
		dateFormat:'dd MM yy',
		minDate: 0,
		showAnim:'slideDown',
	})

	$("#datepicker2").datepicker({
		defaultDate: null,
		firstDay: 1,
		dateFormat:'dd MM yy',
		minDate: 0,
		showAnim:'slideDown',
	})


	/*  выбор даты  */

	$('#hotel .btn__brown').on('click', function(e){
		e.preventDefault();
		$('.hotel-search-form').slideToggle(500);
	})


	/* количество людей */

	var btn = $('.icon-minus');
	$(btn).on('click', function(e){
		var quantity = $(this).siblings('input[type=text]');
		if(quantity.val() > 0){
			quantity.val(+quantity.val() - 1);
		}
	})


	var btn = $('.icon-plus');
	$(btn).on('click', function(e){
		var quantity = $(this).siblings('input[type=text]');
		if(quantity.val() >= 0){
			quantity.val(+quantity.val() + 1);
		}	
	})


	$('.btn__description').on('click', function(e){
		e.preventDefault();
		$(this).closest('.cat-list-item').siblings('.cat-list-item-description').slideToggle(500);
		$(this).toggleClass('visible');
		if($(this).hasClass("visible")){
			$(this).html('скрыть');
		}
		else{
			$(this).html('подробнее');
		}
	})






	$(".fancybox").fancybox({
		padding: 10,
		prevEffect: 'none',
		nextEffect: 'none',
		loop: false,
	  	helpers:{
		    overlay:{
				css:{
		         	'background' : 'rgba(255, 255, 255, 0.65)'
		        }
	  		}
		}
	});

	/* определение цены */


	$("#slider-range").slider({
	  range: true,
		min: 0,
		max: 5000,
		values: [ 0, 3500 ],
		slide: function( event, ui ) {
			$('#minPrice').html($('#slider-range').slider('values',0));
	        $('#maxPrice').html($('#slider-range').slider('values',1));
		},
		stop: function( event, ui ) {
			$('#minPrice').html($('#slider-range').slider('values',0));
	        $('#maxPrice').html($('#slider-range').slider('values',1));
		}
	});
	$('#minPrice').html($('#slider-range').slider('values',0));
	$('#maxPrice').html($('#slider-range').slider('values',1));


/*  сортировка */

	var btnSort = $('.sort-item a');
	var container = jQuery.makeArray($('.cat-list .cat-list-item-wrap'));
	btnSort.each(function () {
	  var id = $(this).attr("id");
	$(this).click(function (e) {
	      e.preventDefault();
	      var btnUp = $('.icon-up-dir');
			var btnDown = $('.icon-down-dir');
			var btnTriangle = $('.sort-angles i');
	      $(btnSort).parent().removeClass('active');
	      container.sort(function f(a, b) {
	          a = $(a).data(id);
	          b = $(b).data(id);
	          var c = 0
	          if (a > b) c = 1;
	          if (a < b) c = -1;
	          return c
	      });
	      $.map(container, function (div) {
	          $(div).appendTo($('.cat-list'));
	      });
	      $(btnTriangle).on('click', function(){
	      	$(btnTriangle).removeClass('active');
	      	$(this).addClass('active');
	      });
	      $(btnDown).on('click',function(){
	      	container.reverse();
	        $.map(container, function (div) {
	            $(div).appendTo($('.cat-list'))
	        });
	      })
	      
	  	$(this).parent().addClass('active');
	  	$(btnUp).addClass('active');
	  });
	});



// Подключение собственного плагина



	$('.slider1').slider({
		speed : 1000,
		pause : 8000,
		transition: 'slide',
	})
	$('.slider2').slider({
		speed : 2000,
		pause : 10000,
		transition: 'fade',
	})	

// Модальное окно

	var modal = document.querySelector('.hotel-search-form-modal');
	var btnRes = document.querySelectorAll('.cat-about-item .btn__brown');
	var btnClose = document.querySelector('.btn__close');
	var coverDiv = document.createElement('div');
		coverDiv.id = 'cover';

	function createCover(){
		document.body.appendChild(coverDiv);
	}
	function removeCover() {
		document.body.removeChild(document.getElementById('cover'));
    }
	for (var i = 0; i < btnRes.length; i++) {
		btnRes[i].addEventListener('click', showModal);
		function showModal(event){
			event.preventDefault();
			modal.classList.add('show');
			createCover();
		}
	}	
	function hideModal(event){
		event.preventDefault();
		modal.classList.remove('show');
		removeCover();
	}	
	if(btnClose){
		btnClose.addEventListener('click', hideModal);
	}
	if(coverDiv){
		coverDiv.addEventListener('click', hideModal);
	}

// Появление изображения при наведении
	$(".preview").hover(
		function showImage(e){
			xOffset = 200;
			yOffset = 20;
			this.t = $(this).parent()
				     .siblings('.cat-description')
				     .find('.cat-about-title h3')
					 .html();
			this.title = "";	
			var c = (this.t != "") ? "<br/>" + this.t : "";
			$("body").append("<p id='preview'><img src='"+ this.src.replace("_135x90","") +"' alt='Image preview' />"+ c +"</p>");								 
			$("#preview")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX + yOffset) + "px")
				.delay(1000)
				.slideDown(400);
		},
		function hideImage(e){
			this.title = this.t;	
			$("#preview").remove();
		}		
	)

	$(".preview").mousemove(function(e){
		$("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});
})


