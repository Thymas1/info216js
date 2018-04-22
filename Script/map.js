var map;
function initMap() {
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=*';
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(65.162607, 13.070771)
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    for(var x in ladestasjon) {
        var ladestasjon = ladestasjon[x];
        var location = new google.maps.LatLng(url.Latitude, url.Longitude);
        var marker = new google.maps.Marker({
            position: location,
            title: url.AddressInfo.Title,
            map: map
        });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);