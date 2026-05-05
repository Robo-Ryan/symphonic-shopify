/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */

document.addEventListener('cart:updated', function(event) {
    var cart = event.detail.cart; // Get the updated content of the cart
    var cart_count = document.getElementById('cart-count').dataset.count = cart.item_count;
});


var stopTicker = false;
function initSliderNav(flkty, paginationBtns, prevClass, wrap, hasTicker) {
    
    for (var i = 0; i < paginationBtns.length; i++) {
        var btn = paginationBtns[i];
        if (btn.classList.contains(prevClass)) {           
            btn.addEventListener('click', function() {
                if (hasTicker) {
                    stopTicker = true;
                }
                if (flkty.selectedIndex > 0 || wrap) {
                    flkty.previous(true);
                }
            });   
        } else {
            btn.addEventListener('click', function() {
                if (hasTicker) {
                    stopTicker = true;
                }
                if (flkty.selectedIndex < (flkty.slides.length - 1) || wrap) {
                    flkty.next(true);
                }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    
    
    var featuredCarouselSlider = document.querySelector('.featured-carousel__slider');
    if ( document.body.contains(featuredCarouselSlider) ) {
        var flkty = new Flickity( featuredCarouselSlider, {
        // options
        contain: true,
        prevNextButtons: true,
        pageDots: false,
        arrowShape: { 
            x0: 10,
            x1: 55, y1: 45,
            x2: 60, y2: 40,
            x3: 20
        },
            selectedAttraction: 0.035,
            friction: 0.8
        });

        var carousel_tabs = document.querySelectorAll('.featured-carousel__tab');

        flkty.on( 'select', function( index ) {
            for (var i = 0; i < carousel_tabs.length; i++) {
                carousel_tabs[i].classList.remove('featured-carousel__tab--active');
            }
            carousel_tabs[index].classList.add('featured-carousel__tab--active');
        });

        for (var i = 0; i < carousel_tabs.length; i++) {
            carousel_tabs[i].addEventListener('click', function() {
                var index = this.dataset.tab;
                flkty.select( index );
            });
        }
    }

    var featuredProductSlider = document.querySelector('.featured-products__slider');
    if ( document.body.contains(featuredProductSlider) ) {
        var flkty1 = new Flickity( featuredProductSlider, {
        // options
        contain: true,
        prevNextButtons: true,
        pageDots: false,
        prevNextButtons: false,
        wrapAround: true,
        percentPosition: true,
        cellAlign: 'left',
        selectedAttraction: 0.035,
        friction: 0.8
});
        var paginationBtns = document.querySelectorAll('.featured-products__pagination-btn');
        initSliderNav(flkty1, paginationBtns, 'featured-products__pagination-btn--prev', true, true);

        var tickerAmount = .25;
        var _updateTicker = function() {
            if (!stopTicker) {
                flkty1.x = (flkty1.x - tickerAmount) % flkty1.slideableWidth;
                flkty1.selectedIndex = flkty1.dragEndRestingSelect();
                flkty1.updateSelectedSlide();
                flkty1.settle(flkty1.x);
                window.requestAnimationFrame(_updateTicker);
            }
          };
          _updateTicker();
    }

    var resultsSliderElem = document.querySelector('.product-results-carousel__slider');
    if ( document.body.contains(resultsSliderElem) ) {
        var flktyr = new Flickity( resultsSliderElem, {
            // options
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            selectedAttraction: 0.035,
            friction: 0.8
        });
        var paginationBtns = document.querySelectorAll('.product-results-carousel__pagination-btn');
        initSliderNav(flktyr, paginationBtns, 'product-results-carousel__pagination-btn--prev', false, false);
    }

    var featuredBlocksSlider = document.querySelector('.featured-blocks__slider');
    if ( document.body.contains(featuredBlocksSlider) ) {
        var flkty2 = new Flickity( featuredBlocksSlider, {
            // options
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            selectedAttraction: 0.035,
            friction: 0.8
        });
        var paginationBtns = document.querySelectorAll('.featured-blocks__pagination-btn');
        initSliderNav(flkty2, paginationBtns, 'featured-blocks__pagination-btn--prev', false, false);

    }

    var infoSlider = document.querySelector('.info-carousel__slider');
    if ( document.body.contains(infoSlider) ) {

        var flktyInfo = new Flickity( infoSlider, {
            // options
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            cellAlign: 'left',
            selectedAttraction: 0.035,
            friction: 0.8
        });
        var paginationBtns = document.querySelectorAll('.info-carousel__pagination-btn');
        initSliderNav(flktyInfo, paginationBtns, 'info-carousel__pagination-btn--prev', false, false);

    }

    var relatedArticles = document.querySelector('.article-list--related');
    if ( document.body.contains(relatedArticles) ) {
        var flktyInfo = new Flickity( relatedArticles, {
            // options
            contain: true,
            prevNextButtons: false,
            pageDots: false,
            cellAlign: 'left',
            watchCSS: true,
            selectedAttraction: 0.035,
            friction: 0.8
        });
        var paginationBtns = document.querySelectorAll('.related-articles__pagination-btn');
        initSliderNav(flktyInfo, paginationBtns, 'related-articles__pagination-btn--prev', false, false);
    }

    var rellax = new Rellax('.rellax');

    var animateText = document.querySelector('.text_to_animate');

    if ( document.body.contains(animateText) ) {
        animateText.classList.add('animate');
    // set animate_letters() options
var Animate_letters_options = {

    // add class(es) list 'class_1 class_2' or ''
    prepare : 'letters_in_top',
    // classes to add by phases
    // set : []  |  ['class_a']  |  ['class_a','class_b']
    add : [
      // phase 1
      [],
      // phase 2
      [],
      // phase 3
      [],
      // phase 4
      []
    ],
    // classes to remove by phases arrays of classes
    // set : []  |  ['class_a']  |  ['class_a','class_b']
    remove : [
      // phase 1
      ['letters_in_top'],
      // phase 2
      [],
      // phase 3
      [],
      // phase 4
      []
    ],
    // timers by phases -> array of objects
    // set : { delay : [integer in milliseconds],
    //  			 increment_delay : [integer in milliseconds]  }
    timers : [
      { delay : 0, increment_delay : 25 },  // phase 1
      { delay : 100, increment_delay : 40 },  // phase 2
      { delay : 80, increment_delay : 30 },  // phase 3
      { delay : 0, increment_delay : 20 }   // phase 4
    ],
    // remove spans who wrapped letters at the end of last phase
    // set : true / false
    clean_after : true,
    // function to launch at the end of the last phase
    // set : your_function() or null
    end_callBack : function(){
  
      // sibling text container
      var container_text = document.querySelector('.text_to_animate');
  
      // add a class
      container_text.classList.add('callback_anim');
  
      // remove after n seconds
      var Timer = setTimeout(()=>{
  
          container_text.classList.remove('callback_anim');
  
          clearTimeout( Timer );
  
      }, 800 );
    }
  
  };
  // end animate_letters() options

  var letters = animate_letters( '.text_to_animate' , Animate_letters_options );

  letters.run();


  
}

    var multiLineAnimateText = document.querySelector('.text_to_animate--multi-line');

    if ( document.body.contains(multiLineAnimateText) ) {
        multiline_animate_letters('.text_to_animate--multi-line');
    }

    var popupCtas = document.querySelectorAll('.pop-up-cta');

    popupCtas.forEach(element => {
        element.onclick = function(e) {
            e.preventDefault();
            /*var url = '/pages/retinol-vitamin-c-ingredients';
            var newwindow = window.open(url,'name','height=275,width=500');
            if (window.focus) {newwindow.focus()}*/

            var popup_id = 'tp-' + element.hash.replace('#', '');
            var heading = element.dataset.heading;
            var key = element.dataset.key;
            var url = '';
            if (key == 'retinol-ingredients') {
                url = '/pages/retinol-vitamin-c-ingredients?view=ajax';
            }
            if (url.length) {
                fetch(url)
                    .then(function(response) {
                        // When the page is loaded convert it to text
                        return response.text()
                    })
                    .then(function(popupcopy) {
                        var markup = `<div class="tp-popup-bg" onclick="closePopup('${popup_id}');"></div>
                        <div class="tp-popup">
                            <div class="tp-popup-box">
                            <button class="tp-close-popup" onclick="closePopup('${popup_id}');">×</button>
                            <div class="tp-popup-content">
                                <img class="tp-popup-logo" src="//symphonic-md.myshopify.com/cdn/shop/files/symphonic-md-logo_380x.svg?v=1690388636" alt="Symphonic M.D." />
                                <h3 class="s4">${heading}</h3>
                                <p>${popupcopy}</p>
                            </div>
                            </div>
                        </div>`;
                        var container = document.createElement('div');
                        container.setAttribute('id', popup_id);
                        container.innerHTML = markup;
                        document.body.appendChild(container);
                        setTimeout(function() {
                            document.body.classList.add('tp-popup-open');
                        }, 50);
                    });
            }
        }
    });

});

function closePopup(popup_id) {
    document.body.classList.remove('tp-popup-open');
    setTimeout(function() {
        document.getElementById(popup_id).remove();
    }, 400);
}


document.addEventListener("DOMContentLoaded", function() {
    var partnerLink = document.querySelector("a[href='#partner-signup']");
    
    function openKlear() {
        klrRecruit.openRecruit();
    }
    
    if (partnerLink) {
        partnerLink.addEventListener("click", function(event) {
          event.preventDefault();
          openKlear();
        });
    }

    setTimeout(function() {
        if (window.location.hash === '#partner-signup') {
          openKlear();
        }
    }, 1500);
});
