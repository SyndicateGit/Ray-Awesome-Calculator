/*
Raymond's Calculator Project Requirements:
1) Display user input (numbers and operator) as buttons are pressed.
2) Clear button clears display and resets to default display of 0.
3) Delete button deletes last input (far right).
4) = sign evaluates user input and updates display with answer.
5) Updated answer display can continue
accepting inputs for further calculations.
6) Can handle sequential operations such as 1 + 2 x 3.
7) Evaulation respects BEDMAS
8) Invalid input equation returns ERROR on display. 
9) Decimal numbers are allowed.
10) Cannot have 10.4.5 (disable decimal when one is active).
11) Add keyboard support
*/

/*Basic Math Functions */
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

/*Calls Math Function based on operator*/
function operate(a, operator, b){
  switch(operator){
    case '+':
      add(a, b);
      break;
    case '-':
      subtract(a, b);
      break;
    case 'x':
      multiply(a, b);
      break;
    case '%':
      divide(a, b);  
      break;
  }
}

var display = []; // Stores display output

var currentInput = ""; // Stores current input to be added to display

function updateDisplay(){
  
}

document.getElementsByClassName("button").addEventListener("click", updateDisplay());
