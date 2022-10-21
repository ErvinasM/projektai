function toHoursAndMinutes(totalMinutes) 
    {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    }

function youtubeEmbed(yurl) 
    {
        var str = yurl;
        var res = str.split("=");
        var embeddedUrl = "https://www.youtube.com/embed/"+res[1];
        embeddedUrl = embeddedUrl.split('&')[0];
        return embeddedUrl;
    }

var checkiflist = document.getElementById("movielist");

if(checkiflist)
    {
        fetch('./assets/data/movies.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

        function appendData(data) 
            {
                var template = document.getElementById("movielist-item");
                var templateHtml = template.innerHTML;
                var listHtml = "";

                for (var key in data[0].movies) 
                    {
                        listHtml += templateHtml.replace(/{{id}}/g, data[0].movies[key].id)
                        .replace(/{{title}}/g, data[0].movies[key].title)
                          .replace(/{{totalScore}}/g, data[0].movies[key].IMDB.totalScore)
                          .replace(/{{poster}}/g, data[0].movies[key].photos.poster[0])
                          .replace(/{{trailer}}/g, data[0].movies[key].videos.trailers[0]);
                    }

                document.getElementById("movielist").innerHTML = listHtml; 
                executeSplide();
            }
    }

    var checkiflist2 = document.getElementById("moviedatain");

    if(checkiflist2)
        {
            var full_url = document.URL;
            let url = new URL(full_url);
            let search_params = url.searchParams; 
            var mid = search_params.get('id');
            mid = mid - 1;
            
            fetch('./assets/data/movies.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });

            function appendData(data) 
            {
                var template = document.getElementById("moviedatatemplate");
                var templateHtml = template.innerHTML;
                var listHtml = "";
                var mtime = toHoursAndMinutes(data[0].movies[mid].length);
                handm = mtime.hours+"h "+mtime.minutes+"m ";
                yurl = youtubeEmbed(data[0].movies[mid].videos.trailers[0]);
                var rankingtype = Math.sign(data[0].movies[mid].popularity.weeklyChange);

                var genresHtml = "";
                var directorsHtml = "";
                var writersHtml = "";
                var starsHtml = "";

                directorsHtml += "<span>"+data[0].movies[mid].castAndCrew.director+"</span>";

                if (rankingtype == 1)
                    {
                        ricon = "fa-chart-line-up";
                        sricon = "fa-caret-up";
                        wranking = data[0].movies[mid].popularity.weeklyChange;
                    }
                else
                    {
                        ricon = "fa-chart-line-down";
                        sricon = "fa-caret-down";
                        wranking =  Math.abs(data[0].movies[mid].popularity.weeklyChange);
                    }

                for (var gkey in data[0].movies[mid].genres) 
                    {
                        genresHtml += "<span>"+data[0].movies[mid].genres[gkey]+"</span>";
                    }

                for (var wkey in data[0].movies[mid].castAndCrew.writers) 
                    {
                        writersHtml += "<span>"+data[0].movies[mid].castAndCrew.writers[wkey].name+"<span> ("+data[0].movies[mid].castAndCrew.writers[wkey].role+" by)</span></span>";
                    }

                    for (var skey in data[0].movies[mid].castAndCrew.actors) 
                    {
                        starsHtml += "<span>"+data[0].movies[mid].castAndCrew.actors[skey].name+"</span>";
                    }

                listHtml = templateHtml.replace(/{{title}}/g, data[0].movies[mid].title)
                .replace(/{{year}}/g, data[0].movies[mid].releaseYear)
                .replace(/{{category}}/g, data[0].movies[mid].eirinCategory)
                .replace(/{{length}}/g, handm)
                .replace(/{{rating}}/g, data[0].movies[mid].IMDB.totalScore)
                .replace(/{{popularity}}/g, data[0].movies[mid].popularity.ranking)
                .replace(/{{ranking}}/g, wranking)
                .replace(/{{ricon}}/g, ricon)
                .replace(/{{rsicon}}/g, sricon)
                .replace(/{{poster}}/g, data[0].movies[mid].photos.poster[0])
                .replace(/{{trailer}}/g, yurl)
                .replace(/{{desc}}/g, data[0].movies[mid].description)
                .replace(/{{genres}}/g, genresHtml)
                .replace(/{{directors}}/g, directorsHtml)
                .replace(/{{writers}}/g, writersHtml)
                .replace(/{{stars}}/g, starsHtml);

                document.getElementById("moviedatain").innerHTML = listHtml; 
            }
        }
