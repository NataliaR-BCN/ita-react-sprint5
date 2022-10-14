//Nivell 1

/** 
 * Shows a random joke from an API. 
 * @returns nothing
 */

async function showJoke(): Promise<void> {
        const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const randomJoke = await response.json();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;

    textJoke.innerHTML = randomJoke.joke;

}

//Exercici 3

type reportedJoke = {joke: string; score: number; date: string;}

const reportJokes: reportedJoke[] = [];

/** 
 * Collects joke's data (joke, user's feedback and date) and stores it in an array. 
 * @param scoreSelected - The number of the score selected by user
 * @returns nothing
 */
function jokeScore(scoreSelected: number): void {

    const currentDate: string = new Date().toISOString();
    const textJoke = document.getElementById('joke-text') as HTMLDivElement;
    const currentJoke: string = textJoke.innerHTML;
    
    const jokeRated: reportedJoke = {joke: currentJoke, score: scoreSelected, date: currentDate};

    reportJokes.push(jokeRated);

    console.log(reportJokes);
}