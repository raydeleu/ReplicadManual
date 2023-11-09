## A.1 How to learn to program? 

For this manual it is assumed that the reader has at least some programming experience. If not, then there are plenty of tutorials available on-line to get some experience in programming. It is difficult to give some advice on which programming language should be the first choice when learning to program. The Python programming language is probably a good starting point for many people as this is a relatively simple language that can be used for both small scripts - even as a small calculator inside a console window - and large programs. Python is also used extensively as a scripting language for other software packages. For example for people that are interested in 3D modelling two other interesting programs are Freecad (https://www.freecadweb.org/) and Blender (https://www.blender.org/). Both programs can be extended using Python scripts. When working on MacOS, Python is already pre-installed. Opening a console window and typing "python" or "python3" is sufficient to get a socalled interactive session to run Python scripts. When working on Windows or Linux it is probably necessary to install Python. Go to https://www.python.org/ to find your options for each operating system. 

Another interesting choice, especially when you want to work with Replicad, is to use Javascript. Javascript is a scripting language that is used often in web pages. When you are reading this in a web browser, you already have software available to run Javascript. In Google Chrome you can open the developer tools, either via the menu or by pressing kbd:[F12]. In the sidebar that appears there is a tab called "console". In this console you can test little pieces of Javascript code, such as assigning values to variables and writing small functions. For larger experiments the code can be better embedded into a html-page. 

And of course you can also start to program Javascript using Replicad! Many of the general concepts of programming will be necessary to work with Replicad and if you start with small examples and build from them, you will automatically learn more and more of the programming language. 

https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
https://www.w3schools.com/js/default.asp


## Comments 
Comments in the code are used to add clarifications or to block execution of a particular part of the code. There are two types of comments, namely line comments identified with `//` and block (multiline) comments that are enclosed in `/*` and `*/`. 

[source, javascript]
----
// This is a single line comment
let speed_ms  = 20 ; // speed in meters per second
let speed_kmh = speed_ms * 60 * 60 / 1000;  

/* The code above can be
  used to calculate the speed in km/hr from 
  a speed in meters per second */ 
----  

## Variables
Javascript variables may be considered to be containers for data values. A variable can be declared with the keyword `var`, `let` or `const`. The keyword `var` was used before 2015 and is most widely supported. The more modern version is to use `let` for variables with a restricted scope - so for example if they are declared inside a function they are only available within that function - and the keyword `const` to define a variable that will never be reassigned. For example, the conversion factor between feet and meters can be declared as a `const` as this will never change, whereas the length of a car should be defined using `let`.  

[source, javascript]
----
let rateHour = 30 ;
let hoursWeek = 36 ;
let rateWeek   = rateHour * hoursWeek
console.log(rateWeek)
console.log(typeof rateWeek)
----

Once the variable is declared it can be used without the keyword. Note that opposed to many other programming languages it is not necessary to determine the type of variable up front. The declaration of the type of the variable is performed implicit by assigning a value. The `typeof` function can be used to determine the type of a variable. 

=== Arrays
An array is a special type of variable that consists of a list of values that can be identified by a name and an index value. 

[source, javascript]
----
let fruit = [];
fruit[0] = "Cherry"
fruit[1] = "Apple"
fruit[3] = "Banana"

// or use the short form 

const fruit = new Array("Cherry", "Apple", "Banana");
----

The content of the variable can be anything, so also another array. The following array defines points that can be used in CascadeStudio. Each point is a small array containing the x,y,z coordinate of each point. 

[source, javascript]
----
const points = [];
points[0]= [0,0,0];
points[1]= [0,5,0];
points[2]= [5,5,0];
----


## Operations
The following basic math operations are supported:



|*Operator*     | *Symbol* 	| *Order*  
|---------------|-----------|----------
|Addition 	    | + 		    |  3
|Subtraction 	  | - 		    |  3
|Multiplication | *		      |  2
|Division 	    | / 		    |  2	
|Remainder 	    | %		      |  2
|Exponentiation | **		    |  1

Javascript uses the standard precedence for these operators (see order in table above). When in doubt use brackets to influence which parts of the equations should be evaluated first. 

More complicated mathematical operators can be called by using the Math library. This library contains many functions such as sqrt(), pow(), exp(), log(), sin(), cos(), tan(), asin(), acos(), atan(), abs(), floor(), ceil() and many more. The functions are called using the library name first and then appending the function call, so for example `Math.sqrt()`. It also contains constants such as pi (Math.PI) and Euler's number e (Math.E). 

Like the c programming language Javascript recognizes the "modify in place" notation for operations where an operator is applied to a variable and the result is stored in the original variable. So for example 

[source, javascript]
----
let n = 2;
n = n + 5;
n = n * 2;
i = i+1
----

can also be written as: 

[source, javascript]
----
let n = 2;
n += 5; 	// now n = 7 (same as n = n + 5)
n *= 2; 	// now n = 14 (same as n = n * 2)
alert( n ); 	// 14
i++
----

Comparisons use the same notation as other programming languages: 

| Comparison                      | Code
| --------------------------------|----------------------------------------------------|
| Greater/less than		            |	`a > b, a < b  `
| Greater/less than or equals 	  |	`a >= b, a <= b `
| Equals			                    | 	 `a == b ` 
| Not equal 			                | 	`a != b	`
| quality without type conversion  | 	'a === b'


Note that the equality is tested with a==b, a single equal sign is used for an assignment of a value to a variable. 

[#loops]
=== Loops and conditional statements

==== Loops
Javascript supports different types of loops and iterations. 

| Type of loop              | Purpose
| --------------------------|----------------------------------------------------|
| for statement			        | iteration over a range of numbers
| for...in statement		    | iteration over all elements in an list or array
| for...of statement		    | iteration over value elements only
| do...while statement		  | iteration until a condition becomes false
| while statement		        | iteration as long as a condition is true

Javascript allows very complex loop statements using additional features such as labeled statements, a `break` statement to break out of a loop or labeled loop, and a  `continue` statement to continue a labeled loop. Most of these features will not be needed in CascadeStudio as the input should be very predictable. In almost all cases the for loop will be sufficient. 

The for loop is used like this: 

[source, javascript]
----
// for (let i=0 ; i<=n ; i++){   }
// if you want another increment use something like i+= 4 instead of i++ 

for (let h = 1; h <= 720; h++)
{
    calculatedGherkin.LineTo( [ equationGherkin(h/4) , h/4])
}
----

Javascript also offers a `.map` method to quickly iterate over all elements of an array. The parameter of the `.map` is the name of a function that is to be applied to each item of the array. The following example also shows a shorthand version to define a function in a single line (see also <<#function_section>>). 

[source,javascript]
----
let numbers = [4, 9, 16, 25];
let Square = item => item**2
let x = numbers.map(Math.sqrt)
let z = numbers.map(Square)
console.log(x)  // [2,3,4,5]
console.log(z)  // [16,81,256,625]
---- 

The `.map` method looks very similar to the `.forEach` method. The difference however is that the `.forEach` method changes the array and performs a function once for every element of an array, even of this element has no value. 

[source,javascript]
----
numbers.forEach(myFunction);
----

A more complete example of the forEach method is: 

[source,javascript]
----
const words = ['hello', 'bird', 'table', 'football', 'pipe', 'code'];
const capWords = words.forEach(capitalize);
 
function capitalize(word, index, arr) {
  arr[index] = word[0].toUpperCase() + word.substring(1);
}
console.log(words);
// Expected output:
// ["Hello", "Bird", "Table", "Football", "Pipe", "Code"]
----
or with values

[source,javascript]
----
function func() {
        
        // Original array
        const items = [1, 29, 47];
        const copy = [];
  
        items.forEach(function (item) {
            copy.push(item * item);
        });
  
        document.write(copy);
    }
    func();
----

### Conditional statements
The basic shape of the conditional statement is: 

[source, javascript]
----
if (condition) {
  	statements when condition is true;
} else {
  	statement when condition is not true;
}
----

It is also possible to test different conditions using the `else if (condition)` until the final `else` statement. 
Conditions can be combined using OR, AND and NOT combinations. These are written as `||` (OR), `&&` (AND) and `!` (NOT, result = !value). 

Another type of conditional statement is the `switch` statement: 

[source, javascript]
----
switch (expression) {
  case label_1:
    statements_1
    [break;]
  case label_2:
    statements_2
    [break;]
    …
  default:
    statements_def
    [break;]
}
---- 

The switch statement is more useful to react on user input. For CascadeStudio this statement will not be used often as the interaction with the user is limited. 

[#function_section]
## Functions
A function is a way to perform some operations on inputs and return the result. This is most useful when the operations are complex so that the function can abstract these operations and reduce the effort to write code. 

[source, javascript]
----
function FahrenheitToCelsius(degFahrenheit) {
  return (5/9) * (degFahrenheit-32);
}

let degF = 68.0;
let degC = FahrenheitToCelsius(degF);
let conversionText = String(degF) + " degrees Fahrenheit is " + String(degC) + " degrees Celsius";
console.log(conversionText);
----

Variables that are declared inside a function are only visible inside the function. Therefore the function can be regarded as a kind of magic box, where you feed in some variables and some behaviour or values are received as output. The calculation that proceeds inside the function need not be visible to the user. 

A shorthand version to declare a function is the socalled arrow function expression. 

[source, javascript]
----
let Square = item => item**2
let F2C = f => (5/9) * (f-32)  // shorthand for function FahrenheitToCelsius

let Strange = (x, y) => {
   let delta = 1;
   return delta + x*y;
}
----


## Modules
A module is a way to divide your code into large chunks that can be reused. The concept is comparable to that of a library that can be loaded into your code and keeps your scripts small and comprehensive. The concept of modules is relatively new in javascript and became necessary after the size and complexity of the scripts grew. Not all browser implementations of javascript support the same functionality. 

The default way to use modules is to declare these in your HTML file. Functions that are defined in modules have to be imported into your main script to be able to use these. At the same time the function has to be exported from the module. A somewhat simpler way to work with modules in Replicad is to attach your own code to an existing library or module. 

If you want to use the online version of Replicad it is not possible to load modules as the modules are supposed to be at the server of Replicad. Even for the web app that runs locally the code still refers to the Replicad site as the home directory to store additional modules.   

=== Objects
Javascript can use objects to define data and methods that can be applied to these data. This can look like: 

[source,javascript]
---
let car = {type:"Tesla", power:"Electricity", color: white, length:5.1 };
---

The result of this assignment is that: 

[source,javascript]
---
car.type = Tesla
car.length = 5.1
---

We can also assign methods to objects. Methods are functions that describe the behaviour of an object. So for example a method for a car could be start(), charge(), stop(). 

In Replicad we encounter this approach in the definition of sketches. Each sketch is a new object, hence the declaration `new Sketcher`. Then we apply methods to the sketch to let the sketch grow. For example, with the methods `.lineTo()` we call the lineTo method of the object. 
In the definition of a function we can use the `this` keyword for the method to refer to the owner of the method. `This` always refers to the local object or the current parent of a function. 




