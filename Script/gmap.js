function initMap() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=200000';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            var jsonData = JSON.parse(xhr.responseText);
            var map;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 60.391011, lng: 5.325950},
                zoom: 14
            });
            for (var i = 0; i < jsonData.poi.AddressInfo.length; i++) {
                var data = jsonData.AddressInfo[i],
                    latLng = new google.maps.LatLng(data.latitude, data.longitude);

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