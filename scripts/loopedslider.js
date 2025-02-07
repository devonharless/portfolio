// JavaScript Document

/*
 * 	loopedSlider 0.5.6 - jQuery plugin
 *	written by Nathan Searles	
 *	http://nathansearles.com/loopedslider/
 *
 *	Copyright (c) 2009 Nathan Searles (http://nathansearles.com/)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *	Compatible with jQuery 1.3.2+
 *
 */

/*
 *	markup example for $("#loopedSlider").loopedSlider();
 *
 *	<div id="loopedSlider">	
 *		<div class="container">
 *			<div class="slides">
 *				<div><img src="01.jpg" alt="" /></div>
 *				<div><img src="02.jpg" alt="" /></div>
 *				<div><img src="03.jpg" alt="" /></div>
 *				<div><img src="04.jpg" alt="" /></div>
 *			</div>
 *		</div>
 *		<a href="#" class="previous">previous</a>
 *		<a href="#" class="next">next</a>	
 *	</div>
 *
*/


if(typeof jQuery != 'undefined') {
	jQuery(function($) {
		$.fn.extend({
			loopedSlider: function(options) {
				var settings = $.extend({}, $.fn.loopedSlider.defaults, options);
			
				return this.each(
					function() {
					if($.fn.jquery < '1.3.2') {return;}
					var $t = $(this);
					var o = $.metadata ? $.extend({}, settings, $t.metadata()) : settings;
					
					var distance = 0;
					var times = 1;
					var slides = $(o.slides,$t).children().size();
					var width = $(o.slides,$t).children().outerWidth();
					var position = 0;
					var active = false;
					var number = 0;
					var interval = 0;
					var restart = 0;
					var pagination = $("."+o.pagination+" li a",$t);

					if(o.addPagination && !$(pagination).length){
						var buttons = slides;
						$($t).append("<ul class="+o.pagination+">");
						$(o.slides,$t).children().each(function(){
							if (number<buttons) {
								$("."+o.pagination,$t).append("<li><a rel="+(number+1)+" href=\"#\" >"+(number+1)+"</a></li>");
								number = number+1;
							} else {
								number = 0;
								return false;
							}
							$("."+o.pagination+" li a:eq(0)",$t).parent().addClass("active");
						});
						pagination = $("."+o.pagination+" li a",$t);
					} else {
						$(pagination,$t).each(function(){
							number=number+1;
							$(this).attr("rel",number);
							$(pagination.eq(0),$t).parent().addClass("active");
						});
					}

					if (slides===1) {
						$(o.slides,$t).children().css({position:"absolute",left:position,display:"block"});
						return;
					}

					$(o.slides,$t).css({width:(slides*width)});

					$(o.slides,$t).children().each(function(){
						$(this).css({position:"absolute",left:position,display:"block"});
						position=position+width;
					});

					$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});

					if (slides>3) {
						$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});
					}

					if(o.autoHeight){autoHeight(times);}

					$(".next",$t).click(function(event){
						event.preventDefault();
						
						if(active===false) {
								
							var nextSrc = $(this).find('img').attr("src");
							
							//UL Series related code
							
							if (nextSrc == "images/ulSeries/goAnywhere_right.png") {
								$(this).find('img').attr("src", "images/ulSeries/goPerform_right.png");
								$(".previous").find('img').attr("src", "images/ulSeries/goAstound_left.png");
								
							} 
							
							else if(nextSrc == "images/ulSeries/goPerform_right.png") {
								$(this).find('img').attr("src", "images/ulSeries/goAstound_right.png");
								$(".previous").find('img').attr("src", "images/ulSeries/goAnywhere_left.png");
							}
							
							else if(nextSrc == "images/ulSeries/goAstound_right.png") {
								$(this).find('img').attr("src", "images/ulSeries/goAnywhere_right.png");
								$(".previous").find('img').attr("src", "images/ulSeries/goPerform_left.png");
							}
							
							//N Series related code
							
							if (nextSrc == "images/nSeries/goListen_right.png") {
								$(this).find('img').attr("src", "images/nSeries/goPower_right.png");
								$(".previous").find('img').attr("src", "images/nSeries/goVisual_left.png");
								
							} 
							
							else if(nextSrc == "images/nSeries/goPower_right.png") {
								$(this).find('img').attr("src", "images/nSeries/goVisual_right.png");
								$(".previous").find('img').attr("src", "images/nSeries/goListen_left.png");
							}
							
							else if(nextSrc == "images/nSeries/goVisual_right.png") {
								$(this).find('img').attr("src", "images/nSeries/goListen_right.png");
								$(".previous").find('img').attr("src", "images/nSeries/goPower_left.png");
							}
							
							
							//G Series related code
							
							if (nextSrc == "images/gSeries/goStealth_right.png") {
								$(this).find('img').attr("src", "images/gSeries/goDominate_right.png");
								$(".previous").find('img').attr("src", "images/gSeries/goGame_left.png");
								
							} 
							
							else if(nextSrc == "images/gSeries/goDominate_right.png") {
								$(this).find('img').attr("src", "images/gSeries/goGame_right.png");
								$(".previous").find('img').attr("src", "images/gSeries/goStealth_left.png");
							}
							
							else if(nextSrc == "images/gSeries/goGame_right.png") {
								$(this).find('img').attr("src", "images/gSeries/goStealth_right.png");
								$(".previous").find('img').attr("src", "images/gSeries/goDominate_left.png");
							}
							
							
							animate("next",true);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					$(".previous",$t).click(function(event){
													 
						event.preventDefault();
						
						if(active===false) {	
						
							var previousSrc = $(this).find('img').attr("src");
							
							//UL Series related code
						
							if (previousSrc == "images/ulSeries/goPerform_left.png") {
								$(this).find('img').attr("src", "images/ulSeries/goAnywhere_left.png");
								$(".next").find('img').attr("src", "images/ulSeries/goAstound_right.png");
								
							} 
							
							else if(previousSrc == "images/ulSeries/goAnywhere_left.png") {
								$(this).find('img').attr("src", "images/ulSeries/goAstound_left.png");
								$(".next").find('img').attr("src", "images/ulSeries/goPerform_right.png");
							}
							
							else if(previousSrc == "images/ulSeries/goAstound_left.png") {
								$(this).find('img').attr("src", "images/ulSeries/goPerform_left.png");
								$(".next").find('img').attr("src", "images/ulSeries/goAnywhere_right.png");
							}
							
							
							//N Series related code
						
							if (previousSrc == "images/nSeries/goPower_left.png") {
								$(this).find('img').attr("src", "images/nSeries/goListen_left.png");
								$(".next").find('img').attr("src", "images/nSeries/goVisual_right.png");
								
							} 
							
							else if(previousSrc == "images/nSeries/goListen_left.png") {
								$(this).find('img').attr("src", "images/nSeries/goVisual_left.png");
								$(".next").find('img').attr("src", "images/nSeries/goPower_right.png");
							}
							
							else if(previousSrc == "images/nSeries/goVisual_left.png") {
								$(this).find('img').attr("src", "images/nSeries/goPower_left.png");
								$(".next").find('img').attr("src", "images/nSeries/goListen_right.png");
							}
							
							//G Series related code
						
							if (previousSrc == "images/gSeries/goDominate_left.png") {
								$(this).find('img').attr("src", "images/gSeries/goStealth_left.png");
								$(".next").find('img').attr("src", "images/gSeries/goGame_right.png");
								
							} 
							
							else if(previousSrc == "images/gSeries/goStealth_left.png") {
								$(this).find('img').attr("src", "images/gSeries/goGame_left.png");
								$(".next").find('img').attr("src", "images/gSeries/goDominate_right.png");
							}
							
							else if(previousSrc == "images/gSeries/goGame_left.png") {
								$(this).find('img').attr("src", "images/gSeries/goDominate_left.png");
								$(".next").find('img').attr("src", "images/gSeries/goStealth_right.png");
							}
						
						
							animate("prev",true);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					if (o.containerClick) {
						$(o.container,$t).click(function(){
							if(active===false) {
								animate("next",true);
								if(o.autoStart){
									if (o.restart) {autoStart();}
									else {clearInterval(sliderIntervalID);}
								}
							} return false;
						});
					}

					$(pagination,$t).click(function(){
						if ($(this).parent().hasClass("active")) {return false;}
						else {
							times = $(this).attr("rel");
							$(pagination,$t).parent().siblings().removeClass("active");
							$(this).parent().addClass("active");
							animate("fade",times);
							if(o.autoStart){
								if (o.restart) {autoStart();}
								else {clearInterval(sliderIntervalID);}
							}
						} return false;
					});

					if (o.autoStart) {
						sliderIntervalID = setInterval(function(){
							if(active===false) {animate("next",true);}
						},o.autoStart);
						function autoStart() {
							if (o.restart) {
							clearInterval(sliderIntervalID,interval);
							clearTimeout(restart);
								restart = setTimeout(function() {
									interval = setInterval(	function(){
										animate("next",true);
									},o.autoStart);
								},o.restart);
							} else {
								sliderIntervalID = setInterval(function(){
									if(active===false) {animate("next",true);}
								},o.autoStart);
							}
						};
					}

					function current(times) {
						if(times===slides+1){times = 1;}
						if(times===0){times = slides;}
						$(pagination,$t).parent().siblings().removeClass("active");
						$(pagination+"[rel='" + (times) + "']",$t).parent().addClass("active");
					};

					function autoHeight(times) {
						if(times===slides+1){times=1;}
						if(times===0){times=slides;}	
						var getHeight = $(o.slides,$t).children(":eq("+(times-1)+")",$t).outerHeight();
						$(o.container,$t).animate({height: getHeight},o.autoHeight);					
					};		

					function animate(dir,clicked){	
						active = true;	
						switch(dir){
							case "next":
								times = times+1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								if(slides<3){
									if (times===3){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if (times===2){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:width});}
								}
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===slides+1) {
										times = 1;
										$(o.slides,$t).css({left:0},function(){$(o.slides,$t).animate({left:distance})});							
										$(o.slides,$t).children(":eq(0)").css({left:0});
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});				
									}
									if (times===slides) $(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									if (times===slides-1) $(o.slides,$t).children(":eq("+(slides-1)+")").css({left:(slides*width-width)});
									active = false;
								});					
								break; 
							case "prev":
								times = times-1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								if (slides<3){
									if(times===0){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(-width)});}
									if(times===1){$(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});}
								}
								$(o.slides,$t).animate({left: distance}, o.slidespeed,function(){
									if (times===0) {
										times = slides;
										$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(slides*width-width)});
										$(o.slides,$t).css({left: -(slides*width-width)});
										$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});
									}
									if (times===2 ) $(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});
									if (times===1) $(o.slides,$t).children(":eq("+ (slides-1) +")").css({position:"absolute",left:-width});
									active = false;
								});
								break;
							case "fade":
								times = [times]*1;
								distance = (-(times*width-width));
								current(times);
								if(o.autoHeight){autoHeight(times);}
								$(o.slides,$t).children().fadeOut(o.fadespeed, function(){
									$(o.slides,$t).css({left: distance});
									$(o.slides,$t).children(":eq("+(slides-1)+")").css({left:slides*width-width});
									$(o.slides,$t).children(":eq(0)").css({left:0});
									if(times===slides){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});}
									if(times===1){$(o.slides,$t).children(":eq("+(slides-1)+")").css({ position:"absolute",left:-width});}
									$(o.slides,$t).children().fadeIn(o.fadespeed);
									active = false;
								});
								break; 
							default:
								break;
							}					
						};
					}
				);
			}
		});
		$.fn.loopedSlider.defaults = {
			container: ".container", //Class/id of main container. You can use "#container" for an id.
			slides: ".slides", //Class/id of slide container. You can use "#slides" for an id.
			pagination: "pagination", //Class name of parent ul for numbered links. Don't add a "." here.
			containerClick: true, //Click slider to goto next slide? true/false
			autoStart: 0, //Set to positive number for true. This number will be the time between transitions.
			restart: 0, //Set to positive number for true. Sets time until autoStart is restarted.
			slidespeed: 300, //Speed of slide animation, 1000 = 1second.
			fadespeed: 200, //Speed of fade animation, 1000 = 1second.
			autoHeight: 0, //Set to positive number for true. This number will be the speed of the animation.
			addPagination: false //Add pagination links based on content? true/false
		};
	});
}