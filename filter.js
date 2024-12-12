let messageContainer=document.querySelector(".messageContainer");
let genreCountainer=document.querySelector("#genre");
let yearContainer=document.querySelector("#year");
let filterButton=document.querySelector(".filterbutton");
let apikey=`c2fd154f`
let url =`https://www.omdbapi.com/`;

let tmdbapikey=`23a3bc273421de99e019d20aa46775ff`;
let tmdburl=`https://api.themoviedb.org/` 


const showloader=()=>{
    let loader=document.querySelector(".filter-loader");
    loader.classList.remove("hide")
}

const hideloader=()=>{
    let loader=document.querySelector(".filter-loader");
    loader.classList.add("hide")
}


filterButton.addEventListener("click", async (event) => {
    showloader();

   
    messageContainer.innerText="";
    messageContainer.classList.remove("hide")
    event.preventDefault();
    genreID=genreCountainer.value;
    yearID=yearContainer.value;
    if(genreID===""|| yearID===""){
        messageContainer.classList.add("hide");
        alert("Either of the Filter is missing")
        messageContainer.innerText="";
        hideloader();
        return;
    }

    await new Promise((resolve) => setTimeout(resolve,3000));
try {
    let links=await fetch(`${tmdburl}3/discover/movie?api_key=${tmdbapikey}&with_genres=${genreID}&primary_release_year=${yearID}`);
        let response=await links.json(); 
        console.log(response);
    

            for (const element of response.results) {
            console.log(element.title);
            console.log(element.overview);
            console.log(element.release_date)
            // console.log(element.r);

            let movieElements=document.createElement("div");
            movieElements.classList.add("movieElements");
            // movieElements.style.color="White"
    
            //Title Styling
            let Title=document.createElement("div");
            Title.innerText=`Title:`;
            Title.classList.add("key")

            let movieTitleData=document.createElement("div");
            movieTitleData.innerText=`${element.title}`
            movieTitleData.classList.add("value")

            let movieTitle=document.createElement("div");
            movieTitle.append(Title,movieTitleData);
            movieTitle.classList.add("styling")

            //Plot Styling

            let plot=document.createElement("div");
            plot.innerText=`Plot:`
            plot.classList.add("key")

            let moviePlotData=document.createElement("div");
            moviePlotData.innerText=`${element.overview}`
            moviePlotData.classList.add("value");

            
    
            let moviePlot=document.createElement("div");
            moviePlot.append(plot,moviePlotData);
            moviePlot.classList.add("styling")


            let year=document.createElement("div");
            year.innerText=`Year:`
            year.classList.add("key");


            let movieYearData=document.createElement("div");
            movieYearData.innerText=`${element.release_date}`
            movieYearData.classList.add("value")


            let movieYear=document.createElement("div");
            movieYear.append(year,movieYearData);
            movieYear.classList.add("styling");
            
            // let movieRatings=document.createElement("div");
            // movieRatings.innerText=`Rated: ${element.rated}`
            
    
            // movieElements.append(movieRatings);
            movieElements.append(movieTitle);
            movieElements.append(moviePlot);
            movieElements.append(movieYear);
            messageContainer.append(movieElements);

            try {
                let imdb_id_link=await fetch(`${url}?t=${element.title}&apikey=${apikey}`)
                let data= await imdb_id_link.json();
                console.log("The Data Ratings is ",data.Ratings);

                data.Ratings.forEach(element => {
                    console.log("The Element is",element)
                  let movieRatings=document.createElement("div")
                  movieRatings.innerText=`${element.Source}: ${element.Value}`
                  movieElements.append(movieRatings);
                    messageContainer.append(movieElements);
                });
            } catch (error) {
                console.log(error)
            }
                
            }
            
     
        
           

        
    
        }
    
catch (error) {
    let errorMessage=document.createElement("div");
    errorMessage.innerText=`Error:${error}`
    
}finally{
    hideloader();
}
   
   

})