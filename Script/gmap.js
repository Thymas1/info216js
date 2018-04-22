function initMap() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=*';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            var jsonData = JSON.parse(xhr.responseText);
            var map;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 62.491507, lng: 9.945628},
                zoom: 4.5
            });
            for (var i = 0; i < jsonData.poi.AddressInfo.length; i++) {
                var data = jsonData.poi.AddressInfo[i],
                    latLng = new google.maps.LatLng(data.Latitude, data.Longitude);

                //Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,

                });
            }
        }
    }
    xhr.send();
}