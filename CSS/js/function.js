// Function that returns a string representing a cup of green tea
const prepareTea = () => 'greenTea';

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (numOfCups) => {
  const teaCups = [];

  for(let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea();
    teaCups.push(teaCup);
  }
  return teaCups;
};

// Only change code below this line
const tea4TeamFCC = getTea(40);
// Only change code above this line

---
// Function that returns a string representing a cup of green tea
const prepareGreenTea = () => 'greenTea';

// Function that returns a string representing a cup of black tea
const prepareBlackTea = () => 'blackTea';

/*
Given a function (representing the tea type) and number of cups needed, the
following function returns an array of strings (each representing a cup of
a specific type of tea).
*/
const getTea = (prepareTea, numOfCups) => {
  const teaCups = [];

  for(let cups = 1; cups <= numOfCups; cups += 1) {
    const teaCup = prepareTea();
    teaCups.push(teaCup);
  }
  return teaCups;
};

// Only change code below this line
const tea4GreenTeamFCC = getTea(prepareGreenTea,27);
const tea4BlackTeamFCC = getTea(prepareBlackTea,13);
// Only change code above this line

console.log(
  tea4GreenTeamFCC,
  tea4BlackTeamFCC
);
-----
// tabs is an array of titles of each site open within the window
var Window = function(tabs) {
    this.tabs = tabs; // We keep a record of the array inside the object
  };
  
  // When you join two windows into one window
  Window.prototype.join = function (otherWindow) {
    this.tabs = this.tabs.concat(otherWindow.tabs);
    return this;
  };
  
  // When you open a new tab at the end
  Window.prototype.tabOpen = function (tab) {
    this.tabs.push('new tab'); // Let's open a new tab for now
    return this;
  };
  
  // When you close a tab
  Window.prototype.tabClose = function (index) {
  
    // Only change code below this line
  
    this.tabs.splice(index,1);
  
    // Only change code above this line
  
    return this;
   };
  
  // Let's create three browser windows
  var workWindow = new Window(['GMail', 'Inbox', 'Work mail', 'Docs', 'freeCodeCamp']); // Your mailbox, drive, and other work sites
  var socialWindow = new Window(['FB', 'Gitter', 'Reddit', 'Twitter', 'Medium']); // Social sites
  var videoWindow = new Window(['Netflix', 'YouTube', 'Vimeo', 'Vine']); // Entertainment sites
  
  // Now perform the tab opening, closing, and other operations
  var finalTabs = socialWindow
    .tabOpen() // Open a new tab for cat memes
    .join(videoWindow.tabClose(2)) // Close third tab in video window, and join
    .join(workWindow.tabClose(1).tabOpen());
  
  console.log(finalTabs.tabs);

  ----
  // The global variable
var bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
function add (bookList,bookName) {
let result =[...bookList];
  result.push(bookName);
  return result;
  
  // Change code above this line
}

// Change code below this line
function remove (bookList,bookName) {
  let result=[...bookList];
  var book_index = result.indexOf(bookName);
  if (book_index >= 0) {

    result.splice(book_index, 1);
    return result;

    // Change code above this line
    }
}

var newBookList = add(bookList, 'A Brief History of Time');
var newerBookList = remove(bookList, 'On The Electrodynamics of Moving Bodies');
var newestBookList = remove(add(bookList, 'A Brief History of Time'), 'On The Electrodynamics of Moving Bodies');

console.log(bookList);

----
// Use the split method inside the 
//splitify function to split str into 
//an array of words. The function should return the array. Note that the words are not always separated by spaces, and the array should not contain punctuation.


function splitify(str) {
    // Only change code below this line
    let result =str.split(/\s|,|-|\./);
    console.log(result);
  return result;
  
    // Only change code above this line
  }
  splitify("Hello World,I-am code");

  //---
  // Only change code below this line
function urlSlug(title) {

    let result =""
    result = title.trim().toLowerCase();
    let arr = result.split(" ").filter(x=>x!="");
    
    result = arr.join("-");
    console.log(result);
    
    return result;
    }
    // Only change code above this line
    
    
    urlSlug(" Winter Is  Coming");

   // ----

   function add(x) {
    // Only change code below this line
      return function(y){
         return function(z){
           return x+y+z;
         }
      }
   
    // Only change code above this line
  }
  const add2= x=> y =>z => x+y+z; 
  
  let rs = add(10)(20)(30);
  
  console.log(rs);
  console.log(add2(1)(2)(3));
