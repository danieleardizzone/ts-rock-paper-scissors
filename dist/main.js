(function () {
    'use strict';

    function startGame() {
        const totalMatches = 5;
        let matches = 0;
        let userScore = 0;
        let pcScore = 0;
        const rockBtn = document.querySelector('button#rock');
        const paperBtn = document.querySelector('button#paper');
        const scissorsBtn = document.querySelector('button#scissors');
        const userChoiceDOMElement = document.querySelector('.user-hand');
        const pcChoiceDOMElement = document.querySelector('.pc-hand');
        const userOptions = [rockBtn, paperBtn, scissorsBtn];
        const pcOptions = ['rock', 'paper', 'scissors'];
        let userChoice = '';
        let pcChoice = '';
        let result = '';
        rockBtn.addEventListener('click', () => {
            userChoice = 'rock';
            result = winner();
            console.log(`result: ${result}`);
            console.log(`match number ${matches}`);
            updateDOMScores();
            if (matches === totalMatches) {
                console.log('parte game over');
                gameOver();
            }
        });
        paperBtn.addEventListener('click', () => {
            userChoice = 'paper';
            result = winner();
            console.log(`result: ${result}`);
            console.log(`game number ${matches}`);
            updateDOMScores();
            if (matches === totalMatches) {
                console.log('parte game over');
                gameOver();
            }
        });
        scissorsBtn.addEventListener('click', () => {
            userChoice = 'scissors';
            result = winner();
            console.log(`result: ${result}`);
            console.log(`game number ${matches}`);
            updateDOMScores();
            if (matches === totalMatches) {
                userOptions.forEach(option => {
                    option.disabled = true;
                });
                setTimeout(gameOver, 2000);
            }
        });
        function updateDOMScores() {
            const matchResultDOMElement = document.querySelector('.match-result');
            const userScoreDOMElement = document.querySelector('.user-score');
            const pcScoreDOMElement = document.querySelector('.pc-score');
            matchResultDOMElement.innerHTML = `result: ${result}`;
            userScoreDOMElement.innerHTML = `user score: ${userScore.toString()}`;
            pcScoreDOMElement.innerHTML = `pc score: ${pcScore.toString()}`;
        }
        function winner() {
            matches++;
            pcChoice = pcChoose(pcOptions);
            userChoiceDOMElement.innerHTML = `user choice: ${userChoice}`;
            pcChoiceDOMElement.innerHTML = `pc choice: ${pcChoice}`;
            console.log(`user: ${userChoice}, pc: ${pcChoice}`);
            if (userChoice === pcChoice) {
                return 'tie';
            }
            else if (userChoice === 'rock') {
                if (pcChoice === 'paper') {
                    userScore++;
                    return 'user win';
                }
                else {
                    pcScore++;
                    return 'pc win';
                }
            }
            else if (userChoice === 'paper') {
                if (pcChoice === 'rock') {
                    userScore++;
                    return 'user win';
                }
                else {
                    pcScore++;
                    return 'pc win';
                }
            }
            else {
                if (pcChoice === 'paper') {
                    userScore++;
                    return 'user win';
                }
                else {
                    pcScore++;
                    return 'pc win';
                }
            }
        }
        function gameOver() {
            const container = document.querySelector('.container');
            container.innerHTML = '';
            const finalResult = document.createElement('h1');
            if (userScore === pcScore) {
                finalResult.innerHTML = "It's a TIE";
            }
            else if (userScore > pcScore) {
                finalResult.innerHTML = 'You WON';
            }
            else {
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
    function pcChoose(pcOptions) {
        return pcOptions[Math.floor(Math.random() * pcOptions.length)];
    }
    startGame();

})();
//# sourceMappingURL=main.js.map
