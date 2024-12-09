let messageContainer=document.querySelector(".messageContainer");
let genreCountainer=document.querySelector("#genre");
let yearContainer=document.querySelector("#year");
let filterButton=document.querySelector(".filterbutton");
let apikey=`c2fd154f`
let url =`https://www.omdbapi.com/`;

let tmdbapikey=`23a3bc273421de99e019d20aa46775ff`;
let tmdburl=`https://api.themoviedb.org/` 

filterButton.addEventListener("click", async (event) => {
    messageContainer.innerText="";
    messageContainer.classList.remove("hide")
    event.preventDefault();
    genreID=genreCountainer.value;
    yearID=yearContainer.value;
    if(genreID===""|| yearID===""){
        alert("Either of the Filter is missing")
        messageContainer.innerText="";
    }

    let links=await fetch(`${tmdburl}3/discover/movie?api_key=${tmdbapikey}&with_genres=${genreID}&primary_release_year=${yearID}`);
    let response=await links.json();
    console.log(response);
    response.results.forEach(element => {
        console.log(element.title);
        console.log(element.overview);
        console.log(element.release_date)
        let movieElements=document.createElement("div");
        movieElements.classList.add("movieElements");
        // movieElements.style.color="White"

        let movieTitle=document.createElement("div");
        movieTitle.innerText=`Title: ${element.title}`;
        // movieTitle.style.color="green"

        let moviePlot=document.createElement("div");
        moviePlot.innerText=`Plot: ${element.overview}`;

        let movieYear=document.createElement("div");
        movieYear.innerText=`Year: ${element.release_date}`
        

       
        movieElements.append(movieTitle);
        movieElements.append(moviePlot);
        movieElements.append(movieYear);
        messageContainer.append(movieElements);
    });


})