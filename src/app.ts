const rockBtn: HTMLButtonElement = document.querySelector('button#rock') as HTMLButtonElement;
const paperBtn: HTMLButtonElement = document.querySelector('button#paper') as HTMLButtonElement;
const scissorsBtn: HTMLButtonElement = document.querySelector('button#scissors') as HTMLButtonElement;

const userOptions: HTMLButtonElement[] = [rockBtn, paperBtn, scissorsBtn];

const pcOptions: string[] = ['rock', 'paper', 'scissors'];

let userChoice: string = '';
let pcChoice: string = '';
let result: string = ''

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

function winner(pcOptions: string[], userChoice: string, pcChoice: string): string {
    pcChoice = pcChoose(pcOptions);

    console.log(`user: ${userChoice}, pc: ${pcChoice}`);

    if (userChoice === pcChoice) {
        return 'tie';
    } else if (userChoice === 'rock') {
        if (pcChoice === 'paper') {
            return 'user win';
        } else {
            return 'pc win';
        }
    } else if (userChoice === 'paper') {
        if (pcChoice === 'rock') {
            return 'user win';
        } else {
            return 'pc win';
        }
    } else {
        if (pcChoice === 'paper') {
            return 'user win';
        } else {
            return 'pc win';
        }
    }
}

function pcChoose(pcOptions: string[]): string {
    return pcOptions[Math.floor(Math.random() * pcOptions.length)]
}