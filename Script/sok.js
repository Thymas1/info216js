
function visAPI(){
    const applikasjon = document.getElementById('sokList');

    const konteiner = document.createElement('div');
    konteiner.setAttribute('class', 'konteiner');

    applikasjon.appendChild(konteiner);
    var input,navn;
    input = document.getElementById("form2");
    navn = input.elements["inputsok"].value;


    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100', true);
    xhr.onload = function (e) {
        xhr.data = JSON.parse(this.response);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr.data.forEach(poi => {
                    if(navn == poi.AddressInfo.Title ) {
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

                        var pris = document.createElement("li");
                        pris.textContent = "Pris for bruk:" + " " + poi.UsageCost;

                        var id = document.createElement("li");
                        id.textContent = "ID:" + " " + poi.ID;


                        konteiner.appendChild(kort);
                        kort.appendChild(titel);
                        kort.appendChild(form);
                        form.appendChild(Addresse);
                        form.appendChild(hoydegrader);
                        form.appendChild(breddegrader);
                        form.appendChild(by);
                        form.appendChild(pris);
                        form.appendChild(id);
                    } else {
                        console.log("virker ikke");
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













