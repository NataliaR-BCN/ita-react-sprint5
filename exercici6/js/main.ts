//NIVELL 1 

//Exercici 3:

type reportedJokeObjEx6 = {joke: string; score: number; date: string;}

const reportJokesArrayEx6: reportedJokeObjEx6[] = [];

/** 
 * Collects joke's data, converts rating feedback in a score and stores all (joke, user's feedback as a score and date) in an array. 
 * @param ratingSelected - The string of the rating selected by user
 * @returns nothing
 */
const jokeScoreSavedEx6 = (ratingSelected: string) => {
    
    //Conversion from rating to score:
    let scoreConverted: number; 
    ratingSelected === "bad" ? scoreConverted = 1 : ratingSelected === "good" ? scoreConverted = 3 : scoreConverted = 2;

    const currentDate: string = new Date().toISOString();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const currentJoke: string = textJoke.innerHTML;

    const jokeRated: reportedJokeObjEx6 = {
        joke: currentJoke,
        score: scoreConverted,
        date: currentDate
    };

    reportJokesArrayEx6.push(jokeRated);

    console.log(reportJokesArrayEx6);
}

//Event to get jokes' rating:
document.querySelectorAll('#joke-rating i').forEach(ratingButton => {
    ratingButton.addEventListener('click',function(this: HTMLElement){
        jokeScoreSavedEx6(this.id);
  })
});


//NIVELL 2
//Exercici 4 - refactored

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

//NEW: To associate an OpenWeatherMap icon to its equivalent FontAwesome icon:
const iconWeatherEquivalence: {[index: string]: string} = {
    '01d' : `fa-sun`,
    '01n' : `fa-moon`,
    '02d' : `fa-cloud-sun`,
    '02n' : `fa-cloud-moon`,
    '03d' : `fa-cloud`,
    '03n' : `fa-cloud`,
    '04d' : `fa-cloud`,
    '04n' : `fa-cloud`,
    '09d' : `fa-cloud-showers-heavy`,
    '09n' : `fa-cloud-showers-heavy`,
    '10d' : `fa-cloud-sun-rain`,
    '10n' : `fa-cloud-moon-rain`,
    '11d' : `fa-cloud-bolt`,
    '11n' : `fa-cloud-bolt`,
    '13d' : `fa-snowflake`,
    '13n' : `fa-snowflake`,
    '50d' : `fa-smog`,
    '50n' : `fa-smog`
}


/** 
 * Connects to OpenWeatherMap API to get local weather information
 * @param latValue - The number of user's latitude 
 * @param lonValue - The number of user's longitude
 * @returns nothing
 */

async function showWeather(latValue: number, lonValue: number): Promise<void> {

    const MI_API_KEY = 'SORRY! Fake KEY ;)'; // @Pablo: te la paso en la entrega para no colgarla en GitHub

    const API_WEATHER: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&units=metric&lang=ca&appid=${MI_API_KEY}`;

    const response: Response = await fetch(API_WEATHER);
    const convert = await response.json();

    let iconNameInOpenWeather = convert.weather[0].icon;
    let iconWeather = `<i class="fa-solid ${iconWeatherEquivalence[iconNameInOpenWeather]}"></i>`;

    const weatherInfo = document.getElementById('weather-forecast') as HTMLDivElement;

    weatherInfo.innerHTML = `${iconWeather} <span class="separator"> | </span> ${Math.round(convert.main.temp)}ºC`;

}

//Exercici 6:

/**
 * Randomly chooses a color from a selection of available colors to paint the blobs
 * @returns a string with the color code
 */

function setBlobscolor(): string {
    const blobColor: string[] = ["#8649e0", "#FF0066", "#08BDBA", "#2961ac;", "#29634b",
                       "#810177", "#084d68", "#e65b1a", "#008080", "#800020"];

    const blobColorNum: number = Math.floor(Math.random() * 10);
 
    return blobColor[blobColorNum];
}

/**
 * Randomly chooses shapes for principal and decoration blobs from a selection of svg files 
 * @param blobSize - string that indicates the kind of blob for file name purposes  
 * @returns a string with the route to the svg file
 */
function setBlobs(blobSize: string): string {
    
    const blobNum = Math.floor(Math.random() * 10);
    let blobName: string;

    if (blobSize === 'mini') {
        blobName = `url(../img/mini${blobNum}.svg)`;
    } else {
        blobName = `url(../img/blob${blobNum}.svg)`;
    }

    return blobName;
}


//Exercici 5 - refactored:
/**
 * Shows selected joke on screen:
 * @param joke - The string with the joke randomly selected 
 * @returns nothing
 */
function displayJoke(joke: string): void {

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const jokeRating = document.getElementById('joke-rating') as HTMLDivElement;
    const buttonNextJoke = document.getElementById('next-joke') as HTMLButtonElement;
    const rootElement = document.querySelector(':root') as HTMLElement;

    //To avoid overflow of texts that are too long:
    let showJokeOk = false;

    if (joke.length > 240) {
        randomJoke(); //Skips the long joke
    } else if (joke.length > 220) {
        textJoke.style.fontSize = "0.9rem";
        showJokeOk = true;
    } else if (joke.length > 195) {
        textJoke.style.fontSize = "1rem";
        showJokeOk = true;
    } else {
        textJoke.style.fontSize = "1.2rem";
        showJokeOk = true;
    } 

    if (showJokeOk) {

        textJoke.innerHTML = joke;
        jokeRating.style.display = "flex";
        buttonNextJoke.innerText = "Següent acudit";   
    
        //Layout changes:
        const blobsColor = setBlobscolor();
        const bigBlob = setBlobs('big');
        const miniBlobLeft = setBlobs('mini');
        const miniBlobRight = setBlobs('mini');

        rootElement.style.setProperty('--principal-color', blobsColor);
        rootElement.style.setProperty('--mini-blob-left', miniBlobLeft);
        rootElement.style.setProperty('--mini-blob-right', miniBlobRight);
        rootElement.style.setProperty('--big-blob', bigBlob);
    }

}

/**
 * Selects a random joke from Chuck Norris' jokes API and sends it to his presentation.
 * @returns nothing
 */
async function showChuckJokeEx6(): Promise<void> {
    const response: Response = await fetch('https://api.chucknorris.io/jokes/random');
    const joke = await response.json();

    displayJoke(joke.value); 
}

/**
 * Selects a random joke from I can haz dad joke API and sends it to his presentation.
 * @returns nothing
 */
async function showDadJokeEx6(): Promise<void> {
    const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    const randomJoke = await response.json();

    displayJoke(randomJoke.joke);
}

/** 
 * Randomly sends to one joke API or another
 * @returns nothing
 */
function randomJokeEx6(): void {
    let randomJokeAPI: number = Math.random();

    if (randomJokeAPI > 0.495) {
       showChuckJokeEx6();
    } else {
       showDadJokeEx6();
    }
}