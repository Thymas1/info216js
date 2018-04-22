var map;
function initMap() {
    var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=*';
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(65.162607, 13.070771),
        mapTypeId: 'terrain'
    });
}