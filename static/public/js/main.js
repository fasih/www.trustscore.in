$(function() {
  "use strict";

  var nav_offset_top = $('header').height() + 50; 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/
    function navbarFixed(){
        if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();



    /*-------------------------------------------------------------------------------
	  clients logo slider
	-------------------------------------------------------------------------------*/
    if ($('.clients_slider').length) {
      $('.clients_slider').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: false,
          responsiveClass: true,
          autoplay: 2500,
          slideSpeed: 300,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1,
              },
              768: {
                  items: 3,
              },
              1024: {
                  items: 4,
              },
              1224: {
                  items: 5
              }
          }
      })
    }


    /*-------------------------------------------------------------------------------
	  testimonial slider
	-------------------------------------------------------------------------------*/
    if ($('.testimonial').length) {
      $('.testimonial').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: true,
          responsiveClass: true,
          slideSpeed: 300,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1
              }
          }
      })
    }


    //=========================
    //  Active current menu while scrolling
    //=========================

    //ACTIVE CURRENT MENU WHILE SCROLLING

    $(window).on("scroll", function() {

        activeMenuItem($("#navbarSupportedContent"));

    });

    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");


        sections.each(function() {
            var top = $(this).offset().top - nav_height - 60,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("active");
                nav.find("a[href='#" + $(this).attr('name') + "']").parent().addClass("active");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("active");
                home.addClass("active");
            } else if ($(window).scrollTop() + windowHeight > documentHeight - 400) {
                nav.find("> ul > li > a").parent().removeClass("active");
            }

        });
    }

    //=========================
    // Smoth Scroll
    //=========================

    function smoothScrolling($links, $mNavToggler, $topGap) {
        var links = $links;
        var topGap = $topGap;
        var mNavToggler = $mNavToggler;        

        links.on("click", function(e, pageload) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    if (mNavToggler.is(":visible") && !pageload){
                        mNavToggler.trigger('click');
                    }
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000);
                    return false;
                }
            }
            return false;
        });
    }

    $(window).on("load", function() {
        smoothScrolling($(".main_menu a[href^='#']"), $('#mobile_nav'), 120);
    });


    $(window).on("load", function() {
        var target = $(".main_menu a[href^='" + window.location.hash + "']");
        target.length && target.trigger('click', [true]);
    });


    /*-------------------------------------------------------------------------------
    contactForm Send Message
  -------------------------------------------------------------------------------*/    

    function myPopup(myURL, title, myWidth, myHeight) {
            var left = (screen.width - myWidth) / 2;
            var top = (screen.height - myHeight) / 4;
            var myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
    }

    function sendMail() {
        var yourMessage = document.getElementById("message").value;
        var subject = document.getElementById("subject").value;
        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;

        if (yourMessage.length && subject.length && name.length){
          var message = "Hi TrustScore Admin \n\n"+yourMessage+"\n\n"+name;
          var mailString = "mailto:admin@trustscore.in?subject="
              + encodeURIComponent(subject)
              + "&body=" + encodeURIComponent(message);
          myPopup(mailString, 'mail', 1050, 550);
        }
    }


    $(document).ready(function() {
        $('#contactForm').submit(function(event){
            if (this.checkValidity()) {
                event.preventDefault();
                sendMail();
                this.reset();
            }
        });
    });      
  
});


