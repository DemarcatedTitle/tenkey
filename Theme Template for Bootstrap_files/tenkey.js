//Adds a num button with appropriate classes to the div specified by a class name. 
var numButtonDiv = document.getElementsByClassName("numButtonDiv");
var numButton = document.createElement("button");
numButton.className = "numlock btn btn-lg btn-default";
numButton.textContent = "Num";
numButtonDiv[0].appendChild(numButton);
var tenkeyli = [];
var enteredNumber = "";
var operator = "";
var answer = "";
var lastKeyPressed = "";
var equation = [];
var header;
var tenKeyIsOpen;
var calculator = {
    enteredNum : "",
    equation : [],
    operator : "",
    answer : "",
    lastKey : "",
    header : "",
    tenKeyIsOpen : "",
    Calculate :"",
}


//The block of html of the tenkey button pad. 
var TenKeyHTML = '\
<h2>Ten Key</h2>\
      <ul>\
        <li><button type="button" class="numlock btn btn-lg btn-default">Num Lock</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">/</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">*</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">-</button></li>\
      </ul>\
      <ul>\
        <li><button type="button" class="btn btn-lg btn-default">7</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">8</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">9</button></li>\
        <li><button type="button" class="tallbtn btn btn-lg btn-default">+</button></li>\
      </ul><ul>\
        <li><button type="button" class="btn btn-lg btn-default">4</button></li>\
        <li><button type="button" class="btn btn-lg btn-default"><u>5</u></button></li>\
        <li><button type="button" class="btn btn-lg btn-default">6</button></li>\
      </ul>\
      <ul>\
        <li><button type="button" class="btn btn-lg btn-default">1</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">2</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">3</button></li>\
        <li><button type="button" class="tallbtn btn btn-lg btn-default">Enter</button></li>\
      </ul>\
      <ul>\
        <li><button type="button" class="widebtn btn btn-lg btn-default">0</button></li>\
        <li><button type="button" class="btn btn-lg btn-default">.</button></li>\
      </ul>';

//This function gets called on a click
var openTenkey = function () {
//if the div doesn't have the html of the tenkey, add it and add a listener so you can click again to run this function again. 
    if (numButtonDiv[0].innerHTML === numButton.outerHTML) {
        numButtonDiv[0].innerHTML = TenKeyHTML;
        numButton = document.getElementsByClassName("numlock")[0];
        numButton.addEventListener("click", openTenkey);
        header = numButtonDiv[0].getElementsByTagName("h2")[0];
        tenKeyIsOpen = true;
        addListeners(enteredNumber)    

    } else {
        //if the div does have the html of the tenkey, this clears the tenkey's html and adds a numbutton, also adding an event listneer so you can click and run the function again. 
        numButton = document.createElement("button");
        numButton.className = "numlock btn btn-lg btn-default";
        numButton.textContent = "Num";
        numButtonDiv[0].innerHTML = "";
        numButtonDiv[0].appendChild(numButton);
        console.log('else');
        numButton.addEventListener("click", openTenkey);
        tenKeyIsOpen = false;

    }
}

//Get a number
var getANumber = function (pressed) {
    if ((lastKeyPressed === "Enter") && !(pressed === "/" || pressed === "*" || pressed === "-" || pressed === "+")) {
        enteredNumber = "";
        equation = "";
        answer = "";
    }
    if ((parseInt(pressed) | pressed === ".") && (String(enteredNumber).indexOf('.') === -1)) {
        enteredNumber = String(enteredNumber) + pressed;
        header.textContent = enteredNumber;
    } else if (isNaN(parseInt(pressed)) === false) {
        enteredNumber = String(enteredNumber) + pressed;
        header.textContent = enteredNumber;
    }
}


//var isOperator = function (pressed) {
//  //If the button pressed is an operator AND the equation doesn't already have an operator
//  if (pressed === "/" | pressed === "*" | pressed === "-" | pressed === "+") {
//    if (pressed !== lastKeyPressed) {
//      
//      if (equation.indexOf(pressed) === -1) {
//        operator = pressed;
//        header.textContent = pressed;
//        equation = enteredNumber + operator;
//        enteredNumber = "";
//      } 
//      else if (equation.indexOf(pressed) !== -1)
//      {
//        evaluate(pressed);
//        operator = pressed;
//      }
//    } else {
//      alert("You pressed an operator twice!");
//    }
//}
//}


var isOperator = function (pressed) {
    if (pressed === "/" | pressed === "*" | pressed === "-" | pressed === "+") {
    return true
    }
}

var isEnter = function (pressed) {
    if (pressed === "Enter") {
        return true
    }
}

var sameKey = function (pressed) {
    if (pressed === lastKeyPressed) {
        return true
    }
}

var isPartOfNumber = function (pressed) {
    if ((isNaN(pressed) === false) || (pressed === ".")) {
        return true
    }  
}

var canEvaluate = function(pressed) {
//If the equation 0 is integer
//if equation 1 is operator
//if equation 2 is integer
	return true
};




//Evalutates the equation. 
var evaluate = function (pressed) {
    if (String(enteredNumber).length >=1){
        if (pressed === "/" | pressed === "*" | pressed === "-" | pressed === "+") {  
            equation = equation + pressed;
            enteredNumber = "";
            answer = eval(equation)
        } else {
            equation = equation + enteredNumber;
            enteredNumber = "";
            answer = eval(equation)
        }
    } else if (String(enteredNumber).length === 0) {
        equation = equation + operator;
    }
    header.textContent = answer;
    //equation = "";

}


////Determines if pressed was enter as well as if the last key was enter. 
//var isEnter = function (pressed) {
//  if ((pressed === "Enter") && (lastKeyPressed !== "Enter")) {
//    evaluate(pressed);
//    console.log('enter');
//    if (lastKeyPressed === "Enter") {
//      alert('You pressed enter twice')
//    }
//  }
//  
//}


//This function outputs to the header the text content of what is pressed. 
var headerOutput = function (pressed) {
    if (tenKeyIsOpen){
        var header = numButtonDiv[0].getElementsByTagName("h2")[0].textContent;
        getANumber(pressed)
        isOperator(pressed)
        isEnter(pressed)
        lastKeyPressed = pressed;
    }
}


//Makes it so that whenever you click a button the appropriate thing happens. 
var addListeners = function() {
    tenkeyli = numButtonDiv[0].getElementsByTagName("li");
    for (var i = 0; i < tenkeyli.length; i++) {
        var inputbtn = tenkeyli[i]
        var input = this.textContent;

        inputbtn.addEventListener("click", function(){headerOutput(this.textContent)});
    };
 

}

//The initial event listener that if you click, will allow you to run the openTenkey function which ultimately allows you to toggle the tenkey's existence. 
numButton.addEventListener("click", openTenkey);

//To do: Add an event listener system for the buttons in the tenkey. 
//Perhapse just add a class to each button and have something cycle through them as an array of .numButtonDiv .buttons(?) [i]
//Add at least a minimal functionality of having button presses/calculations displayed either to the h2 or something else. 
//Maaaybe do something that generates enough html/css to have a calculator up to like 100ish that doesn't use javascript. 
//Maybe something for multiple tenkeys. 

//equation = enteredNumber + operator + secondNumber;
//    answer = eval(equation);



//What should happen:
if (ispartofNumber(pressed)) {
//pressed is added to the equation or a string
    
}

if (isOperator(pressed)) {
    //1. Check if there's already an operator or period. 
    if ( equation[1] === pressed ){
        
    }
    //2. if not - (negative) Check if there's a number
    //3. if there's already an equation loaded up, evaluate it
    //4. add the operator to the string/equation
}

if (isEnter(pressed)) {
    function () { };
//Check if it's able to be evaluated

//if it can, evaluate. 

//if not, alert.

}


//Evalutate, triggered by Enter and by pressing operator(if equation is already valid)
//
//
//
//
//
//Number, operator, number, operator(evaluate), number, (evaluate)
// How it should go: 1 + 2 + 3 = 6
// It is going 1 + 2 + 3 = 24
//The second operator isn't being included

//evaluate()
//equation[2] = enteredNumber;
//answer = eval(equation[0]+equation[1]+equation[2]);
//equation[0] = answer;
//equation[1] = "";
//equation[2] = "";
//
// 1 + 2 + 
