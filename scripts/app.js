//Practice for Test 2
async function getMovies(url){
    let resp = await fetch(url);
    if(resp.ok){
        return await resp.json();
    } 
    throw new Error("Uh oh, Something went wrong. Try again later.")  
}

function sortByStars(movies, isMin) {
    let sorted = movies.sort((a,b)=> a.stars - b.stars);
    if(isMin){
        //return movies[0].stars;
        return movies.filter(m=> m.stars == movies[0].stars);
    }
    else {
        //return movies[movies.length -1].stars;
        return movies.filter(m=> m.stars == movies[movies.length-1].stars);
    }
}

function titleToString(movies){
    return movies.map(m=> m.title).sort().join("<br>");
}


document.getElementById("btnSearch").addEventListener("click", async function(){
    let choice = document.querySelector("input[name=radSearch]:checked").value;
    let movies = await(getMovies("data/movies.json"));
    let output = undefined;

    if (choice == "max"){
        //let starLimit = sortByStars(movies,false);
        //output = movies.filter(m=> m.stars == starLimit)
                       //.map(m=>m.title)
                       //.join("<br>");


        let matches = sortByStars(movies, false);
        output = titleToString(matches);
        console.log(output);
    }
    else if(choice == "min"){
        let matches = sortByStars(movies, true);
        output = titleToString(matches);
        console.log(output);
    }
    else if(choice == "plot"){
        let search = document.getElementById("txtPlot").value;
        if(search == ""){
            output = "Please enter something on text box to search the movie";
        }
        else{
            let matches = movies.filter(m=> m.plot.includes(search))
            output = titleToString(matches);
        }
                        
    }
    document.getElementById("results").innerHTML = output;
});