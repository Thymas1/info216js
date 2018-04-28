'use strict';

(window.onload = function () {
    document.getElementById("sokBtn").addEventListener("click", searchDataBase);

    function searchDataBase() {

        document.getElementById("resultat").innerHTML = "";
        var sokValue = document.getElementById("sokValue").value;
        var result = [];

        for(var i in poi){


            if(poi[i].poi.AddressInfo.AddressLine1.toLowerCase().indexOf(sokValue.toLowerCase())>-1){
                result.push(api[i]);
            }
        }
        showFoundedPoints(result);

    }
    function showFoundedPoints(punkter){
        var sokList = document.getElementById("resultat");

        if(punkter.length<1){
            var div = document.createElement("div");
            var p = document.createElement("p");
            p.textContent = "Ingen treff på søket ditt";
            div.appendChild(p);
            sokList.appendChild(div);
        }else{
            punkter.forEach(function (punkt)    {

                var div = document.createElement("div");
                var p = document.createElement("p");
                p.textContent = punkt.AddressInfo.Title;
                div.appendChild(p);
                sokList.appendChild(div);
            });
        }
    }

});