const test = document.getElementById('sokList');

const cont = document.createElement('div');
cont.setAttribute('class', 'cont');

test.appendChild(cont);

var knapp = document.getElementById("sokBtn");
if (knapp){
    knapp.addEventListener("click", asd);
}
function asd() {
    alert("test");
}

function sokfil() {


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=200000', true);
    xhr.onload = function (e) {
        xhr.data = JSON.parse(this.response);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr.data.forEach(poi => {
                    var input = document.getElementById("sokValue").value;
                    for (i = 0; i < poi.length; i++) {
                        if (poi[i] == input) {
                            console.log("funnet");
                        } else {
                            alert("not found");
                        }
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
};

