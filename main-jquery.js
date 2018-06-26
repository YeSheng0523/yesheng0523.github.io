var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
//判断是否IE内核
//if(browser.versions.trident){ alert("is IE"); }
//判断是否webKit内核
//if(browser.versions.webKit){ alert("is webKit"); }
//判断是否移动端
//if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
window.onload = function(){
	$(".header-learn-more").addClass("bounceInDown animated");
	$(".start-sipping").addClass("swing animated");
	$(".banner-txt-img").addClass("fadeInDown animated");
	
	$(".load-fadeInUp").each(function(i){
		$(this).addClass("animated fadeInUp");
	});
	$(".load-fadeIn").each(function(i){
		$(this).addClass("animated fadeIn");
	});
	$(".load-fadeInLeft").each(function(i){
		$(this).addClass("animated fadeInLeft");
	});
	$(".load-fadeInRight").each(function(i){
		$(this).addClass("animated fadeInRight");
	});
	
};
$(function() {
	/*窗口变化时运行*/
	$(window).resize(function() {
		/*全屏幕高度*/
		$(".parallax").css("min-height",$(window).height());
	});
	if(browser.versions.trident){
		$("body").addClass("ie");
	}
	if(browser.versions.mobile){
		$("body").addClass("mob");
	}
	if(browser.versions.ios && browser.versions.mobile){
		$("body").addClass("iosmob");
	}
	if(browser.versions.ios){
		$("body").addClass("ios");
	}
	if(browser.versions.iPhone){
		$("body").addClass("iPhone");
	}
	if(browser.versions.android){
		$("body").addClass("android");
	}
	
	/**/
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.mob-menu').outerHeight();
	/*滚动条滚动时运行*/
	$(window).scroll(function(){
		/*css 动画*/
		$(".css3-animation,.css3-animation-3d,.css3-animation-txt,.css3-animation-txt-y,.css3-animation-txt-right").each(function(i){
				if($(window).scrollTop() >= ($(this).offset().top - ($(window).height()*0.75 ) )){
					$(this).addClass("scrolltothis");
				}
		});
		
		$(".add-fadeIn").each(function(i){
				if($(window).scrollTop() >= ($(this).offset().top - ($(window).height()*0.75 ) )){
					$(this).addClass("animated fadeIn");
				}
		});
		
		$(".add-fadeInUp").each(function(i){
				if($(window).scrollTop() >= ($(this).offset().top - ($(window).height()*0.75 ) )){
					$(this).addClass("animated fadeInUp");
				}
		});
		$(".add-fadeInDown").each(function(i){
				if($(window).scrollTop() >= ($(this).offset().top - ($(window).height()*0.75 ) )){
					$(this).addClass("animated fadeInDown");
				}
		});
		
		/*css 动画 end*/
		if($(window).scrollTop() > 1 ){
			$("body").addClass("scroll");
		}else{
			$("body").removeClass("scroll");
		}
		/**/
		didScroll = true;
	});
	/***/
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);
	function hasScrolled() {
		var st = $(this).scrollTop();
		
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			$('.mob-menu').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st + $(window).height() < $(document).height()) {
				$('.mob-menu').removeClass('nav-up').addClass('nav-down');
			}
		}
		
		lastScrollTop = st;
	}

	/***/
	$(".page-banner,.home-banner").addClass("loadone");
	/*全屏幕高度*/
	$(".parallax").css("min-height",$(window).height());
	
	/**/
	function floatLabel(inputType){
		$(inputType).each(function(){
			var $this = $(this);
			// on focus add cladd active to label
			$this.focus(function(){
				$this.next().addClass("active");
				
			});
			//on blur check field and remove class if needed
			$this.blur(function(){
				if($this.val() === '' || $this.val() === 'blank'){
					$this.next().removeClass();
				}
			});
		});
	}
	// just add a class of "floatLabel to the input field!"
	floatLabel(".floatLabel");
	
	
click_scroll();
	
	/**/
	$(".navbar-link").click(function(){
		$(this).toggleClass("active");
		$("html").toggleClass("active");
		$("body").toggleClass("active");
		$(".page-wrap").toggleClass("active");
		$(".mob-navbar-pop").toggleClass("active");
		
	});
	$(".page-wrap.active").click(function(){
		$(this).removeClass("active");
		$(".mob-navbar-pop").removeClass("active");
		$(".navbar-link").removeClass("active");
	});
	$(".dropdown-sub>a").click(function(){
		$(this).parent().toggleClass("active")
		$(this).siblings(".mob-menu-sub").slideToggle();
		return false;
	});
	
	$(".mob-navbar-pop .close-btn").click(function(){
		$(".navbar-link").trigger("click");
		return false;
	});
	$(".mob-navbar li a").click(function(){
	  	$(".navbar-link").trigger("click");
	});
	
	$('.hamburger-menu').on('click', function() {
		$('.bar').toggleClass('animate');
		$(".mob-menu").toggleClass("open");
		$(".mob-menu-child").stop(true,false).slideToggle(300);
	});
	/**/
	/*pop up*/
	$(".close-icon").click(function(){
		$(this).parents(".pop-wrap").fadeOut();
		$("#video-pop iframe").attr("src","");
		$("#contact-us-pop iframe").attr("src"," ");
		$("#apply-us-pop iframe").attr("src"," ");
		return false;	
	});
	$(".pop-wrap-bg").click(function(){
		$(this).parents(".pop-wrap").fadeOut();
		$("#contact-us-pop iframe").attr("src"," ");
		$("#apply-us-pop iframe").attr("src"," ");
	});
	
	$(".poppu-link").click(function(){
	  $(".popup-pop").addClass("active").fadeIn();
	  return false;
	});
	/**/
	$(".video-pop-link").click(function(){
	  $("#video-pop").addClass("active").fadeIn();
	  $("#video-pop iframe").attr({
		  "src" : $(this).attr("data-src")+"?rel=0&autoplay=1",
		  "height" :  $("#video-pop iframe").width()*0.562962
		  });
	  return false;
	});
	$(".contact-us-pop-link").click(function(){
		if(browser.versions.mobile)
		window.location.href = "https://aigchinese.wufoo.com/embed/zqswkcn0v436lu/";
		else{
		$("#contact-us-pop #apply").val('');
		$("#contact-us-pop iframe").attr("src","https://aigchinese.wufoo.com/embed/zqswkcn0v436lu/");
	  $("#contact-us-pop").addClass("active").fadeIn();
		}
			return false;
	});
	
	$(".section-04 a.btn-orange").click(function(){
		if(browser.versions.mobile)
		window.location.href = "https://aigchinese.wufoo.com/embed/m1g1wuul0tojv0t/";
		else{
		$("#contact-us-pop #apply").val('true');
		$("#apply-us-pop iframe").attr("src","https://aigchinese.wufoo.com/embed/m1g1wuul0tojv0t/");
	  $("#apply-us-pop").addClass("active").fadeIn();
		}
	  return false;
	});
	/**/
	var Swiper1 = new Swiper('.about-aig-swiper .swiper-container', {
      slidesPerView: 8,
      // init: false,
       pagination: {
        el: '.about-aig-swiper .swiper-pagination',
		clickable: true,
        //type: 'progressbar',
      },
      navigation: {
        nextEl: '.about-aig-swiper .swiper-button-next',
        prevEl: '.about-aig-swiper .swiper-button-prev',
      },
      breakpoints: {
        1024: {
          slidesPerView: 8,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 8,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        320: {
          slidesPerView: 3,
          spaceBetween: 0,
        }
      }
	  
    });
	var Swiper2 = new Swiper('.about-aig-txt-swiper .swiper-container', {
      pagination: {
        el: '.about-aig-txt-swiper .swiper-pagination',
		clickable: true,
      },
      navigation: {
        nextEl: '.about-aig-txt-swiper .swiper-button-next',
        prevEl: '.about-aig-txt-swiper .swiper-button-prev',
      },
	  on: {
		slideChangeTransitionStart: function(event){
		   //alert('当前的slide序号是'+this.activeIndex);
		  $(".about-aig-swiper .swiper-slide").removeClass("active-next , active , active-prev ");
		  for (var i=0;i<this.activeIndex;i++){
			$(".about-aig-swiper .swiper-slide").eq(i).addClass("active , active-prev");
		  }
		  $(".about-aig-swiper .swiper-slide").eq(this.activeIndex).addClass("active");
		  $(".about-aig-swiper .swiper-slide").eq(this.activeIndex+1).addClass("active-next");
		},
	  },

    });
	Swiper1.controller.control = Swiper2;
	Swiper2.controller.control = Swiper1;
	/**/
	$(".about-aig-swiper .swiper-slide").click(function(){
	  
	  $(".about-aig-swiper .swiper-slide").removeClass("active-next , active , active-prev ");
	  for (var i=0;i<$(this).index();i++){
		$(".about-aig-swiper .swiper-slide").eq(i).addClass("active , active-prev");
	  }
	  $(this).addClass("active");
	  $(".about-aig-swiper .swiper-slide").eq($(this).index()+1).addClass("active-next");
	  $(".about-aig-txt-swiper .swiper-pagination-bullet").eq($(this).index()).trigger("click");
	});
	
	/**/
	$(".join-team-tabs-list li").click(function(){
	  $(".join-team-tabs-list li").removeClass("active , active-next");
	  $(this).addClass("active");
	  $(".join-team-tabs-list li").eq($(this).index()+1).addClass("active-next");
	  $(".join-team-tabs-box").hide();
	  $(".join-team-tabs-box").eq($(this).index()).stop(false,true).fadeIn();  	
	
	});
	
	$(".address-d").click(function(){
	  $(".address-d").removeClass("active");
	  $(this).addClass("active");
	  $(".address-info-tabs-list li").eq($(this).index()).trigger("click");
	  if($(window).width()>=767){
	    $("html,body").animate({scrollTop: $(".address-info .mob-hide").offset().top - $("#header").height() - 30}, 1000);
	  }
	});
	
	$(".address-info-tabs-list li").click(function(){
	  $(".address-info-tabs-list li").removeClass("active , active-next");
	  $(this).addClass("active");
	  $(".address-info-tabs-list li").eq($(this).index()+1).addClass("active-next");
	  $(".address-d").removeClass("active");
	  $(".address-d").eq($(this).index()).addClass("active");
	  $(".address-info-tabs-box").hide();
	  $(".address-info-tabs-box").eq($(this).index()).stop(false,true).fadeIn();  	
	
	});
	/**/
	$(".child-title").click(function(){
	  $(this).toggleClass("active").siblings(".child-box").slideToggle();	
	});
	
	$('.contact-us-pop-main form').submit(function(e) {
		var has_error = false;
    if($('input[name="term"]',this).prop('checked') == false){
			 $('input[type=checkbox]',this).parents('.checkbox').addClass('error');
			has_error = true;
		}else  $('input[type=checkbox]',this).parents('.checkbox').removeClass('error');
		var v = grecaptcha.getResponse(widgetId1);
		if(v.length == 0)
		{
			//alert("Error: Please complete CAPTCHA to proceed!");
			document.getElementById('grecaptcha_error').innerHTML="Error: Please complete CAPTCHA to proceed";
			has_error = true;
		}else document.getElementById('grecaptcha_error').innerHTML="";
		$('.contact-us-pop-main form input[type="text"]').each(function(index, element) {
      if($(this).hasClass('required') == true){
				if($.trim($(this).val()) == ''){
					$(this).parent('.controls').addClass('error');
					$(this).parent('.controls').append('<span class="error-txt">必填</span>');
					has_error = true;
				}else{
					$(this).parent('.controls').removeClass('error');
					$(this).parent('.controls').children('.error-txt').remove();
				}
			}
    });
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if($.trim($("input[name='email']").val()) == '' || !re.test($.trim($("input[name='email']").val()))) {
			$("input[name='email']").parent('.controls').addClass('error');
			$("input[name='email']").parent('.controls').append('<span class="error-txt">必填郵箱地址</span>');
			has_error = true;
		}else{
			$("input[name='email']").parent('.controls').removeClass('error');
			$("input[name='email']").parent('.controls').children('.error-txt').remove();;
		}
		if(has_error) return false;
		var apply=$.trim($('#apply').val());
		var name=$.trim($('input[name="name"]',this).val());
		var email=$.trim($('input[name="email"]',this).val());
		var phone=$.trim($('input[name="phone"]',this).val());
		var zipcode=$.trim($('input[name="zipcode"]',this).val());
		
		var url = "name="+name+"&email="+email+"&phone="+phone+"&zipcode="+zipcode+"&recaptcha="+v+"&apply="+apply;
		//var url = "name="+name+"&email="+email+"&phone="+phone+"&zipcode="+zipcode+"&apply="+apply;
		
		$.ajax({
			type: "GET",
			url: "http://www.rooster-designs2.com/mailer.php",
			data: url,
			cache:false,
			//dataType: "json",
			crossDomain: true,
			error: function(xhr, textStatus, errorThrown) {
				console.log(errorThrown);
				alert("System Error !!");
			},
			success: function(cmsg){
				console.log(cmsg);
				if(cmsg == "recaptcha"){
					$("#grecaptcha_error").html("Error: Please complete CAPTCHA to proceed").show();
				}else{
					$(".contact-us-pop-main form")[0].reset();
					grecaptcha.reset();
					 $('input[name="term"]').parents('.checkbox').removeClass('error');
					$("#grecaptcha_error").html('');
					$('#contact-us-pop').hide();
					$('#thanks-pop').addClass('active').show();
				}
				//alert(cmsg);
			}
		});
		
		return false;
  });
});
/*old menu*/
/*$(document).ready(function(){
	var menu_head = $(".menu-head");
    menu_head.hover(function(index) {
		$(this).parent().find(".menu-body").slideDown('fast').show();
        $(this).parent().hover(
			function() {
				$(this).find(".menu-head").addClass("aa1");
            }, function(){
            	$(this).parent().find(".menu-body").slideUp('fast').end().find(".menu-head").removeClass("aa1");
        });
    });
});*/
/*浏览器判断*/


/*点击滚动到#id, click_scroll()运行*/
function click_scroll(){
	if($("a[href^='#']").length > 0){
		$("a").click(function(){
			if($(this).attr("href").length >= 2){
				$("html,body").animate({scrollTop: $($(this).attr("href")).offset().top - $("#header").height()}, 1000);
				return false;
			}
		});
	}
}
/*parallax,$(".dome").parallax()*/
(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();
	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		//get the starting position of each element to have parallax applied to it	
		function update (){
			
			$this.each(function(){
								
				firstTop = $this.offset().top;
			});
	
			if (outerHeight) {
				getHeight = function(jqo) {
					return jqo.outerHeight(true);
				};
			} else {
				getHeight = function(jqo) {
					return jqo.height();
				};
			}
				
			// setup defaults if arguments aren't specified
			if (arguments.length < 1 || xpos === null) xpos = "50%";
			if (arguments.length < 2 || speedFactor === null) speedFactor = 1.2;
			if (arguments.length < 3 || outerHeight === null) outerHeight = true;
			
			// function to be called whenever the window is scrolled or resized
			
				var pos = $window.scrollTop();				
	
				$this.each(function(){
					var $element = $(this);
					var top = $element.offset().top;
					var height = getHeight($element);
	
					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}
					
					$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
					
				});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);
/*scrolltotop*/
var scrolltotop={
	setting: {startline:100, scrollto: 0, scrollduration:500, fadeduration:[500, 100]},
	controlHTML: '<i class="fa fa-angle-up"></i>', 
	controlattrs: {offsetx:5, offsety:5}, 
	anchorkeyword: '#top', 
	state: {isvisible:false, shouldvisible:false},
	scrollup:function(){
		if (!this.cssfixedsupport){this.$control.css({opacity:0}); };
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto);
		if (typeof dest=="string" && jQuery('#'+dest).length==1){dest=jQuery('#'+dest).offset().top;}
		else{dest=0;};
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window);
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
		this.$control.css({left:controlx+'px', top:controly+'px'});
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop();
		if (!this.cssfixedsupport){this.keepfixed();};
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false;
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0]);
			this.state.isvisible=true;
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1]);
			this.state.isvisible=false;
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop;
			var iebrws=document.all;
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest;
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'Scroll Back to Top'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body');
			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!=''){mainobj.$control.css({width:mainobj.$control.width()}); }
			mainobj.togglecontrol();
			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup();
				return false;
			});
			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol();
			})
		})
	}
};

scrolltotop.init();