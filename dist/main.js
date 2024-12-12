(function () {
    'use strict';

    const rockBtn = document.querySelector('button#rock');
    const paperBtn = document.querySelector('button#paper');
    const scissorsBtn = document.querySelector('button#scissors');
    const pcOptions = ['rock', 'paper', 'scissors'];
    let userChoice = '';
    let pcChoice = '';
    let result = '';
    rockBtn.addEventListener('click', () => {
        userChoice = 'rock';
        result = winner(pcOptions, userChoice, pcChoice);
        console.log(`result: ${result}`);
    });
    paperBtn.addEventListener('click', () => {
        userChoice = 'paper';
        result = winner(pcOptions, userChoice, pcChoice);
        console.log(`result: ${result}`);
    });
    scissorsBtn.addEventListener('click', () => {
        userChoice = 'scissors';
        result = winner(pcOptions, userChoice, pcChoice);
        console.log(`result: ${result}`);
    });
    function winner(pcOptions, userChoice, pcChoice) {
        pcChoice = pcChoose(pcOptions);
        console.log(`user: ${userChoice}, pc: ${pcChoice}`);
        if (userChoice === pcChoice) {
            return 'tie';
        }
        else if (userChoice === 'rock') {
            if (pcChoice === 'paper') {
                return 'user win';
            }
            else {
                return 'pc win';
            }
        }
        else if (userChoice === 'paper') {
            if (pcChoice === 'rock') {
                return 'user win';
            }
            else {
                return 'pc win';
            }
        }
        else {
            if (pcChoice === 'paper') {
                return 'user win';
            }
            else {
                return 'pc win';
            }
        }
    }
    function pcChoose(pcOptions) {
        return pcOptions[Math.floor(Math.random() * pcOptions.length)];
    }

})();
//# sourceMappingURL=main.js.map
