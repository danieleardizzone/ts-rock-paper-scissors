function startGame(): void {

    const totalMatches: number = 5;
    let matches: number = 0;
    let userScore: number = 0;
    let pcScore: number = 0;

    const rockBtn: HTMLButtonElement = document.querySelector('button#rock') as HTMLButtonElement;
    const paperBtn: HTMLButtonElement = document.querySelector('button#paper') as HTMLButtonElement;
    const scissorsBtn: HTMLButtonElement = document.querySelector('button#scissors') as HTMLButtonElement;

    const userOptions: HTMLButtonElement[] = [rockBtn, paperBtn, scissorsBtn];

    const pcOptions: string[] = ['rock', 'paper', 'scissors'];

    let userChoice: string = '';
    let pcChoice: string = '';
    let result: string = '';

    rockBtn.addEventListener('click', () => {
        userChoice = 'rock';
    });

    paperBtn.addEventListener('click', () => {
        userChoice = 'paper';
    });

    scissorsBtn.addEventListener('click', () => {
        userChoice = 'scissors';
    });

    userOptions.forEach(userOption => {

        userOption.addEventListener('click', () => {

            result = winner();

            console.log(`result: ${result}`);
            console.log(`game number ${matches}`)

            updateDOMScores();

            if (matches === totalMatches) {
                userOptions.forEach(option => {
                    option.disabled = true;
                });
                setTimeout(gameOver, 2000);
            }
        });

    });

    function winner(): string {

        matches++

        pcChoice = pcChoose(pcOptions);

        const userChoiceDOMElement: HTMLElement = document.querySelector('.user-hand') as HTMLElement;
        const pcChoiceDOMElement: HTMLElement = document.querySelector('.pc-hand') as HTMLElement;
        const userChoiceImage: HTMLImageElement = userChoiceDOMElement.querySelector('img') as HTMLImageElement;
        const pcChoiceImage: HTMLImageElement = pcChoiceDOMElement.querySelector('img') as HTMLImageElement;

        const imageDirectory: string = './src/images/';

        userChoiceImage.src = `${imageDirectory + userChoice}.png`
        pcChoiceImage.src = `${imageDirectory + pcChoice}.png`

        console.log(`user: ${userChoice}, pc: ${pcChoice}`);

        if (userChoice === pcChoice) {
            return 'tie';
        } else if (userChoice === 'rock') {
            if (pcChoice === 'paper') {
                userScore++;
                return 'user win';
            } else {
                pcScore++
                return 'pc win';
            }
        } else if (userChoice === 'paper') {
            if (pcChoice === 'rock') {
                userScore++;
                return 'user win';
            } else {
                pcScore++
                return 'pc win';
            }
        } else {
            if (pcChoice === 'paper') {
                userScore++;
                return 'user win';
            } else {
                pcScore++
                return 'pc win';
            }
        }
    }

    function updateDOMScores(): void {
        const matchResultDOMElement: HTMLElement = document.querySelector('.match-result') as HTMLElement;
        const userScoreDOMElement: HTMLElement = document.querySelector('.user-score') as HTMLElement;
        const pcScoreDOMElement: HTMLElement = document.querySelector('.pc-score') as HTMLElement;

        matchResultDOMElement.innerHTML = `result: ${result}`;
        userScoreDOMElement.innerHTML = `user score: ${userScore.toString()}`;
        pcScoreDOMElement.innerHTML = `pc score: ${pcScore.toString()}`;
    }

    function gameOver(): void {
        const container: HTMLElement = document.querySelector('.container') as HTMLElement;
        container.innerHTML = '';

        const finalResult = document.createElement('h1');

        if (userScore === pcScore) {
            finalResult.innerHTML = "It's a TIE";
        } else if (userScore > pcScore) {
            finalResult.innerHTML = 'You WON';
        } else {
            finalResult.innerHTML = 'You LOSE';
        }

        container.appendChild(finalResult);

        const restartBtn = document.createElement('button');
        restartBtn.id = 'restart-game';
        restartBtn.innerHTML = 'restart game';

        container.appendChild(restartBtn);

        //logica restartBtn da implementare
        //eventListener tempraneo

        restartBtn.addEventListener('click', () => {
            location.reload();
        });


        // restartBtn.addEventListener('click', () => {
        //     const body: HTMLElement = document.querySelector('body') as HTMLElement;
        //     body.innerHTML = '';

        //     const container = document.createElement('div');
        //     container.classList.add('container');

        //     container.innerHTML = `
        //     <div class="game-result">choose an hand</div>
        //     <div class="score">
        //         <div class="user-score">user score: 0</div>
        //         <div class="pc-score">pc score: 0</div>
        //     </div>
        //     <div class="hands">
        //         <div class="pc-hand">pc choice: undefined</div>
        //         <div class="user-hand">user choice: undefined</div>
        //     </div>
        //     <div class="user-selection">
        //         <button id="rock">rock</button>
        //         <button id="paper">paper</button>
        //         <button id="scissors">scissors</button>
        //     </div>
        //     `

        //     startGame();
        // });

    }

}

function pcChoose(pcOptions: string[]): string {
    return pcOptions[Math.floor(Math.random() * pcOptions.length)]
}

startGame();