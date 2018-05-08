
function initMap() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=50';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        xhr.Data = JSON.parse(this.response);

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 60.391011,
                lng: 5.325950
            },
            zoom: 6
        });
        if (this.status == 200) {
            xhr.Data.forEach(poi => {
                var latLng = new google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude);
            //Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
                position: latLng,
                map: map,

            });

            var infowindow = new google.maps.InfoWindow({
                content: 'Navn:' + ' ' + poi.AddressInfo.Title + '<br>' +
                'Addresse: ' + ' ' + poi.AddressInfo.AddressLine1 + '<br>' + '<a href="vislad.html?id=" + poi.ID> Se mer informasjon</a>'
                //OM vi ikke får til å lage spesifikke sider generert på bakgrunn av poi.ID legger vi bare inn all nødvendig informasjon her.
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
