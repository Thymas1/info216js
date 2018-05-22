// Denne funksjonen er søkefunksjonen som vi har på siden, den søker igjennom APIet og matcher søkestringen med navnet til ladestasjoner,
// og viser informasjon om disse, informasjonen den viser er: Tittel, Addresse, Høyde og breddegrader, By, fylke, Pris, om det er aktivt, antall punkt
// ID og Hvilke Hurtiglader som er støttet
function visAPI() {
    const applikasjon = document.getElementById('sokList');

    const konteiner = document.createElement('div');
    konteiner.setAttribute('id', 'konteiner');

    applikasjon.appendChild(konteiner);
    var input, navn;
    input = document.getElementById("form2");
    navn = input.elements["inputsok"].value;


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100', true);
    xhr.onload = function (e) {
        xhr.data = JSON.parse(this.response);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr.data.forEach(poi => {
                    if(navn == poi.AddressInfo.Title.toLowerCase()
            )
                {
                    const kort = document.createElement('div');
                    kort.setAttribute('class', 'kort');

                    var titel = document.createElement("h1");
                    titel.textContent = poi.AddressInfo.Title;

                    var form = document.createElement("ul");
                    form.setAttribute('id', 'info');

                    var Addresse = document.createElement("li");
                    Addresse.textContent = "addresse:" + " " + poi.AddressInfo.AddressLine1;

                    var hoydegrader = document.createElement("li");
                    hoydegrader.textContent = "Høydegrader:" + " " + poi.AddressInfo.Latitude;

                    var breddegrader = document.createElement("li");
                    breddegrader.textContent = "Breddegrader:" + " " + poi.AddressInfo.Longitude;

                    var by = document.createElement("li");
                    by.textContent = "By:" + " " + poi.AddressInfo.Town;

                    var fylke = document.createElement("li");
                    fylke.textContent = "Fylke:" + " " + poi.AddressInfo.StateOrProvince;

                    var pris = document.createElement("li");
                    pris.textContent = "Pris for bruk:" + " " + poi.UsageCost;

                    var erAktivt = document.createElement("li");
                    erAktivt.textContent = "Er aktiv:" + " " + poi.SubmissionStatus.IsLive;

                    var antallPunkt = document.createElement("li");
                    antallPunkt.textContent = "Antall Punkter:" + " " + poi.NumberOfPoints;


                    var id = document.createElement("li");
                    id.textContent = "ID:" + " " + poi.ID;

                    var Ladertype = document.createElement("li");
                    id.textContent = "Ladertype:" + " " + poi.Connections[0].ConnectionType.FormalName;


                    konteiner.appendChild(kort);
                    kort.appendChild(titel);
                    kort.appendChild(form);
                    form.appendChild(Addresse);
                    form.appendChild(hoydegrader);
                    form.appendChild(breddegrader);
                    form.appendChild(by);
                    form.appendChild(fylke)
                    form.appendChild(pris);
                    form.appendChild(erAktivt);
                    form.appendChild(antallPunkt);
                    form.appendChild(id);
                    form.appendChild(Ladertype);


                }

            })
            } else {
                console.error("funker ikke");
            }
        }
    };

    xhr.onerror = function (e) {
        console.error("funker.ikke");
    };
    xhr.send(null);


}
// Denne funksjonen sletter tidligere søkeresultater når et nytt søk blir gjennomført, så det passer på siden.
function slett() {
    if (!$.trim($('#konteiner').html()).length) {

    } else {
        var elem = document.getElementById("konteiner");
        elem.parentNode.removeChild(elem);
    }
}
// Denne funksjonen viser søkeresultatet på kartet, med informasjon i infowindow.

function visPåKart() {


    function initMap() {

        var input, navn;
        input = document.getElementById("form2");
        navn = input.elements["inputsok"].value;

        var xhr = new XMLHttpRequest();
        var url = 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100';
        xhr.open('GET', url, true);
        xhr.onload = function () {
            xhr.Data = JSON.parse(this.response);

            var map = new google.maps.Map(document.getElementById('kart'), {
                center: {
                    lat: 60.391011,
                    lng: 5.325950
                },
                zoom: 2
            });
            if (this.status == 200) {
                xhr.Data.forEach(poi => {
                    if(navn == poi.AddressInfo.Title.toLowerCase()
            )
                {
                    var latLng = new google.maps.LatLng(poi.AddressInfo.Latitude, poi.AddressInfo.Longitude)
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,

                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: 'Navn:' + ' ' + poi.AddressInfo.Title + '<br>' +
                        'Addresse: ' + ' ' + poi.AddressInfo.AddressLine1
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                }
            })
            }
        }
        xhr.send();
    }

    initMap()

}
















