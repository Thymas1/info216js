function initMap() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100';
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
            // Creating an InfoWindow object
            var infowindow = new google.maps.InfoWindow({
                content: '<a href="vislad.html?id=" + poi.ID> Addresse:</a>' + ' ' + poi.AddressInfo.AddressLine1 + '<br>' +
                'Pris: ' + poi.UsageCost + '<br>'
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        })
        }
    }
    xhr.send();
}

initMap()
