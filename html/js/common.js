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

    $window.on('resize', function() {
        if (windowWidth != $window.width()) {
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


    /*******************************************************/
    //TABS
    /*******************************************************/

    $('.tabs').each(function() {
        const $this = $(this);

        $this.prepend('<div class="tabs__buttons"></div>');

        $this.find('.tabs__title').appendTo($this.find('.tabs__buttons')).first().addClass('active');

        $this.find('.tabs__section').not(':first').hide();

        $this.find('.tabs__buttons').on('click', '.tabs__title:not(.active)', function() {
            $(this).addClass('active').siblings().removeClass('active').closest('.tabs').find('.tabs__section').slideUp(400).eq($(this).index()).slideDown(400);
        });
    });

    /*******************************************************/
    //RECIPES HOME SLIDER
    /*******************************************************/

    $('.recipes-home__slider').each(function() {

        $(this).find('.recipes-home__item').not(':first').hide();

        $(this).find('.recipes-home__item').each(function() {

            const $this = $(this);
            let url;

            if ($this.index('.recipes-home__item') < $this.siblings('.recipes-home__item').length) {
                url = $this.closest('.recipes-home__slider').find('.recipes-home__item').eq($this.index('.recipes-home__item') + 1).find('.recipes-home__img img').attr('src');
            } else {
                url = $this.closest('.recipes-home__slider').find('.recipes-home__item').first().find('.recipes-home__img img').attr('src');
            }

            $this.append(
                '<div class="recipes-home__next">'+
                    '<figure class="recipes-home__next-img">'+
                        '<img src="' + url + '">'+
                    '</figure>'+
                    '<div class="recipes-home__next-text">Следующий рецепт</div>'+
                '</div>'
            );

            $this.on('click', '.recipes-home__next', function() {

                if (($(this).closest('.recipes-home__item').index('.recipes-home__item') + 1) < $(this).closest('.recipes-home__item').siblings('.recipes-home__item').length) {
                    $(this).closest('.recipes-home__item').slideUp(400).siblings('.recipes-home__item').eq($(this).closest('.recipes-home__item').index('.recipes-home__item') + 1).slideDown(400);
                } else {
                    $(this).closest('.recipes-home__item').slideUp(400).siblings('.recipes-home__item').first().slideDown(400);
                }

                $('html, body').animate({
                    scrollTop: $(this).closest('.recipes-home__slider').offset().top
                }, 400, 'swing');

            });
        })
    });


    /*******************************************************/
    //SIDE NAV MOBILE ACCORDION
    /*******************************************************/
    $('.page__nav-item').addClass('accordion').find('.page__nav-title').addClass('accordion__button').siblings('.page__nav-list').addClass('accordion__box');
    const $accordion = $('.accordion');
    $accordion.on('click', '.accordion__button', function(e)
    {
        e.stopPropagation();

        if ($window.width() <= 640) {

            const $this = $(this);

            $this.closest('.accordion').hasClass('active') ? $this.closest('.accordion').removeClass('active') : $this.closest('.accordion').addClass('active').siblings().removeClass('active');
        }
    });


    /*******************************************************/
    //CHECK WINDOW HORISONTAL RESIZE
    /*******************************************************/
    $window.on('resize', function() {
        const newWindowWidth = $window.width();

        if (windowWidth != newWindowWidth) {

            windowWidth = newWindowWidth;

            //MENU MOBILE
            $menu.removeClass('active');
            $buttonMenu.removeClass('active');

            //SIDE NAV MOBILE ACCORDION
            $accordion.removeClass('active');
        }
    });

});
