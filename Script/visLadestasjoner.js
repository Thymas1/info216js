const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

var overskrift = document.createElement("h1");
overskrift.textContent = "Alle ladestasjoner:"

app.appendChild(container);
container.appendChild(overskrift);

var xhr = new XMLHttpRequest();
xhr.open('GET','https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100', true);
xhr.onload = function (e) {
    xhr.data = JSON.parse(this.response);
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            xhr.data.forEach(poi => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

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


                container.appendChild(card);
                card.appendChild(titel);
                card.appendChild(form);
                form.appendChild(Addresse);
                form.appendChild(hoydegrader);
                form.appendChild(breddegrader);
                form.appendChild(by);
                form.appendChild(pris);
                form.appendChild(id);


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


