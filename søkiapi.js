function execute(method, url, body){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, false);
    xmlhttp.send(body);
}
var serviceUrl = "https://api.openchargemap.io/v2/poi/";

var poi = {
    "title": "Budapest, Hungexpo - VIP charger"
}

var indexUrl = serviceUrl + "/poi";
var response = execute('POST', indexUrl, JSON.stringify(poi));

    alert(response);
    var searchRequest = {
        "query_string": {
            "query": "duck"

        }

    };

    var searchUrl = serviceUrl + "/poi/_search";
    var searchResponse =
        execute('GET', searchUrl, JSON.stringify(searchRequest));

        alert(searchResponse);

        var searchResult = JSON.parse(searchResponse);
        alert(searchResult.hits.total);
        alert(searchResult.hits.total[0]._source.name);

