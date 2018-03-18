/*!
 * @version 0.0.1
 * @package jquery.onepage.scroll
 * @copyright © 2014 TRX-Webdesign, All rights reserved. http://www.trx-webdesign.de
 * @license GNU General Public License http://www.gnu.org/licenses/gpl-3.0.html
 * @author Timo Gelhard
 */

/** <div class="caller">
 *     <div class="sectionSelector" id="..." data-label="..."></div>
 * </div>
 */

(function ($, window, undefined) {
    'use strict';

    $.fn.extend({

        onePageScroll: function (_options) {

            var defaults = {

                //Auswahl Selector für Scroll Elemente
                sectionSelector: null,

                //Abstand vom ersten Element zum 'body' top
                topMargin: 50,

                //Abstand vom ersten Element zum 'body' top durch übergebenes Element
                topElement: null,

                //Abstand Top zusätzlich
                offsetAktiv: 10,

                //Position 'left' oder 'right'
                position: 'right',

                //Empty Content: create navigation button on empty content
                emptyContent: false,

                //Easing
                ease: 'easeInOutQuart',

                //Animation Dauer
                animationDuration: 1000,

                //Animation Verzögerung
                animationDelay: 0,

                //Tasten Navigation
                keyNavigation: true,

                //Tooltip anzeigen
                tooltip: true,

                //Tooltip Selektor
                tooltipSelector: '',

                //Background Color
                tooltipColor: '#ffffff',

                //Background Tooltip
                tooltipBackground: 'rgba(0,0,0,0.8)',

                //Rahmen Navigation
                borderNavigation: '1px solid rgba(0,0,0,0.2)',

                //Background Navigation
                background: 'rgba(80,80,80,0.6)',

                //Border-Radius Navigation
                borderRadius: 10,

                //NavigationItem Breite
                naviItemWidth: 40,

                //NavigationItem Höhe
                naviItemHeight: 30,

                //Button Farbe
                buttonColor: '#C2C2C2',

                //Button Aktiv Farbe
                buttonColorAktiv: '#ffffff',

                //Button Größe
                buttonSize: 16,

                //Button Rahmen Farbe
                buttonBorder: '1px solid #ADADAD',

                //Button Border-Radius
                buttonBorderRadius: 6

            };

            var options = $.extend(defaults, _options);

            var $win = $(window),
                $doc = $(document),
                $body = $('body');

            return this.each(function () {
                var opt = options,
                    obj = this,
                    scrollTopMarker = (opt.topElement !== null) ? opt.topElement.height() : opt.topMargin,
                    position = (opt.position === 'right') ? 'right' : 'left';

                //Settings Error
                if ((opt.buttonSize + 4) > opt.naviItemWidth || (opt.buttonSize + 4) > opt.naviItemHeight) {
                    console.log('The "button" is bigger then the "navi-item"');
                }

                //Create Navigation Container
                $body.append('' +
                '<div class="scroll-navigation-container">' +
                '</div>' +
                '');
                var $scrollNavigationContainer = $('.scroll-navigation-container');

                //switch Position Class
                $scrollNavigationContainer.addClass(position);

                //append Buttons
                $.each(opt.sectionSelector, function (q) {
                    if($.trim($(this).html()) !== '' || ($.trim($(this).html()) === '' && opt.emptyContent === true)) {
                        if (!$(this).attr('id')) {
                            console.log('The Element with Index: ' + q + ' has no id="". It is required to scroll to Element');
                        }

                        var tooltip = '',
                            tooltipText;
                        if (opt.tooltip === true) {
                            tooltipText = '';
                            if (opt.tooltipSelector !== '') {
                                if ($(this).find(opt.tooltipSelector).length) {
                                    if ($(this).find(opt.tooltipSelector)) {
                                        tooltipText = $(this).find(opt.tooltipSelector).html();
                                    }
                                }
                            } else if ($(this).data('title')) {
                                tooltipText = $(this).data('title');
                            }
                            if (tooltipText !== '') {
                                tooltip = '<div class="navi-tooltip">' + tooltipText + '</div>';
                            }
                        }

                        $scrollNavigationContainer.append('' +
                        '<div class="navi-item">' + tooltip +
                        '<button class="button-circle" type="button" data-scroll-to="' + $(this).attr('id') + '"></button>' +
                        '</div>' +
                        '');
                    }
                });

                //sez Item-Vars
                var $naviItem = $('.navi-item'),
                    $button = $('.navi-item button'),
                    $tooltip = $('.navi-tooltip');

                //Animation Up Down
                var animation = function (element) {
                    $('html,body').delay(opt.animationDelay).animate({
                        scrollTop: element.offset().top - scrollTopMarker
                    }, opt.animationDuration, opt.ease);
                };

                if (opt.tooltip === true) {
                    //Button Hover for Tooltip
                    if(!checkDevice.touch()) {
                        $button.hover(function () {
                            $(this).prev().fadeIn(200);
                        }, function () {
                            $(this).prev().fadeOut(50);
                        });
                    }
                }

                //On Button Click
                $button.click(function () {
                    var $element = $(this).data('scroll-to');
                    animation($('#' + $element));
                    $(this).prev().fadeOut(50);
                    return false;
                });


                //set NavigationContainer Position from Top
                var setCSS = function () {

                    //set Background and Border for Container
                    var background;
                    if(checkDevice.ie9before()){
                        background = '#2E2E2E';
                    } else {
                        background = opt.background;
                    }
                    $scrollNavigationContainer.css({
                        padding: '10px 0',
                        position: 'fixed',
                        background: background,
                        boxSizing: 'border-box',
                        height: 'auto'
                    });

                    //set NaviItem Size Default for outerheight-referenz-value
                    $naviItem.css({
                        width: opt.naviItemWidth,
                        height: opt.naviItemHeight
                    });

                    //set Button Style
                    $button.css({
                        width: opt.buttonSize,
                        height: opt.buttonSize,
                        borderRadius: opt.buttonBorderRadius,
                        background: opt.buttonColor,
                        border: opt.buttonBorder
                    });

                    //set Tooltip Style
                    var tooltipColor;
                    var tooltipBackground;
                    if(checkDevice.ie9before()){
                        tooltipColor = '#ffffff';
                        tooltipBackground = '#2e2e2e';
                    } else {
                        tooltipColor = opt.tooltipColor;
                        tooltipBackground = opt.tooltipBackground;
                    }
                    $tooltip.css({
                        right: opt.naviItemWidth + 6,
                        color: tooltipColor,
                        background: tooltipBackground
                    });

                    //Switch CSS if outerheight from Navigation Container > Window.height
                    if ($scrollNavigationContainer.outerHeight() > $win.height()) {

                        //set NaviItem Size Responsive
                        $naviItem.css({
                            width: opt.naviItemWidth,
                            height: ($win.height() - 20) / opt.sectionSelector.length
                        });

                        //set CSS Button Responsive
                        $button.css({
                            marginTop: ($naviItem.height() - (opt.buttonSize + parseInt($button.css('border-left-width'), 10) * 2)) / 2,
                            marginLeft: (opt.naviItemWidth - (opt.buttonSize + parseInt($button.css('border-left-width'), 10) * 2)) / 2
                        });
                        //set CSS Navigation Container
                        $scrollNavigationContainer.css({
                            top: 0,
                            height: '100%',
                            border: opt.borderNavigation,
                            borderTop: 'none',
                            borderBottom: 'none',
                            borderRadius: 0
                        });
                        if (opt.position === 'right') {
                            $scrollNavigationContainer.css({
                                borderRight: 'none'
                            });
                        } else {
                            $scrollNavigationContainer.css({
                                borderLeft: 'none'
                            });
                        }

                    } else {

                        //set NaviItem Size Default
                        $naviItem.css({
                            width: opt.naviItemWidth,
                            height: opt.naviItemHeight
                        });

                        //set Button Position Default
                        $button.css({
                            marginTop: (opt.naviItemHeight - (opt.buttonSize + parseInt($button.css('border-left-width'), 10) * 2)) / 2,
                            marginLeft: (opt.naviItemWidth - (opt.buttonSize + parseInt($button.css('border-left-width'), 10) * 2)) / 2
                        });

                        //set CSS Navigation Container
                        $scrollNavigationContainer.css({
                            top: ($win.height() - $scrollNavigationContainer.outerHeight()) / 2,
                            border: opt.borderNavigation,
                            borderTop: opt.borderNavigation,
                            borderBottom: opt.borderNavigation
                        });
                        if (opt.position === 'right') {
                            $scrollNavigationContainer.css({
                                borderRadius: opt.borderRadius + 'px 0 0 ' + opt.borderRadius + 'px',
                                borderRight: 'none'
                            });
                        } else {
                            $scrollNavigationContainer.css({
                                borderRadius: '0 ' + opt.borderRadius + 'px ' + opt.borderRadius + 'px ' + '0',
                                borderLeft: 'none'
                            });
                        }
                    }
                };
                setCSS();

                var aktivSection;

                //set Aktiv Style for Button
                var setStyle = function (id) {
                    $button.css({background: opt.buttonColor}).removeClass('buttonAktiv');
                    $('[data-scroll-to="' + id + '"]').css({background: opt.buttonColorAktiv}).addClass('buttonAktiv');
                    aktivSection = id;
                };


                //detect Scroll and call setStyle
                var detectScroll = function () {
                    $.each(opt.sectionSelector, function () {
                        if ($win.scrollTop() === 0) {
                            setStyle(opt.sectionSelector.first().attr('id'));
                        } else if ($win.scrollTop() >= ($doc.height() - $win.height())) {
                            setStyle(opt.sectionSelector.last().attr('id'));
                        } else if (
                            $win.scrollTop() > $(this).offset().top - scrollTopMarker - opt.offsetAktiv &&
                            $win.scrollTop() < $(this).offset().top + $(this).outerHeight() - scrollTopMarker - opt.offsetAktiv
                        ) {
                            setStyle($(this).attr('id'));
                        }
                    });
                };
                detectScroll();

                $win.scroll(function () {
                    detectScroll();
                });

                $win.resize(function () {
                    setCSS();
                });

                //set KeyNavigation
                if (opt.keyNavigation === true) {
                    $doc.keydown(function (e) {
                        if (e.keyCode === 33 || e.keyCode === 34) {
                            if (e.keyCode === 33) {
                                if (aktivSection !== opt.sectionSelector.first().attr('id')) {
                                    animation($('#' + aktivSection).prev());
                                }
                            } else {
                                if (aktivSection !== opt.sectionSelector.last().attr('id')) {
                                    animation($('#' + aktivSection).next());
                                }
                            }
                            return false;
                        }
                    });
                }

            });
        }
    });

    $.fn.extend({

        onePageScrollDestroy: function (_options) {

            var defaults = {};

            var options = $.extend(defaults, _options);

            var $button = $('.navi-item button');

            $button.unbind();

            $('.scroll-navigation-container').remove();
        }

    });

})(jQuery, window);

/**
 * checkMedia
 * Device, Betriebssystem, Mobile, Tablet prüfen
 */
var checkDevice = (function () {
    'use strict';
    return {
        android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        androidPhone: function () {
            return navigator.userAgent.match(/Android.+Mobile/i);
        },
        androidTablet: function () {
            return (checkDevice.android() && !checkDevice.androidPhone());
        },
        blackberry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPhone: function () {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPod: function () {
            return navigator.userAgent.match(/iPod/i);
        },
        iPad: function () {
            return navigator.userAgent.match(/iPad/i);
        },
        iOS: function () {
            return (checkDevice.iPhone() || checkDevice.iPod() || checkDevice.iPad());
        },
        opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        windowsPhone: function () {
            return navigator.userAgent.match(/IEios/i);
        },
        touch: function () {
            return (checkDevice.android() || checkDevice.blackberry() || checkDevice.iOS() || checkDevice.opera() || checkDevice.windowsPhone());
        },
        tablet: function () {
            return (checkDevice.iPad() || checkDevice.androidTablet());
        },
        mobile: function () {
            return (checkDevice.touch() && !checkDevice.tablet());
        },
        safari: function () {
            return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        },
        ie6: function () {
            return navigator.userAgent.match(/MSIE\s6/i);
        },
        ie7: function () {
            return navigator.userAgent.match(/MSIE\s7/i);
        },
        ie8: function () {
            return navigator.userAgent.match(/MSIE\s8/i);
        },
        ie9: function () {
            return navigator.userAgent.match(/MSIE\s9/i);
        },
        ie10: function(){
            return navigator.userAgent.match(/MSIE\s10/i);
        },
        ie9before: function () {
            return (checkDevice.ie8() || checkDevice.ie7() || checkDevice.ie6());
        },
        ie10before: function () {
            return (checkDevice.ie9before() || checkDevice.ie9());
        },
        ie9After: function (){
            return (checkDevice.ie10() || checkDevice.ie9() || navigator.userAgent.match(/Trident\/[7-9].[0-9]/i));
        }
    };
})();

/**
 * Media Querys prüfen und Ausgabe der Größe als
 * xs, sm, md, lg oder true|false bei Einzelprüfung
 *
 * Aufruf mit:
 * checkMedia.xs()
 * checkMedia.size()
 */
var checkMedia = (function () {
    'use strict';
    return {
        xxs: function () {
            return matchMedia('only screen and (max-width: 480px)').matches;
        },
        xs: function () {
            return matchMedia('only screen and (max-width: 767px)').matches;
        },
        sm: function () {
            return matchMedia('only screen and (min-width: 768px) and (max-width: 991px)').matches;
        },
        md: function () {
            return matchMedia('only screen and (min-width: 992px) and (max-width: 1199px)').matches;
        },
        lg: function () {
            return matchMedia('only screen and (min-width: 1200px)').matches;
        },
        xlg: function(){
            return matchMedia('only screen and (min-width: 1400px)').matches;
        },
        size: function () {
            if (matchMedia('only screen and (max-width: 767px)').matches) {
                return 'xs';
            }
            if (matchMedia('only screen and (min-width: 768px) and (max-width: 991px)').matches) {
                return 'sm';
            }
            if (matchMedia('only screen and (min-width: 992px) and (max-width: 1199px)').matches) {
                return 'md';
            }
            if (matchMedia('only screen and (min-width: 1200px)').matches) {
                return 'lg';
            }
        }
    };
})();
