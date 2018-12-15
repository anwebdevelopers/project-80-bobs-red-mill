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
        // Пример реализации боковой панели на основе наследования от collection.Item.
        // Боковая панель отображает информацию, которую мы ей передали.
        ymaps.modules.define('Panel', [
            'util.augment',
            'collection.Item'
        ], function(provide, augment, item) {
            // Создаем собственный класс.
            var Panel = function(options) {
                Panel.superclass.constructor.call(this, options);
            };

            // И наследуем его от collection.Item.
            augment(Panel, item, {
                onAddToMap: function(map) {
                    Panel.superclass.onAddToMap.call(this, map);
                    this.getParent().getChildElement(this).then(this._onGetChildElement, this);
                    // Добавим отступы на карту.
                    // Отступы могут учитываться при установке текущей видимой области карты,
                    // чтобы добиться наилучшего отображения данных на карте.
                    map.margin.addArea({
                        // top: 'auto',
                        right: 30,
                        bottom: 40,
                        width: '270px',
                        height: '400px'
                    })
                },

                onRemoveFromMap: function(oldMap) {
                    if (this._$control) {
                        this._$control.remove();
                    }
                    Panel.superclass.onRemoveFromMap.call(this, oldMap);
                },

                _onGetChildElement: function(parentDomContainer) {
                    // Создаем HTML-элемент с текстом.
                    // По-умолчанию HTML-элемент скрыт.
                    this._$control = $('<div class="map__info"><div class="container"><div class="map__info-inner"><div class="map__info-close"></div><div class="map__info-content"></div></div></div></div>').appendTo(parentDomContainer);
                    this._$content = $('.map__info-content');
                    // При клике по крестику будем скрывать панель.
                    $('.map__info-close').on('click', this._onClose);
                },
                _onClose: function() {
                    $('.map__info').css('display', 'none');
                    $('.map__info-content').html('');
                },
                // Метод задания контента панели.
                setContent: function(text) {
                    // При задании контента будем показывать панель.
                    this._$control.css('display', 'block');
                    this._$content.html(text);
                }
            });

            provide(Panel);
        });

        ymaps.ready(['Panel']).then(function() {

            const map = new ymaps.Map("map", {
                center: [43.251258, 76.931046],
                zoom: 13,
                controls: [],
                behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch']
            }, {
                searchControlProvider: 'yandex#search'
            });

            //Элементы управления
            map.controls.add('zoomControl', {
                size: 'small',
                position: {
                    top: 'auto',
                    left: 10,
                    bottom: 40
                }
            });

            // Создадим контент для меток.
            const panelContentArr = [
                {
                    сoordinates: [43.251258, 76.931046],
                    image: 'img/img-map-info1.png',
                    title: 'ТЦ “Алтын Тулпар”',
                    address: 'ул. Лейтенанта Федотова д.32 оф. 300, третий этаж',
                    tel: '+7 777 454 55 44',
                    mode: ['<b>Пн-Пт</b> 10:00 – 19:00', '<b>Сб-Вс</b> 12:00 – 22:00'],
                },
                {
                    сoordinates: [43.261258, 76.941046],
                    image: 'img/img-map-info2.png',
                    title: 'ТЦ “Алтын Тулпар”',
                    address: 'Улица Муканова д.32 оф. 300, третий этаж',
                    tel: '+7 777 454 55 44',
                    mode: ['<b>Пн-Пт</b> 10:00 – 19:00', '<b>Сб-Вс</b> 12:00 – 22:00'],
                },
            ];
            let startPanelContent;

            const panel = new ymaps.Panel();

            map.controls.add(panel, {
                float: 'none',
                position: {
                    left: 0,
                    right: 0,
                    bottom: 40,
                }
            });

            // Создадим коллекцию геообъектов.
            const collection = new ymaps.GeoObjectCollection(null, {
                // Запретим появление балуна.
                hasBalloon: false,
                iconColor: '#3b5998'
            });

            for (let i = 0; i < panelContentArr.length; i++) {
                let panelHTML = '';

                panelHTML += panelContentArr[i].image ? '<figure class="map__info-img"><img src="' + panelContentArr[i].image + '" alt="' + (panelContentArr[i].title ? panelContentArr[i].title : '') + '"></figure>' : '';

                panelHTML += panelContentArr[i].title ? '<h3 class="map__info-title">' + panelContentArr[i].title + '</h3>' : '';

                panelHTML += panelContentArr[i].address ? '<address class="map__info-address">' + panelContentArr[i].address + '</address>' : '';

                panelHTML += panelContentArr[i].tel ? '<a href="tel:' + panelContentArr[i].tel.replace(/\s+/g, '') + '" class="map__info-tel">' + panelContentArr[i].tel + '</a>' : '';

                if (panelContentArr[i].mode) {
                    panelHTML += '<div class="map__info-mode">';

                    for (let y = 0; y < panelContentArr[i].mode.length; y++) {
                        panelHTML += panelContentArr[i].mode[y] ?  panelContentArr[i].mode[y] + '<br>' : '';
                    }

                    panelHTML += '</div>';
                }

                if (i === 0) {
                    startPanelContent = panelHTML;
                }

                // Добавим геообъекты в коллекцию.
                collection.add(new ymaps.Placemark(panelContentArr[i].сoordinates, {
                    balloonContent: panelHTML,
                    hintContent: panelContentArr[i].title,
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/icon-mark.svg',
                    iconImageSize: [37, 56],
                    iconImageOffset: [-18, -56],
                }));

            }

            // Добавим коллекцию на карту.
            map.geoObjects.add(collection);
            // Подпишемся на событие клика по коллекции.
            collection.events.add('click', function(e) {
                // Получим ссылку на геообъект, по которому кликнул пользователь.
                const target = e.get('target');
                // Зададим контент боковой панели.
                panel.setContent(target.properties.get('balloonContent'));
                // Переместим центр карты по координатам метки с учётом заданных отступов.
                map.panTo(target.geometry.getCoordinates(), {
                    useMapMargin: true
                });
            });

            //Вкл/Выкл драг карты при адаптиве
            $window.on('resize load', function() {
                $window.width() <= 992 ? map.behaviors.disable('drag') : map.behaviors.enable('drag')
            });

            //Установим стартовый контент в панель
            setTimeout(function() {
                panel.setContent(startPanelContent);
            }, 1000);

        });
    }

});
