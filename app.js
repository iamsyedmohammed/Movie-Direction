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


const showloader=()=>{
    let loader=document.querySelector(".loader");
    loader.classList.remove("hide");
}

const hideloader=()=>{
    let loader=document.querySelector(".loader");
    loader.classList.add("hide");
}

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
   setTimeout(()=>{
    
   })
    showloader();
    evt.preventDefault();
    // evt.stopPropagation();
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
        messageContainer.prepend(errorMessage);
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

    let title=document.createElement("div");
    title.innerText=`Title:`
    title.classList.add("key")

    let titleData=document.createElement("div");
    titleData.innerText=`${response.Title}`
    titleData.classList.add("value");

    let titleElement=document.createElement("div");
    titleElement.append(title,titleData)
    titleElement.classList.add("styling");

    //Director Element

    let director=document.createElement("div");
    director.innerText=`Director:`
    director.classList.add("key")

    let directorData=document.createElement("div");
    directorData.innerText=`${response.Director}`
    directorData.classList.add("value");

    let directorElement=document.createElement("div");
    directorElement.append(director,directorData)
    directorElement.classList.add("styling");
  
    // let directorElement=document.createElement("div");
    // directorElement.innerText=`Director: ${response.Director}`

    //Actor
    let actor=document.createElement("div");
    actor.innerText=`Actor:`
    actor.classList.add("key")

    let actorData=document.createElement("div");
    actorData.innerText=`${response.Actors}`
    actorData.classList.add("value");

    let actorElement=document.createElement("div");
    actorElement.append(actor,actorData)
    actorElement.classList.add("styling");
    // let actorElement=document.createElement("div");
    // actorElement.innerText=`Actors: ${response.Actors}`

    //release Date
    let release=document.createElement("div");
    release.innerText=`Release Date:`
    release.classList.add("key")

    let releaseData=document.createElement("div");
    releaseData.innerText=`${response.Released}`
    releaseData.classList.add("value");

    let releaseElement=document.createElement("div");
    releaseElement.append(release,releaseData)
    releaseElement.classList.add("styling");

    //  let releasedElement=document.createElement("div");
    // releasedElement.innerText=`Release Date: ${response.Released}`
    

    let genre=document.createElement("div");
    genre.innerText=`Genre:`
    genre.classList.add("key")

    let genreData=document.createElement("div");
    genreData.innerText=`${response.Genre}`
    genreData.classList.add("value");

    let genreElement=document.createElement("div");
    genreElement.append(genre,genreData)
    genreElement.classList.add("styling");

    //  let genreElement=document.createElement("div");
    // genreElement.innerText=`Genre: ${response.Genre}`

    let rating=document.createElement("div");
    rating.innerText=`Ratings:`
    rating.classList.add("key")

    let ratingData=document.createElement("div");
    ratingData.innerText=`${response.Ratings[0].Source}:  ${response.Ratings[0].Value}`
    ratingData.classList.add("value");

    let ratingElement=document.createElement("div");
    ratingElement.append(rating,ratingData)
    ratingElement.classList.add("styling");
    
    
    //  let ratingElement=document.createElement("div");
    // ratingElement.innerText=`${}`

    let posterElement=document.createElement("img");
    posterElement.classList.add("size")
    posterElement.src=response.Poster
  

    let plotElement=document.createElement("div");
    plotElement.innerText=`Plot:${response.Plot}`
    plotElement.classList.add("plotElement");
    console.log(plotElement);
    let ogContainer=document.createElement("div")

    ogContainer.append(titleElement,actorElement,releaseElement,directorElement,genreElement,ratingElement);
    ogContainer.classList.add("ogContainer")
    
    detailsContainer.append(ogContainer,plotElement);

    newOptions.append(posterElement,detailsContainer)
        

    // detailsContainer.addEventListener("mouseenter",(evt)=>{
       
    //     plotElement.classList.remove("hide")
    
    // })

    // detailsContainer.addEventListener("mouseleave",(evt)=>{
        
    //     plotElement.classList.add("hide")
        
    // })
    messageContainer.prepend(newOptions);




    }
    
} catch (error) {
    console.error("Error fetching movie data:", error);
}
   finally{
    hideloader();
   }
   
    
})








