$('nav').toggleClass('scrolled' , window.scrollY >= 10);

new WOW({
    animateClass: 'animate__animated'
}).init();

let popupLanguages ;

// fetch('https://semicode.tech/api/v1/l10nhouse/services').then(function(res){
//     return res.json()
// }).then(function (data) {
//     console.log(data)
//   })

let services = null;

(async function() {
    let res = await fetch('https://semicode.tech/api/v1/l10nhouse/services');

    services = await res.json();

    let i = 0;

    for(let service of services){
        $("#Services .row").append(
            `<div class="col-lg-6 col-md-6 wow ${((i+1) % 2 == 0) ? 'animate__fadeInRight' : 'animate__fadeInLeft'}" data-wow-delay="${i * 0.2}s">
                <div class="item text-center box">
                    <img src="images/${service.icon}" alt="firstServices">
                    <h4 class="py-3 mb-0 fs-5 fw-semibold">${service.title}</h4>
                    <p>${prepareDescription(service.description.slice(0,150))}... <a class="firstColor text-decoration-none" onclick='showService(${i})'>Read More</a></p>
                </div>
            </div>`)
        i++;    
    }
})() 

$(".popup .box").click(function(e){
    e.stopPropagation();
})

$('.nav-link').on('click' , function(e){
    e.preventDefault();

    let sectionId = $(this).attr('href'),
    $section = $(sectionId),
    $sectionTop = $section.offset().top,
    $sectionBottom = $sectionTop + $section.outerHeight(true),
    navHeight = $('nav').outerHeight(true);

    targetScrollY = $sectionTop - navHeight;

    window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
    })
});

$(window).scroll(function(e){
    $('nav').toggleClass('scrolled' , window.scrollY >= 10);
    let $sections = $('section[id] , header');
    
    $sections.each(function(index , section){
        let $section = $(section),
        $sectionId = $section.attr('id'),
        $sectionTop = $section.offset().top,
        $sectionBottom = $sectionTop + $section.outerHeight(true),
        navHeight =$('nav').outerHeight(true) ,
        scrollY = window.scrollY + navHeight + (20);
        
        if(scrollY > $sectionTop && scrollY < $sectionBottom){
            $(`.nav-link.active`).removeClass('active')
            $(`.nav-link[href='#${$sectionId}']`).addClass('active')
        }
        
        if($section.attr('id') == 'Home'){
            let $link = $('.top'),
            $linkTop = $link.offset().top,
            $linkBottom = $linkTop + $link.outerHeight(true) + 16;
            if($linkBottom > $sectionBottom){
                $link.addClass('visible')
            }else{
                $link.removeClass('visible')   
            }
             
        }
    });
    
});


(async function() {
    let res = await fetch('https://semicode.tech/api/v1/l10nhouse/sectors');

    let sectors = await res.json();

    let i = 0;

    for(let sector of sectors){
        $(".popup[data-popup-name='sectors'] .row").append(
            `<div class="col-lg-3 col-md-6 part">
                <div class="item text-center rounded-3 p-3">
                    <img src="images/sec/${sector.icon}" class="mb-3" alt="image sector">
                    <p class="mb-0">${sector.name}</p>
                </div>
            </div>`)
        i++;    
    }
})();

(async function() {
    let res = await fetch('https://semicode.tech/api/v1/l10nhouse/languages');

    let languages = await res.json();
    console.log(languages)

    let i = 0;

    for(let language of languages){
        $(".popup[data-popup-name='languages'] .body").append(
            `<div class="section">
                    <h3>${language.continent}</h3>
                    <ul class="list-unstyled">
                        ${prepareLanguages(language.languages)}
                    </ul>
             </div>`)
        i++;    
    }
})();

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 5,
    margin: 10,
    loop: true,
    autoplay: true,
    autoplayTimeout : 2000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            slideBy: 1
        },
        450: {
            items: 2,
            slideBy: 2
        },
        650: {
            items: 3,
            slideBy: 3
        },
        850: {
            items: 4,
            slideBy: 4
        },
        1050: {
            items: 5,
            slideBy: 5
        },
        1250: {
            items: 5,
            slideBy: 5
        },
    },
  });
});

$(window).on('load' , function(){
    $('body').css('overflow', 'hidden');
    $('.loading-page').fadeOut(2500, function(){
        $('body').css('overflow', 'auto')
    }
        
    )
})