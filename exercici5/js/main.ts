//NIVELL 1 

//Exercici 3 refactored:

type reportedJokeObjEx5 = {joke: string; score: number; date: string;}

const reportJokesArrayEx5: reportedJokeObjEx5[] = [];

/** 
 * Collects joke's data, converts rating feedback in a score and stores all (joke, user's feedback as a score and date) in an array. 
 * @param ratingSelected - The string of the rating selected by user
 * @returns nothing
 */
const jokeScoreSavedEx5 = (ratingSelected: string) => {
    
    //Conversion from rating to score:
    let scoreConverted: number; 
    ratingSelected === "bad" ? scoreConverted = 1 : ratingSelected === "good" ? scoreConverted = 3 : scoreConverted = 2;

    const currentDate: string = new Date().toISOString();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const currentJoke: string = textJoke.innerHTML;

    const jokeRated: reportedJokeObjEx5 = {
        joke: currentJoke,
        score: scoreConverted,
        date: currentDate
    };

    reportJokesArrayEx5.push(jokeRated);

    console.log(reportJokesArrayEx5);
}

//Event to get jokes' rating:
document.querySelectorAll('#joke-rating button').forEach(ratingButton => {
    ratingButton.addEventListener('click',function(this: HTMLButtonElement){
        jokeScoreSavedEx5(this.id);
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

    const weatherInfo = document.getElementById('weather-forecast') as HTMLDivElement;

    weatherInfo.innerHTML = `Avui: ${convert.weather[0].description}`;

}

//Exercici 5:
/**
 * Shows selected joke on screen:
 * @param - The string with the joke randomly selected 
 * @returns nothing
 */
function paintJoke(joke: string): void {
    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const jokeRating = document.getElementById('joke-rating') as HTMLDivElement;
    const buttonNextJoke = document.getElementById('next-joke') as HTMLButtonElement;

    textJoke.innerHTML = joke;
    jokeRating.style.display = "flex";
    buttonNextJoke.innerText = "Següent acudit"; 
}

/**
 * Selects a random joke from Chuck Norris' jokes API and sends it to his presentation.
 * @returns nothing
 */
async function showChuckJoke(): Promise<void> {
    const response: Response = await fetch('https://api.chucknorris.io/jokes/random');
    const joke = await response.json();

    paintJoke(joke.value); 
}

/**
 * Selects a random joke from I can haz dad joke API and sends it to his presentation.
 * @returns nothing
 */
async function showDadJoke(): Promise<void> {
    const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    const randomJoke = await response.json();

    paintJoke(randomJoke.joke);
}

/** 
 * Randomly sends to one joke API or another
 * @returns nothing
 */
function randomJoke(): void {
    let randomJokeAPI: number = Math.random();

    if (randomJokeAPI > 0.495) {
       showChuckJoke();
    } else {
       showDadJoke();
    }
}