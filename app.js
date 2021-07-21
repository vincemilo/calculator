const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;
let value = 0;
let value2 = 0;
let operator = '';
let total = 0;

const operate = (operator, a, b) => operator == '+' ? add(a, b) 
                                : operator == '-' ? sub(a, b)
                                : operator == '*' ? mult(a, b)
                                : operator == '/' && b != 0 ? div(a, b)
                                : 'Error';

const container = document.querySelector('#container');

const display = document.createElement('div');
display.id = 'display';
display.textContent = value;
container.appendChild(display);

const buttonContainer = document.createElement('div');
buttonContainer.id = 'buttonContainer';
container.appendChild(buttonContainer);

const createButton = (button) => {
    let div = document.createElement('div');
    div.id = button;
    if(button == 'clr'){
        div.classList = 'clr';
        div.addEventListener('click', clear)
    } else if (button*1 || button == 0){
        div.classList = 'numbers';
        div.addEventListener('click', firstVal);
    } else if (button == '='){
        div.classList = 'equals';
        div.addEventListener('click', ()=> {
            if(value2){
            total = operate(operator, value*1, value2*1);
            display.textContent = total;
            }
        });
    } else {
        div.classList = 'operators';
        div.addEventListener('click', operators);
    }
    div.textContent = button;
    buttonContainer.appendChild(div);
};

const buttons = ['clr', '+', '-', '*', '/', '='];

for (let i=0; i<10; i++){
    buttons.push(i);
};

buttons.forEach(createButton);

const numSel = document.querySelectorAll('.numbers');

function operators(input){
    if(value2 || total){
        total = operate(operator, value*1, value2*1)
        display.textContent = total;
        operator = input.target.id;
        value = total;
        value2 = 0;
    }
    else {
        operator = input.target.id;
        numSel.forEach(elem => elem.removeEventListener('click', firstVal));
        numSel.forEach(elem => elem.addEventListener('click', nextVal));
    }
};

function clear(){
    display.textContent = 0;
    value = 0;
    value2 = 0;
    total = 0;
    numSel.forEach(elem => elem.addEventListener('click', firstVal));
    numSel.forEach(elem => elem.removeEventListener('click', nextVal));
}; 

function firstVal(num){
    val1 = num.target.id;
    if(!value){
        value = val1;
        display.textContent = val1;
    } else {
        display.textContent += val1;
        value += val1;
    }
};

function nextVal(input){
    val2 = input.target.id;
    if(!value2){
        value2 = val2;
        display.textContent = val2;
    } else {
        display.textContent += val2;
        value2 += val2;
    }
};