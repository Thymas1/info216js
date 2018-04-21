
'use strict';
(window.onload = function(){

    document.getElementById('search').addEventListener('submit', function(evt){
        evt.preventDefault();

        document.getElementById("sokList").innerHTML = "";


        var form = document.getElementById("search").elements;
        var result = [];
        var tittel = form[1].value;
        var skuespiller = form[2].value;
        var regissor = form[3].value;
        var sjanger = form[4].value;
        var land = form[5].value;




        for(var i in movies_object){
            var save = false;
            if(tittel && movies_object[i].etitle.toLowerCase().indexOf(tittel.toLowerCase())>-1){
                save = true;

                if(skuespiller)save = checkActor(movies_object[i].folk,skuespiller);

                if(regissor)save = checkDirector(movies_object[i].dir,regissor);

                if(sjanger)save = checkSjanger(movies_object[i],sjanger);

                if(land)save = checkCountry(movies_object[i],land);


            }else{

                if(skuespiller && !tittel && checkActor(movies_object[i].folk,skuespiller)){
                    save = true;
                    if(regissor)save = checkDirector(movies_object[i].dir,regissor);

                    if(sjanger)save = checkSjanger(movies_object[i],sjanger);

                    if(land)save = checkCountry(movies_object[i],land);


                }else{
                    if(regissor && !skuespiller && !tittel && checkDirector(movies_object[i].dir,regissor)){
                        save = true;
                        if(sjanger)save = checkSjanger(movies_object[i],sjanger);

                        if(land)save = checkCountry(movies_object[i],land);


                    }else{
                        if(sjanger && !regissor && !skuespiller && !tittel && checkSjanger(movies_object[i],sjanger)){
                            save = true;
                            if(land)save = checkCountry(movies_object[i],land);

                        }else{
                            save = false;
                            if(land && !sjanger && !regissor && !skuespiller && !tittel)save = checkCountry(movies_object[i].country,land);

                        }
                    }
                }
            }
            if(save){
                result.push(movies_object[i]);

            }

            }


        showFoundedMovies(result);

    });

    // function checkTitle(movie,title){
    //     if(movie.etitle){
    //         return (movie.etitle.toLowerCase().indexOf(title.toLowerCase())>-1)
    //     }else{
    //         return false;
    //     }
    // }

    function checkCountry(movie,land){
        if(movie.country){
            return (movie.country.toLowerCase().indexOf(land.toLowerCase())>-1)

        }else{
            return false;
        }

    }

    function checkSjanger(movie,sjanger){
        if(genres_object[movie.id]){
            for(var g = 0;g<genres_object[movie.id].length;g++){

                if(genres_object[movie.id][g].toLowerCase().indexOf(sjanger.toLowerCase())>-1){
                   return true;
                }else{
                    return false;
                }
            }

        }
    }

    function checkActor(movie,actor){
            if(movie){
                return (movie.toLowerCase().indexOf(actor.toLowerCase())>-1)
            }else{
                return false;
            }
    }

    function checkDirector(movie,director){
        if(movie) {
            return (movie.toLowerCase().indexOf(director.toLowerCase()) > -1)
        }else{
            return false;
        }

    }


    function showFoundedMovies(movies){
        var sokList = document.getElementById("sokList");

        document.getElementById("textShowResult").textContent = "Søk resultater:";

        var trHoved = document.createElement("tr");
        var t = document.createElement("th");
        var th = document.createElement("th");
        var th1 = document.createElement("th");
        var th2 = document.createElement("th");
        var th3 = document.createElement("th");
        var th4 = document.createElement("th");
        var th5 = document.createElement("th");
        t.textContent = "Image";
        th.textContent = "Title";
        th1.textContent = "Director";
        th2.textContent = "Actor";
        th3.textContent = "Genre";
        th4.textContent = "More details";
        th5.textContent = "Trailer";
        trHoved.appendChild(t);
        trHoved.appendChild(th);
        trHoved.appendChild(th1);
        trHoved.appendChild(th2);
        trHoved.appendChild(th3);
        trHoved.appendChild(th4);
        trHoved.appendChild(th5);
        sokList.appendChild(trHoved);


        movies.forEach(function(movie){



            var tr = document.createElement("tr");
            var bildeth = document.createElement("td");
            var img = document.createElement("img");
            img.className = "fixImageSearch";

            if(movie.id<1000){
                img.src = "https://nelson.uib.no/o/0/"+movie.id+".jpg";
            }else{
                img.src = "https://nelson.uib.no/o/"+movie.id.toString()[0]+"/"+movie.id+".jpg";
            }
            bildeth.appendChild(img);

            var title = document.createElement("td");
            title.textContent = movie.etitle;
            var director = document.createElement("td");
            director.textContent = movie.dir;
            var actor = document.createElement("td");
            actor.textContent = movie.folk;
            var genre = document.createElement("td");
            genre.textContent = genres_object[movie.id];

            var details = document.createElement("td");
            var btn = document.createElement("button");
            btn.textContent="More Details";
            btn.addEventListener("click",goToMovie.bind(this,movie),false);
            var trailer = document.createElement("td");



            if(movie["youtube trailer id"]){
                var a = document.createElement("a");
                a.href="https://www.youtube.com/watch?v="+movie["youtube trailer id"];
                a.textContent = "Click to youtube link";
                trailer.appendChild(a);
            }else{
                var p = document.createElement("p");
                p.textContent="No";
                trailer.appendChild(p);
            }

            details.appendChild(btn);
            actor.textContent = movie.folk;

            tr.appendChild(bildeth);
            tr.appendChild(title);
            tr.appendChild(director);
            tr.appendChild(actor);
            tr.appendChild(genre);
            tr.appendChild(details);
            tr.appendChild(trailer);

            sokList.appendChild(tr);

        });

    }

    function goToMovie(movie){
        window.location.href = "show_movie.html?id=" + movie.id;
    }

})();

