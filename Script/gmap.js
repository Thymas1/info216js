function initMap() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=*';
    xhr.open('GET', url, true);
    xhr.onload = function () {
        xhr.Data = JSON.parse(this.response);
        if (this.status == 200) {
            xhr.Data.forEach(poi => {
            var map;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 60.391011, lng: 5.325950},
                zoom: 4
            });
            for (var i = 0; i < poi.AddressInfo; i++) {
                var data = xhr.Data.poi[i],
                    latLng = new google.maps.LatLng(data.AddressInfo.latitude, data.AddressInfo.longitude);

                //Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,

                });
            }
        })
        }
    }
    xhr.send();
}