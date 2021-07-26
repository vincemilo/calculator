//operate functions
const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mult = (a, b) => a*b;
const div = (a, b) => a/b;

//initial values
let value = 0;
let value2 = '';
let operator = null;
let currentVal = 0;

//operate function
const operate = (op, a, b) => op == '+' ? add(a, b) 
                                : op == '-' ? sub(a, b)
                                : op == '*' ? mult(a, b)
                                : op == '/' && b != 0 ? div(a, b)
                                : 'Error';

//creates main container                                
const container = document.querySelector('#container');
window.addEventListener('keydown', keys);

//creates display
const display = document.createElement('div');
display.id = 'display';
display.textContent = value;
container.appendChild(display);

//creates button grid
const buttonContainer = document.createElement('div');
buttonContainer.id = 'buttonContainer';
container.appendChild(buttonContainer);

//creates buttons and adds functions
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
    } else if (button == 'del'){
        div.classList = 'del';
        div.addEventListener('click', del);
    } else {
        div.classList = 'operators';
        div.addEventListener('click', operators);
    }
    div.textContent = button;
    buttonContainer.appendChild(div);
};

//button values
const buttons = ['clr', 'del', 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', '.', 0, '=', '+',];

//create buttons
buttons.forEach(createButton);

//button selectors
const numSel = document.querySelectorAll('.numbers');
const opSel = document.querySelectorAll('.operators');

//delete function
function del(){
    if(!currentVal){
        if(value && value[1]){
        display.textContent = value.slice(0, -1);
        value = value.slice(0, -1);
        } else {
            display.textContent = 0;
            value = 0;
        }
    } else {
        if (value2 && value2[1]){
            display.textContent = value2.slice(0, -1);
            value2 = value2.slice(0, -1);
        } else {
            display.textContent = 0;
            value2 = '';
        }
    }
}

//evaluate function
function evaluate(){
    if(operator && value2*1){
        value = operate(operator, value*1, value2*1);
        value = Math.round(value * 1000)/1000
        display.textContent = value;
        value2 = '';
    } else if (operator && value2 === 0){
        value = operate(operator, value*1, value2*1);
        if (value == 'Error'){
            alert("Can't divide by zero!");
            clear();
        } else {
            value = operate(operator, value*1, value2*1);
            value = Math.round(value * 1000)/1000
            display.textContent = value;
            value2 = '';
        }
    } else {
        console.log('test3')
    }
};

//checks for keypress
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
        e.preventDefault();
        operators(e.key);
    } else if (e.key === '=' || e.key === 'Enter'){
        evaluate();
    } else if (e.key === 'Backspace' || e.key === 'Delete'){
        del();
    } else if (e.key === 'Escape'){
        clear();
    }
};

function dot(){
    //add dot to initial input
    if (!currentVal){
        if (!value || value == '0.'){
            value = '0.';
            display.textContent = '0.';
        } else if (value*1 % 1 == 0) {
            value += '.';
            display.textContent += '.';
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
        } else { 
            console.log('currentVal')
        }
    } else {
        console.log('?')
    }
};

function operators(e){
    //take first value
    if (!currentVal && !value2){
        operatorCheck(e);
        numSel.forEach(elem => elem.removeEventListener('click', firstVal));
        numSel.forEach(elem => elem.addEventListener('click', nextVal));
        currentVal = 1;
    //take next value
    } else {
        operatorCheck(e);
        evaluate();
    }
};

//check if keypress or click
function operatorCheck(e){
    if (e === '+' || e === '-' || e === '*' || e === '/'){
        operator = e;
    } else {
        operator = e.target.id;
    }
    // opSel.forEach(elem => {
    //     if(elem.id == operator){
    //         console.log(elem.classList.toggle('active'));
    // }
    // })
};

//clear function
function clear(){
    display.textContent = 0;
    value = 0;
    value2 = '';
    currentVal = 0;
    operator = null;
    numSel.forEach(elem => elem.addEventListener('click', firstVal));
    numSel.forEach(elem => elem.removeEventListener('click', nextVal));
}; 

//checks for keypress vs click then returns val
function firstVal(e){
    if (e*1+1){
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

//nextval function
function nextVal(e){
    if (e*1+1){
        val2 = e;
    } else {
        val2 = e.target.id;
    }
    if(!value2){
        value2 = val2*1;
        display.textContent = val2;
    } else {
        display.textContent += val2;
        value2 += val2;
    }
};