/* ===================================================================
 * Count - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".home-logo img").attr("src", "images/logo.png");
    }


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.home-slider').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            speed: 3000
        });

    };

   /* final countdown
    * ------------------------------------------------------ */
    var ssFinalCountdown = function() {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const tomorrow_year = tomorrow.getFullYear()
        const tomorrow_month = tomorrow.getMonth()
        const tomorrow_date = tomorrow.getDate()
        const finalDate = `${tomorrow_year}/${(tomorrow_month < 10) ? "0" : ""}${tomorrow_month}/${tomorrow_date}`
        $('.home-content__clock').countdown(finalDate)
        .on('update.countdown finish.countdown', function(event) {

            var str = '<div class=\"top\"><div class=\"time days\">' +
                      '%D <span>day%!D</span>' + 
                      '</div></div>' +
                      '<div class=\"time hours\">' +
                      '%H <span>H</span></div>' +
                      '<div class=\"time minutes\">' +
                      '%M <span>M</span></div>' +
                      '<div class=\"time seconds\">' +
                      '%S <span>S</span></div>';

            $(this)
            .html(event.strftime(str));
        });
    };

   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        ssPreloader();
        ssSlickSlider();
        ssFinalCountdown();

    })();


})(jQuery);