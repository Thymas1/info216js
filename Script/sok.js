

(window.onload = function() {


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openchargemap.io/v2/poi/?output=json&countrycode=NO&maxresults=100', true);
    xhr.onload = function (e) {
        xhr.data = JSON.parse(this.response);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xhr.data.forEach(poi => {

                    document.getElementById("sokBtn").addEventListener("click", searchDataPoints);

                    function searchDataPoints() {

                        document.getElementById("sokList").innerHTML = "";
                        var sokValue = document.getElementById("sokValue").value;
                        var result = [];

                        for (var i in poi) {

                            if (poi[i].AddressInfo.AddressLine1.toLowerCase().indexOf(sokValue.toLowerCase()) > -1) {
                                result.push(poi[i]);
                            }
                        }

                        showFound(result);
                        console.log(result);
                    }
                });
            }
        }
    }

                function showFound(points) {
                    var sokList = document.getElementById("sokList");

                    if (points.length < 1) {
                        var div = document.createElement("div");
                        var p = document.createElement("p");
                        p.textContent = "Ingen treff på søket ditt";
                        div.appendChild(p);
                        sokList.appendChild(div);

                    } else {
                        points.forEach(function (point) {

                            var div = document.createElement("div");
                            var p = document.createElement("p");

                            p.addEventListener("click", goToPoint.bind(this, point), false);

                            p.textContent = poi.AddressInfo.AddressLine1;

                            div.appendChild(p);

                            sokList.appendChild(div);


                        });
                    }
                }

});


