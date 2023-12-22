$(document).ready(function () {
    $(".loading").delay(2000).fadeOut("slow");
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var encodedData = urlParams.get('data');
    var decodedData = JSON.parse(decodeURIComponent(encodedData));

    console.log(decodedData);

    $('.bg').css('background-image', 'url(' + decodedData.projectProfileUrl + ')');
    $('.title').text(decodedData.title)
    $('.detail').text(decodedData.description)

    var icon = decodedData.projectDataUrlSource;
    if (icon != 'none') {
        $(".link").append("<a href=" + decodedData.projectDataUrl + "><i class='" + icon + "'></i></a>");
    }

    $(".owl-carousel").owlCarousel({
        autoplay: false,
        items: 1,
        margin: 20,
        video: true,
        center: true,
        loop: true,
        autoWidth: true,
        autoplayHoverPause: true,
        dots: true,
        nav: true,
        startPosition: 0,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    $.each(decodedData.projectMediaUrls, function (index, value) {
        var link = value.split("@")
        var thumbnail = decodedData.projectThumbnailUrls[index];
        if (link[0] == 'p') {
            var mediaItem = $("<div class='item'><a href='" + link[1] + "' class='lightbox-link img'><img src='" + thumbnail + "'></a></div>");
        } else {
            var mediaItem = $("<div class='item'><a href='" + link[1] + "' class='lightbox-link video' crossorigin='anonymous'><img src='" + thumbnail + "'></a></div>");
        }
        $('#media-item').trigger('add.owl.carousel', [mediaItem, 0]);
    });
    $('#media-item').trigger('refresh.owl.carousel');


    $(".lightbox-link").magnificPopup({
        type: "iframe",
        gallery: {
            enabled: false,
        },
        callbacks: {
            elementParse: function (item) {
                if (item.el[0].className.split(" ")[1] == 'video') {
                    item.type = 'iframe'
                } else {
                    item.type = 'image'
                }

            }
        }
    });
});
