const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;

let value = 0;
let value2 = 0;
let operator = null;
let currentVal = 0;

const operate = (operator, a, b) => operator == '+' ? add(a, b) 
                                : operator == '-' ? sub(a, b)
                                : operator == '*' ? mult(a, b)
                                : operator == '/' && b != 0 ? div(a, b)
                                : 'Error';

const container = document.querySelector('#container');
window.addEventListener('keydown', keys);

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
        div.addEventListener('click', evaluate);
    } else if (button == '.'){
        div.classList = 'dot';
        div.addEventListener('click', dot);
    } else {
        div.classList = 'operators';
        div.addEventListener('click', operators);
    }
    div.textContent = button;
    buttonContainer.appendChild(div);
};

const buttons = ['clr', '+', '-', '*', '/', '=', '.'];

for (let i=0; i<10; i++){
    buttons.push(i);
};

buttons.forEach(createButton);

const numSel = document.querySelectorAll('.numbers');

function evaluate(){
    if(operator){
    value = operate(operator, value*1, value2*1);
    value = Math.round(value * 1000)/1000
    display.textContent = value;
    value2 = 0;
    currentVal = 0;
    }
}

function keys(e) {
    if (e.key >= 0 && e.key <=9){
        if (!currentVal){
            firstVal(e.key);
        } else {
            nextVal(e.key);
        }
    } else if (e.key === '.'){
        dot();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        operators(e.key);
    } else if (e.key === '=' || e.key === 'Enter'){
        evaluate();
    }
};

function dot(){
    //add dot to initial input
    if (!currentVal){
        if (!value || value == '0.'){
            value = '0.';
            display.textContent = '0.';
            console.log('!currentVal')
        } else if (value*1 % 1 == 0) {
            console.log(value)
            value += '.';
            display.textContent += '.';
            console.log('!currentVal .')
        } else {
            currentVal = 1;
            dot();
        }
    //add dot to next input
    } else if (currentVal && operator) {
        if (!value2 || value2 == '0.'){
            value2 = '0.'
            display.textContent = '0.'
        } else if (value2*1 % 1 == 0) {
            value2 += '.';
            display.textContent += '.';
            console.log('currentVal .')
        } else { 
            console.log('currentVal')
            console.log(value)
            console.log(value2)
        }
    } else {
        console.log('?')
        console.log(value)
        console.log(value2)
    }
};

function operators(e){
    //take first value
    if (!currentVal && !value2){
        if (e === '+' || e === '-' || e === '*' || e === '/'){
            operator = e;
        } else {
            operator = e.target.id;
        }
        numSel.forEach(elem => elem.removeEventListener('click', firstVal));
        numSel.forEach(elem => elem.addEventListener('click', nextVal));
        currentVal = 1;
        console.log('OP case1')
    //take next value
    } else if (operator && value2 !== '0.'){
        operate();
        if (e === '+' || e === '-' || e === '*' || e === '/'){
            operator = e;
        } else {
            operator = e.target.id;
        }
        console.log('OP case2')
    } else {
        console.log('OP case3')
        console.log(value)
        console.log(value2)
    }
};

function clear(){
    display.textContent = 0;
    value = 0;
    value2 = 0;
    currentVal = 0;
    numSel.forEach(elem => elem.addEventListener('click', firstVal));
    numSel.forEach(elem => elem.removeEventListener('click', nextVal));
}; 

function firstVal(e){
    if (e*1){
        val1 = e;
    } else {
        val1 = e.target.id;
    }
    if(!value){
        value = val1;
        display.textContent = val1;
    } else {
        display.textContent += val1;
        value += val1;
    }
};

function nextVal(e){
    if (e*1){
        val2 = e;
    } else {
        val2 = e.target.id;
    }
    if(!value2){
        value2 = val2;
        display.textContent = val2;
    } else {
        display.textContent += val2;
        value2 += val2;
    }
};