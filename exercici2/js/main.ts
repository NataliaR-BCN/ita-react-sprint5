//Nivell 1
//Exercici 2

/** 
 * Shows a random joke from an API. 
 * @returns nothing
 */

async function showJokeByScreen(): Promise<void> {
        const response: Response = await fetch(`https://icanhazdadjoke.com/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const randomJoke = await response.json();

    const textJoke = document.getElementById('joke-text') as HTMLDivElement;

    const buttonNextJoke = document.getElementById('next-joke') as HTMLButtonElement;

    textJoke.innerHTML = randomJoke.joke;
    buttonNextJoke.innerText = "Següent acudit";

}

