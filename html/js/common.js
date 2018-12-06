$(function() {

    'use strict';

    const $window = $(window);
    let windowWidth = $window.width();

    /*******************************************************/
    //MENU MOBILE
    /*******************************************************/

    const $menu = $('.header__menu'),
        $buttonMenu = $('.header__button-menu');

    $buttonMenu.on('click', function(e) {
        e.stopPropagation();

        $menu.toggleClass('active');
        $buttonMenu.toggleClass('active');
    });

    $(window).on('resize', function() {
        if (windowWidth != $window.width()) {
            windowWidth = $window.width();

            $menu.removeClass('active');
            $buttonMenu.removeClass('active');
        }
    });


    /*******************************************************/
    //BANNER SLIDER
    /*******************************************************/

    $('.banner').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplayTimeout: 10000,
        autoplay: true,
        smartSpeed: 1200
    });
});
