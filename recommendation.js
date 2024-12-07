let recommendationsBTN=document.querySelector("#recommend");
let recommendationsInput=document.querySelector("#input");

let messageContainer=document.querySelector(".messageContainer");


let apikey=`c2fd154f`
let url =`https://www.omdbapi.com/`;



let tmdbapikey=`23a3bc273421de99e019d20aa46775ff`;
let tmdburl=`https://api.themoviedb.org/`

recommendationsBTN.addEventListener("click", async(event)=>{
    messageContainer.classList.remove("hide")
    messageContainer.innerText=""
    event.preventDefault();
    const getIMDBID=async (movies) => {
        //  let movies=inputField.value
        // console.log(movies);
            let link=await fetch(`${url}?t=${movies}&apikey=${apikey}`);
            let data= await link.json();
            console.log(data);
            return data.imdbID;
        }
    
        
        //use tmdb
        const useIMDBID=async (movies) => {
            const imdbID = await getIMDBID(movies);
           let link = await fetch(`${tmdburl}3/find/${imdbID}?api_key=${tmdbapikey}&external_source=imdb_id`) 
           let data= await link.json();
        //    let response=data.movie_results.id
        let results=data.movie_results;
        console.log(results[0].id);
        return results[0].id;
           
        }
        const movies = recommendationsInput.value; // Get movie title from input
        console.log(movies);
        await useIMDBID(movies);
        // const getRecommendation=async (params) => {
            
        // }
    
        const getRecommendation=async (movies) => {
            let tmdbid=await useIMDBID(movies);
            let link= await fetch(`${tmdburl}3/movie/${tmdbid}/recommendations?api_key=${tmdbapikey}`)
            let data= await link.json();
            console.log(data);
            data.results.forEach(element => {
                console.log(element.title)
                let reccomend=document.createElement("div");
                reccomend.classList.add("reccomend")
                let titles=element.title;
                reccomend.append(titles)
                messageContainer.append(reccomend);
                // messageContainer.textContent += element.title;
            });

           
    
        }
    
        await getRecommendation(movies);
})
