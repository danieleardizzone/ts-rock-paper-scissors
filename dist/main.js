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
        const userChoiceImage = userChoiceDOMElement.querySelector('img');
        const pcChoiceImage = pcChoiceDOMElement.querySelector('img');
        const imgDirectory = './src/images/';
        const shakeSound = new Audio('./src/audios/rock-paper-scissors.mp3');
        const userOptions = [rockBtn, paperBtn, scissorsBtn];
        const pcOptions = ['rock', 'paper', 'scissors'];
        let userChoice = '';
        let pcChoice = '';
        let result = '';
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
                userOption.disabled = true;
                matches++;
                pcChoice = pcChoose(pcOptions);
                handAnimation();
                // logica continua in handAnimation
                // pcChoiceImage.animate(
                //     pcHandShaking,
                //     shakeTiming
                // ).onfinish = () => { continua logica}
            });
        });
        function handAnimation() {
            userChoiceImage.src = `${imgDirectory}rock.png`;
            pcChoiceImage.src = `${imgDirectory}rock.png`;
            const userHandShaking = [
                { rotate: '-90deg' },
                { rotate: '-60deg' },
                { rotate: '-90deg' },
            ];
            const pcHandShaking = [
                { rotate: '90deg' },
                { rotate: '60deg' },
                { rotate: '90deg' },
            ];
            const shakeTiming = {
                duration: 500,
                iterations: 3,
            };
            shakeSound.play();
            userChoiceImage.animate(userHandShaking, shakeTiming).onfinish = () => {
                userChoiceImage.src = `${imgDirectory + userChoice}.png`;
            };
            pcChoiceImage.animate(pcHandShaking, shakeTiming).onfinish = () => {
                pcChoiceImage.src = `${imgDirectory + pcChoice}.png`;
                winner();
                console.log(`result: ${result}`);
                console.log(`game number ${matches}`);
                updateDOMScores();
                if (matches === totalMatches) {
                    setTimeout(gameOver, 2000);
                }
                else {
                    userOptions.forEach(userOption => {
                        userOption.disabled = false;
                    });
                }
            };
        }
        function winner() {
            if (userChoice === pcChoice) {
                result = 'tie';
            }
            else if (userChoice === 'rock') {
                if (pcChoice === 'paper') {
                    userScore++;
                    result = 'user win';
                }
                else {
                    pcScore++;
                    result = 'pc win';
                }
            }
            else if (userChoice === 'paper') {
                if (pcChoice === 'rock') {
                    userScore++;
                    result = 'user win';
                }
                else {
                    pcScore++;
                    result = 'pc win';
                }
            }
            else {
                if (pcChoice === 'paper') {
                    userScore++;
                    result = 'user win';
                }
                else {
                    pcScore++;
                    result = 'pc win';
                }
            }
        }
        function updateDOMScores() {
            const matchResultDOMElement = document.querySelector('.match-result');
            const userScoreDOMElement = document.querySelector('.user-score');
            const pcScoreDOMElement = document.querySelector('.pc-score');
            matchResultDOMElement.innerHTML = `result: ${result}`;
            userScoreDOMElement.innerHTML = `user score: ${userScore.toString()}`;
            pcScoreDOMElement.innerHTML = `pc score: ${pcScore.toString()}`;
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
