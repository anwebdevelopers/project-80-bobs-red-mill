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

        if (!$this.find('.tabs__buttons').length) {
            $this.prepend('<div class="tabs__buttons"></div>');
        }

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
                '<div class="recipes-home__next">' +
                    '<figure class="recipes-home__next-img">' +
                        '<img src="' + url + '">' +
                    '</figure>' +
                '<div class="recipes-home__next-text">Следующий рецепт</div>' +
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
    $('.page__aside-nav-item').addClass('accordion').find('.page__aside-nav-title').addClass('accordion__button').siblings('.page__aside-nav-list').addClass('accordion__box');
    const $accordion = $('.accordion');
    $accordion.on('click', '.accordion__button', function(e) {
        e.stopPropagation();

        if ($window.width() <= 768) {

            const $this = $(this);

            $this.closest('.accordion').hasClass('active') ? $this.closest('.accordion').removeClass('active') : $this.closest('.accordion').addClass('active').siblings().removeClass('active');
        }
    });


    /*******************************************************/
    //PRODUCT ITEM SLIDER
    /*******************************************************/
    $('.product-item__slider').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: false,
        navText: '',
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 600,
        onInitialized: function() {
            $('.product-item__slider').each(function() {
                $(this).find('.owl-item:not(.cloned) .product-item__img img').each(function() {
                    $(this).closest('.product-item__slider').find('.owl-dot').eq($(this).index('.owl-item:not(.cloned) .product-item__img img')).html('<img src="' + $(this).attr('src') + '">');
                });
            });
        }
    });


    /*******************************************************/
    //QUANTITY CHANGE
    /*******************************************************/

    $('.quantity').each(function() {
        $(this).find('.quantity__button').on('click', function() {
            const $input = $(this).closest('.quantity').find('.quantity__input');
            const value = +$input.val();

            if ($(this).hasClass('minus') && value > 0) {
                $input.val(value - 1).attr('value', value - 1);
            } else if ($(this).hasClass('plus')) {
                $input.val(value + 1).attr('value', value + 1);
            }
        });
    });


    /*******************************************************/
    //WINDOW HORISONTAL RESIZE
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


    /*******************************************************/
    //YANDEX MAP
    /*******************************************************/

    if ((typeof ymaps === 'object') && $('#map').length) {

        ymaps.ready(function() {

            const myMap = new ymaps.Map('map', {
                center: [43.251258, 76.931046],
                zoom: 13,
                controls: [],
                behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch']
            }, {
                searchControlProvider: 'yandex#search'
            });

            //Элементы управления
            myMap.controls.add('zoomControl', {
                size: 'small',
                position: {
                    top: 'auto',
                    left: 10,
                    bottom: 50
                }
            });

            //Генерируем выпадающий список адресов
            $( '.map__info' ).addClass('active').each( function() {

                const $this = $( this );

                $this.find('.map__info-item').not(':first').hide();

                //По клику ставим метку и перемещаемся к ней
                $this.find( '.map__info-address' ).each( function() {

                    //Отображение метки с контентом
                    myMap.geoObjects.add(new ymaps.Placemark(JSON.parse($(this).attr('data-coordinates')), {
                        hintContent: $(this).text(),
                        balloonContent: $(this).text(),
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: 'img/icon-mark.svg',
                        iconImageSize: [37, 56],
                        iconImageOffset: [-18, -56],
                    }));

                });

                $( '<div class="map__info-select"></div>' ).prependTo($this).append($this.find( '.map__info-address' ).first().addClass('active').end().clone()).on('click', '.map__info-address:not(.active)', function() {


                    $(this).addClass('active').siblings().removeClass('active')
                    .closest('.map__info').find('.map__info-item').slideUp(400).eq($(this).index()).slideDown(400)
                    .end().end().find( '.map__info-button').removeClass('active')
                    .end().find( '.map__info-select').removeClass('active');

                    //перемещение по координатам
                    myMap.panTo(JSON.parse($(this).attr('data-coordinates')), {
                        flying: false,
                        duration: 600
                    });
                });


                $( '<div class="map__info-button"></div>' ).prependTo($this).on('click', function(e) {
                    e.stopPropagation();
                    $(this).toggleClass('active').closest('.map__info').find( '.map__info-select').toggleClass('active');
                });

                $(document).on('click', function(e) {
                    e.stopPropagation();
                    if (!$(e.target).closest('.map__info-select').length) {
                        $this.find( '.map__info-button').removeClass('active');
                        $this.find( '.map__info-select').removeClass('active');
                    }
                });
            });

            //Вкл/Выкл драг карты при адаптиве
            $window.on('resize load', function() {
                $window.width() <= 992 ? myMap.behaviors.disable('drag') : myMap.behaviors.enable('drag')
            });

            //перерисуем карту после инициализации
            myMap.container.fitToViewport();

        });
    }

});
