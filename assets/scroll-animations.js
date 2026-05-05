// Image Scale on Scroll
gsap.registerPlugin(ScrollTrigger) 

let footerGsap = gsap.to('.footer', {
  scrollTrigger: {
    trigger: '#main',
    scrub: true,
    start: "bottom 90%",
    end: "bottom 40%",
    // markers: true,
  },
  opacity: 1,
})

let scaleOnScrollElement = document.querySelectorAll(".gsap-banner-scale");

scaleOnScrollElement.forEach((element) => {
  let nextElement = element.nextElementSibling;

  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: "-=100 top",
      end: "80% top",
      //markers: true,
      onLeave: function() {
        footerGsap.scrollTrigger.refresh();
      }
    },
    scale: 0,
    //height: 0,

  });
});

gsap.to('.icon--animate-from-right', {
  scrollTrigger: {
    trigger: '.smd-manifesto',
    scrub: true,
    start: "0 top",
    end: "+=35% center",
    //markers: true
  },
  translateX: 0

});

gsap.to('.icon--multi-image-hero', {
  scrollTrigger: {
    trigger: '.smd-multi-image-hero',
    scrub: true,
    start: "-=100 top",
    end: "bottom center",
    //markers: true
  },
  scale: 1

});

gsap.to('.branded-headline', {
    scrollTrigger: {
      trigger: '.smd-branded-headline',
      scrub: true,
      start: "-=200 center",
      end: "bottom center",

    },
    scale: 1,

});

gsap.to('.journal-icon', {
  scrollTrigger: {
    trigger: '.journal-icon',
    scrub: true,
    start: "-=200 center",
    end: "bottom center",

  },
  scale: 1,

});

var blogImgs = document.querySelectorAll('.article__content .rte > div[style="text-align: right;"]');

  blogImgs.forEach((element) => { 
    var icon = document.createElement("div");
    icon.classList.add('blog-img-brand-icon');
    element.appendChild(icon);

    gsap.to(icon, {
      scrollTrigger: {
        trigger: element,
        scrub: true,
        start: "-=200 center",
        end: "bottom center",
  
      },
      scale: 1,
  
    });
  });


var multiLineAnimateText = document.querySelector('.text_to_animate--multi-line');

if ( document.body.contains(multiLineAnimateText) ) {
    multiline_animate_letters('.text_to_animate--multi-line');
}
if (window.innerWidth > 741) {
  gsap.to('.gsap-plp-slideIn', {
    scrollTrigger: {  
      trigger: '.shopify-section--collection-banner',
      start: "0 top",
      end: "100% 15%",
      scrub: true,
      //markers: true
    },
    right: "+=19%"
  });
  
  var plptl = gsap.timeline({
    scrollTrigger: {  
      trigger: '.shopify-section--collection-banner',
      start: "0 top",
      end: "100% 10%",
      scrub: true,
      //markers: true
    }
  })
  
  plptl.to('.shopify-section--main-collection .product-card:last-child', {rotate: '-20deg', duration: 1}, 0)
  .to('.shopify-section--main-collection .product-card:last-child', {rotate: '0deg', duration: 1}, ">");
}

gsap.to('.product-card__feature-logo-content', {
  scrollTrigger: {
    trigger: '.product-card__feature-logo',
    scrub: false,
        start: "-=200 center",
        end: "bottom center",
    markers: false
  },
  translateY: 0,
  opacity: 1

});
