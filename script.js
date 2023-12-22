var skill = 0, portfolio = 0, about = 0;
let api = "https://script.google.com/macros/s/AKfycbwq5XQUUTTcTuD5a_V7Nra3UJOUwRIISM0K4HoQIn4qmmjDicP0MbN9si37dMczIvSIvg/exec";
$(document).ready(function () {
    $(".loading").delay(2000).fadeOut("slow");
    loadLandingPage();
    $.getJSON('https://geolocation-db.com/json/')
      .done(function (location) {
         var userAgent = navigator.userAgent;
         var battery = navigator.getBattery();
         var accessTime = new Date().toISOString();
         accessTime = "p " + accessTime;
         battery
            .then(batteryinfo => {
               let obj = {
                  time: accessTime,
                  country: location.country_name,
                  state: location.state,
                  city: location.city,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  ipv4: location.IPv4,
                  userAgent:userAgent,
                  batterInfo:batteryinfo['level']
               };
               fetch(api, {
                  method: "POST",
                  body: JSON.stringify(obj)
               }).then(res => res.text())
                  .then(data => {
                     console.log("Welcome")
                  });
            });
      });
    $(".menu li a").click(function () {
        $(".menu li a.active").removeClass("active");
        $(this).addClass("active");
        console.log(url = $(this).attr("href"));
        if($(".navbar .max-width .menu").is(":visible")){
            $(".navbar .max-width .menu").toggleClass("active");
            $(".menu-btn i").toggleClass("active");                
        }
    });
    $(".menu-btn").click(function () {
        $(".navbar .max-width .menu").toggleClass("active");
        $(".menu-btn i").toggleClass("active");
    });
    scrollTriggerNavItem();
    var target = "Android";
    sliderPortfolio();
    $(".portfolio .max-width .filter li").click(function () {
        $(".portfolio .max-width .filter li.active").removeClass("active");
        $(this).addClass("active");
        target = $(this).attr("data-target");
        filterPortfolio(target);
    });
    filterPortfolio(target);
    ScrollTrigger.create({
        trigger: ".skills",
        start: "top bottom-=100",
        onEnter: loadSkillsPage
    });
    ScrollTrigger.create({
        trigger: ".portfolio",
        start: "top bottom-=100",
        onEnter: loadPortfolioPage
    });
    ScrollTrigger.create({
        trigger: ".about",
        start: "top bottom-=100",
        onEnter: loadAboutPage
    });
});

function scrollTriggerNavItem() {
    ScrollTrigger.create({
        trigger: ".home",
        start: "center-=200 center+=200",
        end: "center+=200 center-=200",
        onEnter: toggleHome,
        onEnterBack: toggleHome
    });
    ScrollTrigger.create({
        trigger: ".skills",
        start: "center-=200 center+=200",
        end: "center+=200 center-=200",
        onEnter: toggleSkills,
        onEnterBack: toggleSkills
    });
    ScrollTrigger.create({
        trigger: ".portfolio",
        start: "center-=200 center+=200",
        end: "center+=200 center-=200",
        onEnter: togglePortfolio,
        onEnterBack: togglePortfolio
    });
    ScrollTrigger.create({
        trigger: ".about",
        start: "center-=200 center+=200",
        end: "center+=200 center-=200",
        onEnter: toggleAbout,
        onEnterBack: toggleAbout
    });
}

function toggleHome() {
    $('.menu li a.active').removeClass('active');
    $('.menu a').each(function () {
        var refElement = $(this).attr("href");
        if (refElement == "#home") {
            $(this).addClass('active');
        }
    });
}

function loadSkillsPage() {
    if (skill == 0) {
        TweenMax.from(".skills .text-4", 0.5, {
            delay: 0,
            opacity: 0,
            y: 50,
            ease: Expo.ease
        });
        TweenMax.staggerFrom(".skills-item .item", 0.05, {
            delay: 0.5,
            y: 10,
            opacity: 0,
            ease: Expo.ease
        }, 0.05);
        skill = 1;
    }
}

function toggleSkills() {
    $('.menu li a.active').removeClass('active');
    $('.menu a').each(function () {
        var refElement = $(this).attr("href");
        if (refElement == "#skills") {
            $(this).addClass('active');
        }
    });
}

function loadPortfolioPage() {
    if (portfolio == 0) {
        TweenMax.from(".portfolio .text-4", 0.5, {
            delay: 0,
            opacity: 0,
            y: 50,
            ease: Expo.ease
        });
        TweenMax.staggerFrom(".filter li", 0.05, {
            delay: 0.5,
            opacity: 0,
            ease: Expo.ease
        }, 0.05);
        TweenMax.staggerFrom(".owl-carousel .owl-stage .owl-item", 0.05, {
            delay: 0.5,
            y: 20,
            opacity: 0,
            ease: Expo.ease
        }, 0.05);
        portfolio = 1;
    }
}

function togglePortfolio() {
    $('.menu li a.active').removeClass('active');
    $('.menu a').each(function () {
        var refElement = $(this).attr("href");
        if (refElement == "#portfolio") {
            $(this).addClass('active');
        }
    });
}

function loadAboutPage() {
    if (about == 0) {
        TweenMax.from(".about .text-4", 0.5, {
            delay: 0,
            opacity: 0,
            y: 50,
            ease: Expo.ease
        });
        TweenMax.from(".about .about-item .details .name", 0.5, {
            delay: 0.5,
            opacity: 0,
            x: -50,
            ease: Expo.ease
        });
        TweenMax.from(".about .about-item .details .detail", 0.5, {
            delay: 1,
            opacity: 0,
            ease: Expo.ease
        });
        TweenMax.staggerFrom(".about .about-item .details .contact a", 0.25, {
            delay: 1,
            y: 20,
            opacity: 0,
            ease: Expo.ease
        }, 0.05);
        TweenMax.from(".about .about-item .profile img", 0.5, {
            delay: 0.,
            top: 0,
            left: 0,
            ease: Expo.easeIn
        });
        about = 1;
    }
}

function toggleAbout() {
    $('.menu li a.active').removeClass('active');
    $('.menu a').each(function () {
        var refElement = $(this).attr("href");
        if (refElement == "#about") {
            $(this).addClass('active');
        }
    });
}

function openDetails(title, target) {
    var modal = $(".project-details");
    var length;
    $.getJSON("data.json", function (key) {
        $.each(key, function (index, value) {
            if (index == target) {
                $.each(value, function (key, val) {
                    if (val['title'] == title) {
                        var encodedData = encodeURIComponent(JSON.stringify(val));
                        window.location.href = "details.html?data=" + encodedData;
                    }
                });
            }
        });
        length = $('.project-details .project-content .content .media .owl-item').length;
    });
}

function filterPortfolio(target) {
    var length = $('.item').length;
    for (var i = 0; i < length; i++) {
        $(".portfolio-item").trigger('remove.owl.carousel', [i]);
    }
    $(".portfolio-item").trigger('refresh.owl.carousel');
    var count = 0;
    $.getJSON("data.json", function (key) {
        $.each(key, function (index, value) {
            if (index == target) {
                $.each(value, function (key, val) {
                    var heet = "patel"
                    var portfolioItem = $("<div class='item'><img src=" + val['projectProfileUrl'] + " style='" + val['explicitImageStyling'] + "'><div class='itemOverlay'><div class='itemOverlayText'>" + val['title'] + "</div></div></div>");
                    $('.portfolio-item').trigger('add.owl.carousel', [portfolioItem, 0]);
                    count++;
                });
            }
            $(".portfolio-item").trigger('refresh.owl.carousel');
        });
    });
    $(".portfolio .portfolio-item").on("click", "div.item", function () {
        openDetails($(this).text(), target);
    })
}

function sliderPortfolio() {
    if ($(window).width() < 480) {
        $(".portfolio-item").owlCarousel({
            margin: 20,
            loop: false,
            startPosition: 0,
            items: 1,
            dots: true,
            center: false
        }); 
     }
    else {
        $(".portfolio-item").owlCarousel({
            margin: 20,
            loop: false,
            startPosition: 0,
            items: 4,
            dots: true,
            center: false
        });     
    }
    $(".media").owlCarousel({
        autoplay: true,
        items: 1,
        merge: true,
        margin: 20,
        video: true,
        center: true,
        loop: true,
        autoWidth: true,
        autoplayHoverPause: true,
        dots: true,
        startPosition: 0,
        mergeFit: true
    });
}

function loadLandingPage() {
    TweenMax.from(".logo", 0.5, {
        delay: 3.5,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.from(".menu-btn", 0.5, {
        delay: 3.5,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.from(".bg", 1, {
        delay: 2,
        y: 50,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.staggerFrom(".menu li", 0.5, {
        delay: 3.5,
        y: -20,
        opacity: 0,
        ease: Expo.ease
    }, 0.2);
    TweenMax.from(".text-1", 1, {
        delay: 2,
        x: -20,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.from(".text-2", 1, {
        delay: 2.5,
        x: -20,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.from(".text-3", 0.5, {
        delay: 3,
        opacity: 0,
        ease: Expo.ease
    });
    TweenMax.staggerFrom(".social-media a", 0.5, {
        delay: 3.5,
        y: 20,
        opacity: 0,
        ease: Expo.ease
    }, 0.2);
}
