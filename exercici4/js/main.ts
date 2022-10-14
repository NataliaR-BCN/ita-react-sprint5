//NIVELL 1 

/** 
 * Shows a random joke from an API. 
 * @returns nothing
 */
async function showAJoke(): Promise<void> {
        const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const randomJoke = await response.json();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const jokeRating = document.getElementById('joke-rating') as HTMLDivElement;
    const buttonNextJoke = document.getElementById('next-joke') as HTMLButtonElement;

    textJoke.innerHTML = randomJoke.joke;

    jokeRating.style.display = "flex";
    buttonNextJoke.innerText = "Següent acudit";   
}

//Exercici 3 refactored:

type reportedJokeObj = {joke: string; score: number; date: string;}

const reportJokesArray: reportedJokeObj[] = [];

/** 
 * Collects joke's data, converts rating feedback in a score and stores all (joke, user's feedback as a score and date) in an array. 
 * @param ratingSelected - The string of the rating selected by user
 * @returns nothing
 */
const jokeScoreSaved = (ratingSelected: string) => {
    
    //Conversion from rating to score:
    let scoreConverted: number; 
    ratingSelected === "bad" ? scoreConverted = 1 : ratingSelected === "good" ? scoreConverted = 3 : scoreConverted = 2;

    const currentDate: string = new Date().toISOString();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const currentJoke: string = textJoke.innerHTML;

    const jokeRated: reportedJokeObj = {
        joke: currentJoke,
        score: scoreConverted,
        date: currentDate
    };

    reportJokesArray.push(jokeRated);

    console.log(reportJokesArray);
}


//Event to get jokes' rating:
document.querySelectorAll('#joke-rating button').forEach(ratingButton => {
    ratingButton.addEventListener('click',function(this: HTMLButtonElement){
        jokeScoreSaved(this.id);
  })
});

//NIVELL 2
//Exercici 4

/** 
 * Gets user's position coords to provide local current weather
 * @returns nothing
 */
function getLocation(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorLocation);
  } else { 
    alert("Geolocation is not supported by this browser.");
    errorLocation();
  }
}

/** 
 * Sends location data to the weather function
 * @returns nothing
 */
function showPosition(position: any) {
  showWeather(position.coords.latitude, position.coords.longitude);
}

/** 
 * Set position coords by default, if getLocation throws an error or user denies: 
 * @returns nothing
 */
function errorLocation() {
   showWeather(41.408, 2.1575); //Barcelona coords  
}


/** 
 * Connects to OpenWeatherMap API to get local weather information
 * @param latValue - The number of user's latitude 
 * @param lonValue - The number of user's longitude
 * @returns nothing
 */

async function showWeather(latValue: number, lonValue: number): Promise<void> {

   const API_WEATHER: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&units=metric&lang=ca&appid=5ef4db07eb6deb8d094c4d8e544f4631`;

    const response: Response = await fetch(API_WEATHER);
    const convert = await response.json();
    
    let iconNameInOpenWeather = convert.weather[0].icon;

    const weatherInfo = document.getElementById('weather-forecast') as HTMLDivElement;

    weatherInfo.innerHTML = `Avui: ${convert.weather[0].description}`;

}
