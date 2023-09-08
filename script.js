const wordsList = ['dom', 'section', 'function', 'listener', 'algorithm', 'elements'];
let wordToBeGuessed = [];
let displayWord = [];
let incorrectLetters = [];



window.addEventListener("load",()=>{start()})

//inicializar el programa para elegir una palabra de la lista
function start (){
    let randomPositionWordsList = Math.floor(Math.random()*wordsList.length);
    let randomWord = wordsList[randomPositionWordsList];
    wordToBeGuessed = [...randomWord];
    for ( let letter of wordToBeGuessed){
        displayWord.push('_');
    } 
    const wordElement = document.querySelector('.word');
    wordElement.textContent = displayWord.join(' ');
}
const numberOfAttempts = 7;
const letterInput = document.getElementById('letter_input');
const guessButton = document.getElementById('guessButton');
const lettersFailedElement = document.querySelector('.letters-failed');
const hangmanImage = document.getElementById('hangman-image');
let incorrectGuesses = 0;
const newWordButton = document.getElementById('newWordButton');
newWordButton.addEventListener('click', startNewGame);

guessButton.addEventListener('click', () => {
    const letter = letterInput.value.toLowerCase();
    if (!letter.match(/^[a-z]$/)) { 
        
        alert('Ingresa una letra minúscula válida.');

    } else if ( !wordToBeGuessed.includes(letter)){
        if(!incorrectLetters.includes(letter)){
            incorrectLetters.push(letter);
            lettersFailedElement.textContent = 'Letras fallidas: ' + incorrectLetters.join(', ');

            incorrectGuesses++;
            hangmanImage.src = `public/images/img${incorrectGuesses}.png`

            if (incorrectGuesses === numberOfAttempts){
                lettersFailedElement.textContent = '¡Has perdido! La palabra era: ' + wordToBeGuessed.join('');
                letterInput.disabled = true;
                guessButton.disabled = true;
                newWordButton.style.display = 'block'; 
            }
        } 
        letterInput.value = '';
    } else {
        for (let i = 0; i < wordToBeGuessed.length; i++) {
            if(wordToBeGuessed[i] === letter){
                displayWord[i] = letter
                correctGuess = true;
            }
        }

        const wordElement = document.querySelector ('.word');
        wordElement.textContent = displayWord.join('');

        if(!displayWord.includes('_')) {
            lettersFailedElement.textContent = '¡Felicidades, has ganado!'
            letterInput.disabled = true;
            guessButton.disabled = true;
            newWordButton.style.display = 'block';
        }
    }
        letterInput.value = '';
    });

function startNewGame(){
    displayWord = [];
    incorrectLetters = [];
    incorrectGuesses = [];
    hangmanImage.src = 'public/images/img0.png'
    letterInput.disabled = false;
    guessButton.disabled = false;
    lettersFailedElement.textContent = '';
    
    start()
    newWordButton.style.display = none;
}

