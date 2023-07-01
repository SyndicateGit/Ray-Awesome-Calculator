/*
Raymond's Calculator Project Requirements:
1) Display user input (numbers and operator) as buttons are pressed.
2) Clear button clears display and resets to default display of 0.
3) Delete button deletes last input (far right).
4) = sign evaluates user input and updates display with answer.
5) Updated answer display can continue
accepting inputs for further calculations.
8) Invalid input equation returns ERROR on display. 
9) Decimal numbers are allowed.
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

function decimal(a, b){
  b_length = ('' + b).length;
  return a + b * (10**(0-b_length));
}

/*Calls Math Function based on operator*/
function operate(a, operator, b){
  switch(operator){
    case '+':
      return add(a, b);
      break;
    case '-':
      return subtract(a, b);
      break;
    case 'x':
      return multiply(a, b);
      break;
    case '%':
      return divide(a, b);  
      break;
    case '.':
      return decimal(a, b);
      break;
    default:
      console.log("Something went wrong");
  }
}

display = []; // Stores display output, default 0.

// Retruns true if string is a number
function isNum(char){
  return /^\d$/.test(char);
}

// Process user input for updating display
function userInput(button){
  let input = button.target.id // ID of Button. Type: string
  if(input != '=' && input != 'CLEAR' && input != 'DELETE'){
    display.push(input)
    console.log(display);
    updateDisplay(display) 

  } else if(input == '='){
    evaluate(display);
  } else if (input == 'CLEAR'){
    clear();
    updateDisplay(display) 
  } else if (input == "DELETE"){
    Delete();
    updateDisplay(display) 
  }
}

// Updates display based on display[]
function updateDisplay(display){
  let output = '';
  if(display.length == 0){
    output = '0';
  } else{
    output = display.join(""); // convert display to string as output
  }
  let span = document.querySelector(".lower-display");
  span.innerHTML = output;
}

// Evaluates display[] math and updates display accordingly. 
function evaluate(locDisplay){

  //Error if beginning and end aren't integers (are operator) Also catches only 1 operator input = Error. 
  if(!isNum(locDisplay[0]) || !isNum(locDisplay.slice(-1))){
    errorMessage();
    return;
  }
  //Error if consecutive operators found
  else if(consecutiveOp(locDisplay)){
    errorMessage();
  }else{
    // Currently Sequentially evaluates operators without respecting BEDMAS. 
    let displayJ = joinDisplayIntegers(locDisplay);
    console.log(displayJ)
    //display J datatype:[int, 'operator', int, 'operator', int]
    // Idea: while loop occurances of ., evaluate, make new list with decimal integer spliced in. Then do for x, %. Then evaluate rest. 
    
    while(displayJ.includes('.')){
      index = displayJ.indexOf('.');
      decimalNum = evaluateOp(displayJ, index, displayJ[index-1]);
      displayJ.splice(index - 1, 3, decimalNum);
      console.log(displayJ)
    }
    
    while(displayJ.includes('x')){
      index = displayJ.indexOf('x');
      product = evaluateOp(displayJ, index, displayJ[index-1]);
      displayJ.splice(index - 1, 3, product);
    }
    while(displayJ.includes('%')){
      index = displayJ.indexOf('%');
      num = evaluateOp(displayJ, index, displayJ[index-1]);
      displayJ.splice(index - 1, 3, num);
    }
    while(displayJ.includes('+')){
      index = displayJ.indexOf('+');
      sum = evaluateOp(displayJ, index, displayJ[index-1]);
      displayJ.splice(index - 1, 3, sum);
    }
    while(displayJ.includes('-')){
      index = displayJ.indexOf('-');
      num = evaluateOp(displayJ, index, displayJ[index-1]);
      displayJ.splice(index - 1, 3, num);
    }

    newDisplay = parseFloat(displayJ[0].toFixed(6)).toString()
    updateDisplay([newDisplay]);
    display=newDisplay.split("")

  }
}


// Joines the integer portion of display into one element and return the output.
function joinDisplayIntegers(display){
  output = []
  currentInt = ''
  for(i = 0; i < display.length; i++){
    if(isNum(display[i])){
      currentInt += display[i];
    } else{
      output.push(parseFloat(currentInt));
      currentInt='';
      output.push(display[i]) // Operator
    }
  }
  if (currentInt != ''){
    output.push(parseFloat(currentInt));
  }
  return output;
}

// Evaluates the operation at index of operator and returns the answer.
function evaluateOp(display, indexOfOp, a){
  let operator = display[indexOfOp];
  let b = parseFloat(display[indexOfOp + 1]);
  return operate(a, operator, b);
}

// Detects if input has consecutive operators (invalid)
function consecutiveOp(display){
  for(i = 0; i < display.length - 1; i++){
    if(!isNum(display[i])){
      if(!isNum(display[i+1])){
        return true;
      }
    }
  }
  return false;
}

// Display Error message and resets input
function errorMessage(){
  let spanLower = document.querySelector(".lower-display");
  let spanUpper = document.querySelector(".upper-display");

  spanUpper = display.join("");
  spanLower.innerHTML = "ERROR";
  display = []; // Resets display[] after error.
}

// Clears display[] and updates display
function clear(){
  display = [];
  updateDisplay(display);
}

// Deletes last input from display[] and updates display
function Delete(){
  display.pop();
  updateDisplay(display);
}

/*Adds on click event listener to all buttons*/
const btns = document.querySelectorAll("button");

btns.forEach((button)=>{
  button.addEventListener("click", (button) => {
    userInput(button);
  })
});

