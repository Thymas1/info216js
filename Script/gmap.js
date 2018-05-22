function initMap() {
    //XHR for innhenting av koordinater.
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        xhr.Data = JSON.parse(this.response);
        //Lager kartet, og sentrerer kartet over Norge.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 60.391011,
                lng: 5.325950
            },
            zoom: 6
        });
        if (this.status === 200) {
            //Henter ut latitude og longitude fra API og plasserer markers.
            xhr.Data.forEach(poi => {
                var latLng = new google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,

            });
            //Lager et infovindu til marker som kommer opp når det klikkes på
            var infowindow = new google.maps.InfoWindow({
                content: 'Navn:' + ' ' + poi.AddressInfo.Title + '<br>' +
                'Addresse: ' + ' ' + poi.AddressInfo.AddressLine1 + '<br>' + poi.ID> Se mer informasjon</a>'

            });



            var infoWind = new google.maps.InfoWindow;
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    infoWind.setPosition(pos);
                    infoWind.setContent('Her er du');
                    infoWind.open(map);
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWind, map.getCenter());
                });

            } else {
                handleLocationError(false, infoWind, map.getCenter());
            }

            function handleLocationError(browserHasGeolocation, infoWind, pos) {
                infoWind.setPosition(pos);
                infoWind.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
                infoWind.open(map);
            }


        })
        }
    }
    xhr.send();

}

initMap()


