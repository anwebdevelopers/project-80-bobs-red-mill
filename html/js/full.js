$(function() {

    'use strict';
    var w = $(window).width();

    /*******************************************************/
    //MENU MOBILE
    /*******************************************************/
    const menu = document.querySelector('.header__menu'),
        buttonMenuMobile = document.querySelector('.header__menu-button');
    buttonMenuMobile.addEventListener('click', function(e) {
        e.stopPropagation();
        if (buttonMenuMobile.classList.contains('active')) {
            buttonMenuMobile.classList.remove('active');
            menu.style.display = '';
        } else {
            buttonMenuMobile.classList.add('active');
            menu.style.display = 'block';
        }

    });
    window.addEventListener('resize', function() {
        buttonMenuMobile.classList.remove('active');
        menu.style.display = '';
    });

    //-------------------------------
    //Меню
    //-------------------------------

    $('.header__nav-btn').click(function() {
        if ($(this).hasClass('active') == false) {
            $(this).addClass('active');
            $('.header__nav').fadeIn(500);
        } else {
            $(this).removeClass('active');
            $('.header__nav').fadeOut(500);
        }
    });
    //или
    $('.header__nav-button').click(function() {
        if ($('.header__nav ul').is(':visible')) {
            $('.header__nav-button i').removeClass('icon-cancel');
            $('.header__nav-button i').addClass('icon-menu');
            $('.header__nav').fadeOut(200);
        } else {
            $('.header__nav-button i').removeClass('icon-menu');
            $('.header__nav-button i').addClass('icon-cancel');
            $('.header__nav').fadeIn(200);
        };
        return false;
    });

    //Выключение при клике по ссылке
    $('.header__nav a').click(function() {
        $('.header__nav-btn').removeClass('active');
        $('.header__nav').fadeOut(500);
    });

    //Выключение при клике по странице
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".header__search-form").length) {
            $('.header__search-form').fadeOut(200);
            $('.header__search-button').fadeIn(200);
        }
        e.stopPropagation();
    });

    //Выключение скрытого меню по ресайзу
    $(window).resize(function() {

        if (w > 992 && $(".header__nav").is(':hidden')) {
            $('.header__nav').removeAttr('style');
        }
    });


    //---------------------------------
    //Адаптивный слайдер
    //---------------------------------
    var owl = $(".slider");
    owl.owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 1200,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            481: {
                items: 3
            },
            769: {
                items: 4
            },
            993: {
                items: 5
            }
        }
    });

    //---------------------------------------------------------------
    //Отключение автоплея по скроллу
    //---------------------------------------------------------------
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        //Отключение автоплея в шапке
        if (st > $('.header').offset().top - $(window).height() && st < ($('.header').offset().top) + $('.header').height()) {
            $(".header__slider").trigger('play.owl.autoplay', [100, 5000]);
        } else {
            $(".header__slider").trigger('stop.owl.autoplay', [100]);
        }
    });

    //---------------------------------------------------------------
    //Подсчет итемов в слайдере отзывов и вывод на страницу
    //---------------------------------------------------------------
    $('.reviews__slider-item').each(function() {
        $(this).find('.reviews__slider-text').after('<div class="reviews__slider-numeral"><span class="reviews__slider-numeral-number">' + ($(this).index() + 1) + '</span><span class="reviews__slider-numeral-quantity">' + $('.reviews__slider-item').length + '</span></div>');
    });

    //--------------------------------------------------------------
    //Табы
    //--------------------------------------------------------------
    $('.tabs__buttons button').first().addClass('active');
    $(".tabs__item").not(":first").hide();
    $('.tabs__buttons').on('click', 'button:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').closest('.tabs').find('.tabs__item').hide().eq($(this).index()).fadeIn(300);
    });

    //-------------------------------
    //Gallery
    //-------------------------------
    $('.details__galery-box').on('click', '.details__galery-item:not(.active)', function() {
        var imgPath = $(this).children('img').attr('src');
        var oldImage = $('.details__galery-bigphoto img');
        var newImage = $('<img src="' + imgPath + '">');
        newImage.hide();
        $('.details__galery-bigphoto').append(newImage);
        newImage.fadeIn(600);
        oldImage.fadeOut(600, function() {
            $(this).remove();
        });
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.details__galery-item:first').click();

    //------------------------------------
    //Выравнивание блоков по высоте
    //------------------------------------

    $(".services__item h4").equalHeights();
    $(".news__text h4").equalHeights();
    $(".news__text p").equalHeights();
    $(".links__item span").equalHeights();

    //------------------------------------
    //popup
    //------------------------------------

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
    $('.doc_item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });
    //---------------------------------------------
    //Видеопопап
    //---------------------------------------------
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    //------------------------------------------------
    // Плавный скролл.mPageScroll2id()
    //------------------------------------------------

    //$("a[href*='#']").mPageScroll2id();
    $("a[href='#registration']").mPageScroll2id();
    $("a[href='#speakers']").mPageScroll2id();
    $("a[href='#about']").mPageScroll2id();


    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $('.scroll').click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
    });

    //-------------------------------------------------------------
    //Parallax
    //-------------------------------------------------------------

    $(window).scroll(function() {
        var st = $(this).scrollTop();

        //Один фон
        if (st > $('.registration').offset().top - $(window).height() && st < ($('.registration').offset().top) + $('.registration').height()) {
            $('.registration').css({
                'background-position': 'center ' + (st / 20) + '%'
            });
        }

        //Множественный фон
        if (st > $('.result').offset().top - $(window).height() && st < ($('.result').offset().top) + $('.result').height()) {
            $('.result').css({
                'background': 'url(img/parallax1.png) 20% ' + (180 - (st / 28)) + '% / 44px 45px no-repeat, url(img/parallax2.png) 10% ' + (-100 + (st / 20)) + '% / 61px 61px no-repeat, url(img/parallax1.png) 36% ' + (-190 + (st / 13)) + '% / 80px 80px no-repeat, url(img/parallax2.png) 66% ' + (-100 + (st / 26)) + '% / 74px 74px no-repeat, url(img/parallax2.png) 52% ' + (160 - (st / 28)) + '% / 35px 35px no-repeat, url(img/parallax1.png) 80% ' + (-260 + (st / 10)) + '% / 26px 26px no-repeat, url(img/bg-result.png) center 0 / 840px 650px no-repeat'
            });
        }
    });

    //--------------------------------------------
    //Прокрутка чисел
    //--------------------------------------------

    function numAnimate(num, sim) {
        $(num).each(function() {
            var $num = $(this).html().replace(/[^-0-9]/gim, '');
            $(this).animate({
                num: $num
            }, {
                duration: 2000,
                step: function(num) {
                    $(this).html((num).toFixed(0) + sim);
                }
            });
        });
    }

    //-----------------------------------------------
    //SVG Fallback
    //-----------------------------------------------
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

    /*  -------------
    //Валидация полей формы на странице заказа
    ------------- */

    var validator = $("#contactForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            mesage: {
                required: true
            },
        },
        messages: {
            name: {
                required: 'Поле "Имя" обязательно для заполнения.',
                minlength: 'Имя не может быть меньше двух символов.'
            },
            email: {
                required: 'Поле "E-mail" обязательно для заполнения.',
                email: 'Введите корректный адрес электронной почты.'
            },
            message: {
                required: 'Поле "Сообщение" обязательно для заполнения.'
            },
        }
    });

    /*  -------------
         Contact Form
        ------------- */

    //E-mail Ajax Send
    //Documentation & Example: https://github.com/agragregra/uniMail

    $("#contactForm").submit(function() { //Change
        var th = $(this);
        if (validator.form() == true) {
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function() {
                $(".success").fadeIn(200);
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                    $(".success").fadeOut(200);

                }, 3000);
            });
        }
        return false;
    });


    //--------------------------------------------------------
    //E-mail Ajax Send
    //--------------------------------------------------------
    //Documentation & Example: https://github.com/agragregra/uniMail
    $("#callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(".success").addClass("visible");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
                $(".success").removeClass("visible");
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------
    //fullscreen header
    //------------------------------------------------------------

    var $header = $('.header');

    function fullscreen() {
        if($('html').hasClass('ie')) {
            $header.removeAttr('style');
            var windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                headerHeight = $header.height();
            if (windowHeight > $header.height() && windowWidth > 640) {
                $header.css({
                    'height' : windowHeight + 'px'
                });
            }
        }
    }

    fullscreen();

    $(window).resize(function() {
        fullscreen();
    });


    //-------------------------------
    // Google Map ( for contact page )
    //-------------------------------

    $('#google-map').gMap({
        latitude: 59.9342802,
        longitude: 30.3350986,
        maptype: 'TERRAIN',
        scrollwheel: false,
        zoom: 12,
        markers: [{
            latitude: 59.9342802,
            longitude: 30.3350986,
            html: "Я живу в Санкт-Петербурге",
            icon: {
                image: "img/icon/map_marker.png",
                iconsize: [46, 46],
                iconanchor: [12, 46]
            }
        }],
        controls: {
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        }
    });


    //--------------------------------------------------------------------
    //Яндекс карта
    //--------------------------------------------------------------------
    var $map = $('#map');
    if ($map.length) {
        ymaps.ready(function() {
            var myMap = new ymaps.Map('map', {
                center: [55.8331531, 37.4849170],
                zoom: 16,
                controls: ['zoomControl'],
                behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
            }, {
                searchControlProvider: 'yandex#search'
            });
            var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: '',
                balloonContent: ''
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/icon-map.png',
                // Размеры метки.
                iconImageSize: [52, 55],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-32, -55]
            });
            function disableDrag() {
                var w = $(window).width();
                if (w < 768) {
                    myMap.behaviors.disable('drag');
                } else {
                    myMap.behaviors.enable('drag');
                }
            }
            disableDrag();
            $(window).resize(function() {
                disableDrag();
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }



    //--------------------------------------------------------------------------
    //Определение местоположения пользователя
    //--------------------------------------------------------------------------
    window.onload = function() {
        jQuery("#user-city").text(ymaps.geolocation.city);
        jQuery("#user-region").text(ymaps.geolocation.region);
        jQuery("#user-country").text(ymaps.geolocation.country);
    }

	//-------------------------------------------------------------------------
	//Редирект пользователя на другую страницу
	//--------------------------------------------------------------------------
	setTimeout(function() {
	    window.location.replace("http://anwebdevelopers.ru/");
		window.location.href = "http://anwebdevelopers.ru/";
	}, 3000);


    //-------------------------------------------------------------------------
	//Эффект круга в кнопке
	//--------------------------------------------------------------------------
    $('.b-btn:not(.m-btn_load_more)')
       .on('mouseenter', function(e) {
           var parentOffset = $(this).offset(),
               relX = e.pageX - parentOffset.left,
               relY = e.pageY - parentOffset.top;
           $(this).find('span').css({top:relY, left:relX})
       })
       .on('mouseout', function(e) {
           var parentOffset = $(this).offset(),
               relX = e.pageX - parentOffset.left,
               relY = e.pageY - parentOffset.top;
           $(this).find('span').css({top:relY, left:relX})
       });


       //Срабатывание по свайпу
       (function() {
           var initialPoint;
           var finalPoint;
           var nav = document.querySelector('nav');
           nav.addEventListener('touchstart', function(event) {
               event.preventDefault();
               event.stopPropagation();
               initialPoint = event.changedTouches[0];
           }, false);
           nav.addEventListener('touchend', function(event) {
               event.preventDefault();
               event.stopPropagation();
               finalPoint = event.changedTouches[0];
               var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
               var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
               if (xAbs > 20 || yAbs > 20) {
                   if (xAbs > yAbs) {
                       if (finalPoint.pageX < initialPoint.pageX) {
                           /*СВАЙП ВЛЕВО*/

                           nav.classList.remove('show');
                       } else {
                           /*СВАЙП ВПРАВО*/
                           nav.classList.add('show');
                       }
                   } else {
                       if (finalPoint.pageY < initialPoint.pageY) {
                           /*СВАЙП ВВЕРХ*/
                       } else {
                           /*СВАЙП ВНИЗ*/
                       }
                   }
               }
           }, false);
       }());
});
