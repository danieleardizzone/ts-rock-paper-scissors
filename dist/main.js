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
                disableArrBtns(userOptions);
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
                { transform: 'rotate(-90deg) scaleX(-1)' },
                { transform: 'rotate(-60deg) scaleX(-1)' },
                { transform: 'rotate(-90deg) scaleX(-1)' },
            ];
            const pcHandShaking = [
                { transform: 'rotate(90deg)' },
                { transform: 'rotate(60deg)' },
                { transform: 'rotate(90deg)' },
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
                showResult();
                if (matches === totalMatches) {
                    setTimeout(gameOver, 2000);
                }
                else {
                    enableArrBtns(userOptions);
                }
            };
        }
        function winner() {
            if (userChoice === pcChoice) {
                result = "It's a Tie";
            }
            else if (userChoice === 'rock') {
                if (pcChoice === 'paper') {
                    userScore++;
                    result = 'You Win';
                }
                else {
                    pcScore++;
                    result = 'You Lose';
                }
            }
            else if (userChoice === 'paper') {
                if (pcChoice === 'rock') {
                    userScore++;
                    result = 'You Win';
                }
                else {
                    pcScore++;
                    result = 'You Lose';
                }
            }
            else {
                if (pcChoice === 'paper') {
                    userScore++;
                    result = 'You Win';
                }
                else {
                    pcScore++;
                    result = 'You Lose';
                }
            }
        }
        function updateDOMScores() {
            const matchResultDOMElement = document.querySelector('.match-result');
            const matchCountDOMElement = document.querySelector('.match-count');
            const userScoreDOMElement = document.querySelector('.user-score');
            const pcScoreDOMElement = document.querySelector('.pc-score');
            matchResultDOMElement.innerHTML = `${result}`;
            matchCountDOMElement.innerHTML = `Match ${matches} / ${totalMatches}`;
            userScoreDOMElement.innerHTML = `user score: ${userScore.toString()}`;
            pcScoreDOMElement.innerHTML = `pc score: ${pcScore.toString()}`;
        }
        function showResult() {
            const overlay = document.querySelector('.overlay');
            const matchResultDOMElement = document.querySelector('.match-result');
            const container = document.querySelector('.container');
            overlay.classList.remove('visibility-hidden');
            matchResultDOMElement.classList.remove('visibility-hidden');
            container.classList.add('disabled');
            setTimeout(() => {
                overlay.classList.add('visibility-hidden');
                matchResultDOMElement.classList.add('visibility-hidden');
                container.classList.remove('disabled');
            }, 1500);
        }
        function gameOver() {
            const overlay = document.querySelector('.overlay');
            const finalResult = document.querySelector('.final-result');
            const restartBtn = document.querySelector('#restart-game');
            const container = document.querySelector('.container');
            overlay.classList.remove('visibility-hidden');
            finalResult.classList.remove('visibility-hidden');
            restartBtn.classList.remove('visibility-hidden');
            container.classList.add('disabled');
            if (userScore === pcScore) {
                finalResult.innerHTML = "It's a TIE";
            }
            else if (userScore > pcScore) {
                finalResult.innerHTML = 'You WON';
            }
            else {
                finalResult.innerHTML = 'You LOSE';
            }
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
    function disableArrBtns(arrBtns) {
        arrBtns.forEach(Btn => {
            Btn.disabled = true;
        });
    }
    function enableArrBtns(arrBtns) {
        arrBtns.forEach(Btn => {
            Btn.disabled = false;
        });
    }
    startGame();

})();
//# sourceMappingURL=main.js.map
