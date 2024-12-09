let inputField=document.querySelector("#movies");
let button=document.querySelector("#Searchbutton");
let messageContainer=document.querySelector(".messageContainer");
let genreCountainer=document.querySelector("#genre");
let yearContainer=document.querySelector("#year");
let filterButton=document.querySelector(".filterbutton");
let recommendationsBTN=document.querySelector("#recommend");
let recommendationsInput=document.querySelector("#input");
let changetheme=document.querySelector(".theme")
let slider=document.querySelector(".switch input[type='checkbox']")

moviename=inputField.value;
let apikey=`c2fd154f`
let url =`https://www.omdbapi.com/`;

console.log(document.querySelector("#movies")); // Should log the element or `null`
console.log(document.querySelector("#Searchbutton")); 

let tmdbapikey=`23a3bc273421de99e019d20aa46775ff`;
let tmdburl=`https://api.themoviedb.org/` //28

let mode="dark";
                    

let body=document.querySelector("body")
body.classList.add("dark");

slider.addEventListener("change",()=>{
   
    if(mode==="light"){
        mode="dark";
        body.classList.add("dark");
        body.classList.remove("light");
        console.log(mode)
    }else{
        mode="light";
        body.classList.add("light");
        body.classList.remove("dark")
         console.log(mode)
    }
})


button.addEventListener("click",async(evt)=>{
   

    evt.preventDefault();
    moviename=inputField.value;
    messageContainer.classList.remove("hide")
    
try {
    let link= await fetch(`${url}?t=${moviename}&apikey=${apikey}`)
    let response= await link.json();
       inputField.value=""
        console.log(response);

    if(response.Response==="False"){
        // messageContainer.innerText="";
        
        let errorMessage=document.createElement("div");
        errorMessage.innerText=`Movie not Found :${response.Error}`
        errorMessage.style.color="red";
        errorMessage.classList.add("errorMessage")
        let errorImage=document.createElement("img");
        errorImage.src = "./src/error-404.png";

        errorImage.alt="Error Image"
        errorImage.style.height="100px"
        errorImage.style.width="100px"

    //    inputField.value=""
        

       
        errorMessage.append(errorImage);
        messageContainer.append(errorMessage);
    }else{

      

        const moviesexist=Array.from(messageContainer.children).some(child=>{
            return child.querySelector(".details")&&
            child.querySelector(".details").innerText.includes(response.Title);
        })

        if(moviesexist){
            alert("This movie is already displayed. ")
            return;  // Exit if the movie is already in the container
        }

        

        // messageContainer.innerText="";

    let newOptions = document.createElement("div");
    newOptions.classList.add("newOptions");

    let detailsContainer=document.createElement("div");
    detailsContainer.classList.add("details")

    let contentContainer=document.createElement("div")
    contentContainer.classList.add("content")

    let titleElement=document.createElement("div");
    titleElement.innerText=`Title: ${response.Title}`
    titleElement.style.color="green"
  
    let directorElement=document.createElement("div");
    directorElement.innerText=`Director: ${response.Director}`

    let actorElement=document.createElement("div");
    actorElement.innerText=`Actors: ${response.Actors}`

     let releasedElement=document.createElement("div");
    releasedElement.innerText=`Release Date: ${response.Released}`
    
     let genreElement=document.createElement("div");
    genreElement.innerText=`Genre: ${response.Genre}`
    
    
     let ratingElement=document.createElement("div");
    ratingElement.innerText=`${response.Ratings[0].Source}:  ${response.Ratings[0].Value}`

    let posterElement=document.createElement("img");
    posterElement.classList.add("size")
    posterElement.src=response.Poster
  

    let plotElement=document.createElement("div");
    plotElement.innerText=`Plot:${response.Plot}`
    plotElement.classList.add("opacity");
    
    detailsContainer.append(titleElement,actorElement,releasedElement,directorElement,genreElement,ratingElement);

    newOptions.append(posterElement,detailsContainer)
        

    
    messageContainer.prepend(newOptions);


    }
    
} catch (error) {
    console.error("Error fetching movie data:", error);
}
   
   
    
})








