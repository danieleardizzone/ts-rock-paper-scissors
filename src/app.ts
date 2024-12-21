function startGame(): void {

    const totalMatches: number = 5;
    let matches: number = 0;
    let userScore: number = 0;
    let pcScore: number = 0;

    const rockBtn: HTMLButtonElement = document.querySelector('button#rock') as HTMLButtonElement;
    const paperBtn: HTMLButtonElement = document.querySelector('button#paper') as HTMLButtonElement;
    const scissorsBtn: HTMLButtonElement = document.querySelector('button#scissors') as HTMLButtonElement;

    const userChoiceDOMElement: HTMLElement = document.querySelector('.user-hand') as HTMLElement;
    const pcChoiceDOMElement: HTMLElement = document.querySelector('.pc-hand') as HTMLElement;
    const userChoiceImage: HTMLImageElement = userChoiceDOMElement.querySelector('img') as HTMLImageElement;
    const pcChoiceImage: HTMLImageElement = pcChoiceDOMElement.querySelector('img') as HTMLImageElement;
    const imgDirectory: string = './src/images/';

    const shakeSound = new Audio('./src/audios/rock-paper-scissors.mp3');

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

            disableArrBtns(userOptions);

            matches++

            pcChoice = pcChoose(pcOptions);

            handAnimation();

            // logica continua in handAnimation
            // pcChoiceImage.animate(
            //     pcHandShaking,
            //     shakeTiming
            // ).onfinish = () => { continua logica}
        });

    });

    function handAnimation(): void {

        userChoiceImage.src = `${imgDirectory}rock.png`;
        pcChoiceImage.src = `${imgDirectory}rock.png`;

        const userHandShaking = [
            { transform: 'rotate(-90deg) scaleX(-1)' },
            { transform: 'rotate(-60deg) scaleX(-1)' },
            { transform: 'rotate(-90deg) scaleX(-1)' },
        ];

        const pcHandShaking = [
            { transform: 'rotate(90deg)' },
            { transform: 'rotate(60deg)' },
            { transform: 'rotate(90deg)' },
        ];

        const shakeTiming: KeyframeAnimationOptions = {
            duration: 500,
            iterations: 3,
        };

        shakeSound.play();

        userChoiceImage.animate(
            userHandShaking,
            shakeTiming
        ).onfinish = () => {
            userChoiceImage.src = `${imgDirectory + userChoice}.png`;
        };

        pcChoiceImage.animate(
            pcHandShaking,
            shakeTiming
        ).onfinish = () => {
            pcChoiceImage.src = `${imgDirectory + pcChoice}.png`;

            winner();

            console.log(`result: ${result}`);
            console.log(`game number ${matches}`)

            updateDOMScores();

            if (matches === totalMatches) {
                setTimeout(gameOver, 2000);
            } else {
                enableArrBtns(userOptions);
            }

        };

    }

    function winner(): void {

        if (userChoice === pcChoice) {
            result = 'tie';
        } else if (userChoice === 'rock') {
            if (pcChoice === 'paper') {
                userScore++;
                result = 'user win';
            } else {
                pcScore++
                result = 'pc win';
            }
        } else if (userChoice === 'paper') {
            if (pcChoice === 'rock') {
                userScore++;
                result = 'user win';
            } else {
                pcScore++
                result = 'pc win';
            }
        } else {
            if (pcChoice === 'paper') {
                userScore++;
                result = 'user win';
            } else {
                pcScore++
                result = 'pc win';
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
        disableArrBtns(userOptions);

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

function disableArrBtns(arrBtns: HTMLButtonElement[]): void {
    arrBtns.forEach(Btn => {
        Btn.disabled = true;
    });
}

function enableArrBtns(arrBtns: HTMLButtonElement[]): void {
    arrBtns.forEach(Btn => {
        Btn.disabled = false;
    });
}



startGame();