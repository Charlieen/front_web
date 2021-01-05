function sumAll(arr) {
    let [begin,end]=arr;
    if(begin>end){
      const temp = begin;
      begin=end;
      end=temp;
    }
    let result=0;
    for(let i=begin;i<=end;i++){
      result +=i;
    }
  console.log(result);
    console.log(begin,end);
    return result;
  }
  
  sumAll([10, 5]);
  //---

  function diffArray(arr1, arr2) {
    var newArr = [];
    for(let i=0;i<arr1.length;i++){
      if(!arr2.includes(arr1[i])){
        newArr.push(arr1[i]);
      }
    }
      for(let i=0;i<arr2.length;i++){
      if(!arr1.includes(arr2[i])){
        newArr.push(arr2[i]);
      }
    }
    console.log(newArr);
    return newArr;
  }
  
  diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);

  //---
  function destroyer(arr,...args) {
    if(args.length ==0) return arr;
    else {  
      return arr.filter(x=> !args.includes(x));
    }
  }
  
  destroyer([1, 2, 3, 1, 2, 3], 2, 3);
  //---
  function whatIsInAName(collection, source) {
    var arr = [];
    // Only change code below this line
  
  
    // Only change code above this line
    return collection.filter(o=>{
      
      return Object.keys(source)
      .reduce((acc,key)=>{
        return  acc && (o.hasOwnProperty(key) && o[key]=== source[key])
      },true);
    });
  }
  
  whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

  //--------

  /*
  spinalCase("This Is Spinal Tap") should return "this-is-spinal-tap".

spinalCase("thisIsSpinalTap") should return "this-is-spinal-tap".

spinalCase("The_Andy_Griffith_Show") should return "the-andy-griffith-show".

spinalCase("Teletubbies say Eh-oh") should return "teletubbies-say-eh-oh".

spinalCase("AllThe-small Things") should return "all-the-small-things".
  */
  function spinalCase(str) {
    // first find all Capital letter and change lowercase+"-"
    let arrFirst = [str[0].toLowerCase()];
    for(let i=1;i<str.length;i++){
        if(str[i].charCodeAt()>=65 && str[i].charCodeAt()<=90){
          if(/[a-z]/.test(str[i-1])){
            arrFirst.push(" "+str[i].toLowerCase());
          }else{
            arrFirst.push(str[i].toLowerCase());
          }        
        }else{
          arrFirst.push(str[i]);
        }
    }
    let strFirst = arrFirst.join("");
  
    // console.log(strFirst);
  
    let arr= strFirst.split(/\s|-|_/);
    let result =arr.join("-");
  
   console.log(result);
  
    return arr.join("-");
  }
  
  spinalCase('This Is Spinal Tap');

  /*
  translatePigLatin("california") should return "aliforniacay".

Passed
translatePigLatin("paragraphs") should return "aragraphspay".

Passed
translatePigLatin("glove") should return "oveglay".

Passed
translatePigLatin("algorithm") should return "algorithmway".

Passed
translatePigLatin("eight") should return "eightway".

Passed
Should handle words where the first vowel comes in the middle of the word. translatePigLatin("schwartz") should return "artzschway".

Passed
Should handle words without vowels. translatePigLatin("rhythm") should return "rhythmay".
   */
  function translatePigLatin(str) {
    // 1: toLowerCase
    str = str.toLowerCase();
    let clone=[...str].join("");
    // 2: let ['a','e','i','o','u'];
    let vowels=['a','e','i','o','u'];
    let result=""
  
    let indexOfFirstVowel = getFirstVowel(clone,vowels);
    if(indexOfFirstVowel==0){
      result=clone+"way";
    }else if(indexOfFirstVowel <clone.length){
      result = clone.substring(indexOfFirstVowel)+str.substring(0,indexOfFirstVowel)+"ay";
    }else if(indexOfFirstVowel<0){
      result = clone+"way";
    }
  
  console.log(result);
    return result;
  }
  
  function getFirstVowel(str,vowels){
      let result =-1;
      for(let i=0;i<str.length;i++){
        if(vowels.includes(str[i])){
          result=i;
          break;
        }
      }
      return result;
  }
  translatePigLatin("consonant");

  /**
   * myReplace("Let us go to the store", "store", "mall") should return "Let us go to the mall".

Passed
myReplace("He is Sleeping on the couch", "Sleeping", "sitting") should return "He is Sitting on the couch".

Passed
myReplace("I think we should look up there", "up", "Down") should return "I think we should look down there".

Passed
myReplace("This has a spellngi error", "spellngi", "spelling") should return "This has a spelling error".

Passed
myReplace("His name is Tom", "Tom", "john") should return "His name is John".

Passed
myReplace("Let us get back to more Coding", "Coding", "algorithms") should return "Let us get back to more Algorithms".
   */
  function myReplace(str, before, after) {
    let firstLetter= 0;
    // 1 get before firstLetter info;
    if(before[0].charCodeAt()>=65 && before[0].charCodeAt()<=90){
      firstLetter =1;
    }
  
   if(before[0].charCodeAt()>=97 && before[0].charCodeAt()<=122){
      firstLetter =-1;
    }
  
    // 2 prepare after:
    after = firstLetter>0? after.substring(0,1).toUpperCase()+after.substring(1):after;
  
  after = firstLetter<0? after.substring(0,1).toLowerCase()+after.substring(1):after;
  
    console.log(after);
  
    // 
    let result =str.replace(before,after);
    console.log(result);
  
    return result;
  }
  
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

  /**
   * 
pairElement("ATCGA") should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].

Passed
pairElement("TTGAG") should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].

Passed
pairElement("CTCTA") should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]].
   */
  function pairElement(str) {
    // 0 Base pairs AT CG
    let pairs={
      "A":"T",
      "T":"A",
      "C":"G",
      "G":"C"
    } 
    let result =[];
    for(let i=0;i<str.length;i++){
      const temp=[];
      temp.push(str[i]);
      temp.push(pairs[str[i]]);
      result.push(temp);
    }
    console.log(result);
    return result;
  }
  
  pairElement("GCG");

  /**
   * 
fearNotLetter("abce") should return "d".

Passed
fearNotLetter("abcdefghjklmno") should return "i".

Passed
fearNotLetter("stvwx") should return "u".

Passed
fearNotLetter("bcdf") should return "e".

Passed
fearNotLetter("abcdefghijklmnopqrstuvwxyz") should return undefined.
   */

  function fearNotLetter(str) {
    let strArr =Array.of(...str);
    console.log(strArr);
   let strCodeArr= strArr.map(x=>x.charCodeAt())
    .sort((x,y)=>x-y);
    console.log(strCodeArr);
    let fullArr=[];
    let begin= strCodeArr[0];
    let end= strCodeArr[strCodeArr.length-1];
    console.log(begin,end);
    for(let i= begin;i<=end;i++){
      fullArr.push(String.fromCharCode(i));
    }
    console.log(fullArr);
  let result ="";
  
  fullArr.some(x=>{
    if(!strArr.includes(x)){
      result +=x;
    }
  });
  if(result===""){
    result=undefined;
  }
  console.log(result);
    return result;
  }
  
  fearNotLetter("abce");

  /**
   * 
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]) should return [1, 3, 2, 5, 4].

Passed
uniteUnique([1, 2, 3], [5, 2, 1]) should return [1, 2, 3, 5].

Passed
uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]) should return [1, 2, 3, 5, 4, 6, 7, 8].
   */
  function uniteUnique(...args) {
    let bigArr = [];
    for(let i=0;i<args.length;i++){
      bigArr= bigArr.concat(args[i]);
    }
    //[ 1, 3, 2, 5, 2, 1, 4, 2, 1 ]
    console.log(bigArr);
    for(let i=0;i<bigArr.length;i++){
        for(let j=i+1;j<bigArr.length;j++){
          if(bigArr[i]==bigArr[j]){
            bigArr.splice(j,1);
          }
        }
    }
    console.log(bigArr);
    return bigArr;
  }
  
  uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

  /*
  Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.
  */
 function convertHTML(str) {
  let dic={
    "$":"&#36",
    "<":"&#60",
    ">":"&#62",
    "\"":"&#34",
    "\'":"&#39"
  };
   let dic2={
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    "\"":"&quot;",
    "\'":"&apos;"
  };
  let strArr= Array.of(...str);
  console.log(strArr);
  let toChange =Object.keys(dic2);
  console.log(toChange);

  let result= strArr.map(x=>{
    if(toChange.includes(x)){
      return dic2[x];
    }else {
      return x;
    }
  });

  //console.log(result.join(""));
  return result.join("");
 
}

convertHTML("Dolce & Gabbana");

/**
 * 
 Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.

sumFibs(1) should return a number.

Passed
sumFibs(1000) should return 1785.

Passed
sumFibs(4000000) should return 4613732.

Passed
sumFibs(4) should return 5.

Passed
sumFibs(75024) should return 60696.

Passed
sumFibs(75025) should return 135721.

*/
function sumFibs(num) {
  let allFibs = getAllFibs2([],0,num);
 // console.log(allFibs);
  let result=0;

  result= allFibs.filter(x=>x%2!==0 && x<=num)
  .reduce((acc,x)=>acc+x,0);

  //console.log(result);
  return result;
}

function getAllFibs(acc,i,num){
  if(i>num){
    return acc;
  }
  if(i==0 || i==1){
    acc.push(1);
    return getAllFibs(acc,i+1,num);
  }
  else {
    const temp = acc[i-2]+acc[i-1];
    acc.push(temp);
    return getAllFibs(acc,i+1,num);
  }
}

function getOneFibRec(num){
  if(num<3){
    return 1;
  }else{
    return getOneFibRec(num-2)+getOneFibRec(num-1);
  }
}

console.log(getOneFibRec(5000));


function getAllFibs2(acc,i,num){
  for(let i=0;i<=num;i++){
    if(i==0||i==1){
      acc.push(1);
    }else{
      const temp = acc[i-2]+acc[i-1];
      acc.push(temp);
    }
  }
  return acc;
}

//console.log(getAllFibs([],0,100));

//sumFibs(4);

function sumFibs(num) {
  var prevNumber = 0;
  var currNumber = 1;
  var result = 0;
  while (currNumber <= num) {
    if (currNumber % 2 !== 0) {
      result += currNumber;
    }

    currNumber += prevNumber;
    prevNumber = currNumber - prevNumber;
  }

  return result;
}

// test here
sumFibs(4);

function sumFibs(num) {
  // Perform checks for the validity of the input
  if (num <= 0) return 0;

  // Create an array of fib numbers till num
  const arrFib = [1, 1];
  let nextFib = 0;

  // We put the new Fibonacci numbers to the front so we
  // don't need to calculate the length of the array on each
  // iteration
  while ((nextFib = arrFib[0] + arrFib[1]) <= num) {
    arrFib.unshift(nextFib);
  }

  // We filter the array to get the odd numbers and reduce them to get their sum.
  return arrFib.filter(x => x % 2 != 0).reduce((a, b) => a + b);
}

// test here

/**
 * A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.

Rewrite sumPrimes so it returns the sum of all prime numbers that are less than or equal to num.
 */
function sumPrimes(num) {
  let arrPrimes=[];
  let isPrime=false;
  for(let i=num;i>1;i--){
    isPrime=true;
    for(let j=2;j<i;j++){
      if(i%j==0){
        isPrime=false;
        break;
      }
    }
    if(isPrime){
      arrPrimes.push(i);
    }
  }
 console.log(arrPrimes);

let result = arrPrimes.filter(x=>x<=num)
  .reduce((acc,x)=>acc+x,0);

  console.log(result);

  return result;
}


sumPrimes(10);
/**
 * 
Intermediate Algorithm Scripting: Smallest Common Multiple
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. The answer here would be 6.
smallestCommons([1, 5]) should return a number.

Passed
smallestCommons([1, 5]) should return 60.

Passed
smallestCommons([5, 1]) should return 60.

Passed
smallestCommons([2, 10]) should return 2520.

Passed
smallestCommons([1, 13]) should return 360360.

Passed
smallestCommons([23, 18]) should return 6056820. 
*/

function smallestCommons(arr) {

  let allNums = getAllNums(arr);

  let num1=allNums[0],num2=allNums[1];
  let smm = getSComMulFromTwo(num1,num2);

  for(let i=2;i<allNums.length;i++){
    if(i==2){
        num1= smm;
        num2=allNums[i];
        smm = getSComMulFromTwo(num1,num2);
    }else{
        num1= smm;
        num2=allNums[i];
        smm = getSComMulFromTwo(num1,num2);
    }
  }
  console.log(smm);
  return smm;
}

function getSComMulFromTwo(num1,num2){
  let small = num1>num2? num2:num1;
  let big = num1>num2? num1:num2;
  let smallAllMul=[];
  let result =num1*num2;
  for(let i=1;i<=big;i++){
    smallAllMul.push(small*i);
  }
  for(let j=1;j<=small;j++){
    if(smallAllMul.includes(big*j)){
      result= big*j;
      break;
    }
  }
 // console.log(result);
  return result;
}

function getAllNums(arr){
  let small =Math.min(arr[0],arr[1]);
  let big= Math.max(arr[0],arr[1]);
  
  let result=[];

  for(let i=small;i<=big;i++){
    result.push(i);
  }
 // console.log(result);
  return result;
}

//getSComMulFromTwo(20,34);
getAllNums([5,1]);

smallestCommons([23,18]);

/**
 * Intermediate Algorithm Scripting: Drop it
Given the array arr, iterate through and remove each element starting from the first element (the 0 index) until the function func returns true when the iterated element is passed through it.

Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array.
 */
function dropElements(arr, func) {
  let result=[...arr];

  while(result.length>0){
    if(!func(result[0])){
      result.shift(0);
    }else if(func(result[0])){
      break;
    }
  }
   console.log(result);
      return result;

}

dropElements([1, 2, 3,4], function(n) {return n >= 3; });

/**
 * Intermediate Algorithm Scripting: Steamroller
Flatten a nested array. You must account for varying levels of nesting.

steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].

Passed
steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].

Passed
steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].

Passed
steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

Passed
Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.

 */

// function steamrollArray(acc,arr) {
//   if(arr.length==0){return acc;}
//   while(arr.length>0){
//     if(typeof arr[0] =="number"){
//         acc.push(arr[0]);
//         arr.splice(0,1);
//     }else if(typeof arr[0]=="object" 
//     && arr[0].length ===undefined){
//       acc.push(arr[0]);
//       arr.splice(0,1);
//     }else if(typeof arr[0]=="object" 
//     && arr[0].length ===0){
//       arr.splice(0,1);
//     }else if(typeof arr[0]=="object" 
//     && arr[0].length >0){
//       return steamrollArray(acc,arr);
//     }
//   }
  
// }



function flatNest(arr){

}
function deeps(arr){
  let deep=1;
  let value=0;
  while(typeof arr[0] =="object"){
    deep=deep+1;
    arr=arr[0];
  }
  value =arr[0];

  return value;
}
deeps([[[[4]]]]);
 // [1,[2],{},[],[[2]],[1,[[2]]]]
function steamrollArray(arr){
  return steamrollArray_h([],arr);
}
function steamrollArray_h(acc,arr){
  for(let i=0;i<arr.length;i++){
    if(typeof arr[i]=="number"){
      acc.push(arr[i]);
    }else if(typeof arr[i]=="object" && arr[i].length == undefined){
      acc.push(arr[i]);
    }else if(typeof arr[i]=="object" && arr[i].length == 0){
      continue;
    }else if(typeof arr[i]=="object" && arr[i].length ==1){
      acc.push(deeps(arr[i]));
    }else if(typeof arr[i]=="object" && arr[i].length >1){
      return steamrollArray_h(acc,arr[i]);
    }
  }
  return acc;

}

console.log( steamrollArray([1, [2], [3, [[4]]]]));

/**
 * Intermediate Algorithm Scripting: Binary Agents
Return an English translated sentence of the passed binary string.

The binary string will be space separated.
binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111") should return "Aren't bonfires fun!?"

 */
function binaryAgent(str) {
  let outString = str.split(" ").map(
    x=> String.fromCharCode(parseInt(x,2))
  );
  console.log(outString);
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
/**
 * 
Intermediate Algorithm Scripting: Everything Be True

Check if the predicate (second argument) is truthy on all elements of a collection (first argument).

In other words, you are given an array collection of objects. The predicate pre will be an object property and you need to return true if its value is truthy. Otherwise, return false.

In JavaScript, truthy values are values that translate to true when evaluated in a Boolean context.

Remember, you can access object properties through either dot notation or [] notation.
 */

function truthCheck(collection, pre) {
  let result =true;
  for(let i=0;i<collection.length;i++){
    if(!collection[i][pre]){
      result=false;
      break;
    }
  }
  return result;
}

function test(){
  if(0){
    console.log("true");
  }else{
    console.log("false");
  }
}

test();

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

/**
 * Intermediate Algorithm Scripting: Arguments Optional
Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.

addTogether(2, 3) should return 5.

Passed
addTogether(23, 30) should return 53.

Passed
addTogether(5)(7) should return 12.

Passed
addTogether("http://bit.ly/IqT6zt") should return undefined.

Passed
addTogether(2, "3") should return undefined.

Passed
addTogether(2)([3]) should return undefined.
 */
function addTogether(...args) {
  if(args.length==1){
    const arg1=args[0]
    if(typeof  arg1=="string"){
      return undefined;
    }else if(typeof arg1 =="number"){
      return function(num){
        if(typeof num !="number"){
          return undefined;
        }
        return arg1+num;
      }
    }
  }else if(args.length==2){
    const arg1= args[0];
    const arg2= args[1];
    if(typeof arg1 =="number" && typeof arg2 == "number"){
      return arg1+arg2;
    }
    if(typeof arg1 !="number" || typeof arg2 != "number"){
      return undefined;
    }
  }
  return false;
}

console.log( addTogether(2)(3));

/**
 * Intermediate Algorithm Scripting: Make a Person
Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)
Run the tests to see the expected output for each method. The methods that take an argument must accept only one argument and it has to be a string. These methods must be the only available means of interacting with the object.

 in js : function is object, but function is function first,or basic;
 1: function is function first,  block scope, args,return value , pure function,
 2: function is Object, this pointer  new Person()
 */
var Person = function(firstAndLast) {
  var local = firstAndLast;
  this.getFirstName = function(){
    return local.split(" ")[0];
  };
   this.getLastName = function(){
    return local.split(" ")[1];
  };
     this.getFullName = function(){
    return local;
  };
    
  this.setFirstName= function(first){
    local = first +" "+ local.split(" ")[1];
  };
  this.setLastName = function(last){
    local= local.split(" ")[0] +" "+last;
  };
  this.setFullName= function(firstAndLast){
    local = firstAndLast;
  }
};

var bob = new Person('Bob Ross');


console.log(bob.local);

/**
 * 
Intermediate Algorithm Scripting: Map the Debris
Return a new array that transforms the elements' average altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on Wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.
 */

function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  let result=[];
  arr.some(x=>{
    const temp={"name":x["name"],"orbitalPeriod":getT(GM,earthRadius,x["avgAlt"])};
    result.push(temp);
  })
  console.log(result);
  return result;
}

function getT(GM,earthRadius,avgAlt){
  let T=0;
  T= Math.round(2*Math.PI * Math.sqrt(Math.pow((earthRadius+avgAlt),3)/GM));
  return T;
}



orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);

// ---
/**
 * JavaScript Algorithms and Data Structures Projects: Palindrome Checker
Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".
 */
function palindrome(str) {
  let arr=[...str];
 let pre= arr.
 filter(x=>/[a-zA-Z0-9]+/g.test(x))
 .map(x=>x.toLowerCase())
 let compare=[];
 for(let i=pre.length-1;i>=0;i--){
   compare.push(pre[i]);
 }

  console.log(pre);
  console.log(compare);
  return pre.join("")===compare.join("");
}

palindrome("2A3 3a2");

/**
 * 
 */
function convertToRoman(num) {
  let preData=[];
  let arr=[...(String(num))];
  const count = arr.length;
  arr.some((x,index)=>{
     preData.push(getNum(x,index,count)) 
  });
  console.log(preData);
return num;
}

function getNum(num,index,count){
  return Math.pow(10,count-index-1)*num;
}
/*
1
5
10
50
100
500
1000
I
V
X
L
C
D
M
*/
function numToRoman(){
  const dic={
      1:"I",
      5: "V",
      10:"X",
      50:"L",
      100:"C",
      500:"D",
     1000: "M"
  };
  let commDic={};
  let range = Object.keys(dic).map(x=>Number(x));
console.log(range);

getRomanFromBeginAndEnd(dic,50,100);
}
function getRomanFromBeginAndEnd(dic,begin,end){
  let base=0;
  if(begin<10)base=1;
  if(begin>=10 && begin<100)base=10;
  if(begin>=100 && begin<1000)base=100;
  let result={};


  for(let i=begin;i<=end;i+=base){
      if(end-i>base){
          if(i==begin){
              result[i]=dic[begin];
          }else{
              if(i-begin== 2* base){
                  result[i]=dic[begin]+dic[begin];
              }
              if(i-begin==3*base){
                  result[i]=dic[begin]+dic[begin]+dic[begin];
              }
          }
      }else{
          if(end-i ==base){
              result[i]=dic[begin]+dic[end];
          }else{
          result[i]=dic[end];
          }
          
      }
   
  }
  console.log(result);
}

getRomanFromBeginAndEnd(100,500);

numToRoman();
convertToRoman(1006);

/**
 * JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter
Convert the given number into a roman numeral.

 All roman numerals answers should be provided in upper-case.

https://www.mathsisfun.com/roman-numerals.html

 */

function convertToRoman(num) {
  let dic= numToRoman();
  let preData=[];
  let arr=[...(String(num))];

  const count = arr.length;
  arr.some((x,index)=>{
     preData.push(getNum(x,index,count)) 
  });
  let roman="";
  roman =preData.map(x=>findInDic(x)).join("");

  function getNum(num,index,count){
      return Math.pow(10,count-index-1)*num;
  }
  function findInDic(num){
      if(num<=1000){
          return dic[num];
      }else if(num>1000){
          let count =num/1000;
          let result="";
          while(count>0){
              result+=dic[1000];
              count--;
          } 
          return result;
      }
  }
console.log(roman); 
return roman;
}


convertToRoman(3999);


function numToRoman(){
  const dic={
      1:"I",
      5: "V",
      10:"X",
      50:"L",
      100:"C",
      500:"D",
     1000: "M"
  };
  let commDic={};
  let range = Object.keys(dic).map(x=>Number(x));
  //console.log(range);
// [ 1, 5, 10, 50, 100, 500, 1000 ]
  let preBegin=0;
  for(let i=0;i<range.length-1;i++){
      if(range[i]<=10){preBegin=1}
      if(range[i]<=100 && range[i]>10){preBegin=10};
       if(range[i]<=1000 && range[i]>100){preBegin=100};
       getRomanFromBeginAndEnd(i,dic,range[i],range[i+1],preBegin);
  }



function getRomanFromBeginAndEnd(index,dic,begin,end,preBegin){
  let base=0;
  if(begin<10)base=1;
  if(begin>=10 && begin<100)base=10;
  if(begin>=100 && begin<1000)base=100;
  // let result={};

  for(let i=begin;i<=end;i+=base){
      commDic[i]=getRomanFromNumber(index,preBegin,begin,end,i,base,dic);
  }

}

function getRomanFromNumber(index,preBegin,begin,end,num,base,dic){
  let result="";
  if(index%2==0){
      if(end-num<=base){
          if(num==end){
              result= dic[end];
          }else{
              result=dic[begin]+dic[end];
          }
      }else{
       const temp= dic[begin];
      do{
          result = result +temp;
          num=num-base;
      }while(num>=begin)
      }
      
  }else{
      if(end-num<=base){
          if(num==end){
              result= dic[end];
          }else{
              result=dic[preBegin]+dic[end];
          }
      }else{
       result= dic[begin];
       
      while(num>begin){
          result =result+dic[preBegin];
          num=num-base;
      }
      }
  }
  return result;
}

  return commDic;

}
numToRoman()

/**
 * JavaScript Algorithms and Data Structures Projects: Caesars Cipher
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
 */
function rot13(str) {
  let result=[];
  let arr=[...str];
  
  arr.some(x=>{
    if(/[A-Z]/.test(x)){
      result.push(getDecode(x));
    }else{
      result.push(x);
    }
  })

  return result.join("");
}

function getDecode(c){

  let result="";
  let cNum= c.charCodeAt();
  if(cNum>=65&& cNum<=77){
    result =String.fromCharCode(cNum+13);
  }else if(cNum>77){
    cNum = cNum+13-90+64;
    result = String.fromCharCode(cNum);
  }
  return result;
}

rot13("SERR PBQR PNZC");

/**
 * JavaScript Algorithms and Data Structures Projects: Telephone Number Validator
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

telephoneCheck("555-555-5555") should return a boolean.

Passed
telephoneCheck("1 555-555-5555") should return true.

Passed
telephoneCheck("1 (555) 555-5555") should return true.

Passed
telephoneCheck("5555555555") should return true.

Passed
telephoneCheck("555-555-5555") should return true.

Passed
telephoneCheck("(555)555-5555") should return true.

Passed
telephoneCheck("1(555)555-5555") should return true.

Passed
telephoneCheck("555-5555") should return false.

Passed
telephoneCheck("5555555") should return false.

Passed
telephoneCheck("1 555)555-5555") should return false.

Passed
telephoneCheck("1 555 555 5555") should return true.

Passed
telephoneCheck("1 456 789 4444") should return true.

Passed
telephoneCheck("123**&!!asdf#") should return false.

Passed
telephoneCheck("55555555") should return false.

Passed
telephoneCheck("(6054756961)") should return false

Passed
telephoneCheck("2 (757) 622-7382") should return false.

Passed
telephoneCheck("0 (757) 622-7382") should return false.

Passed
telephoneCheck("-1 (757) 622-7382") should return false

Passed
telephoneCheck("2 757 622-7382") should return false.

Passed
telephoneCheck("10 (757) 622-7382") should return false.

Passed
telephoneCheck("27576227382") should return false.

Passed
telephoneCheck("(275)76227382") should return false.

Passed
telephoneCheck("2(757)6227382") should return false.

Passed
telephoneCheck("2(757)622-7382") should return false.

Passed
telephoneCheck("555)-555-5555") should return false.

Passed
telephoneCheck("(555-555-5555") should return false.

Passed
telephoneCheck("(555)5(55?)-5555") should return false.

 */
function telephoneCheck(str) {
  let reg=/^[1$]?\s?(\d{3}|\(\d{3}\))(-|\s)?\d{3}(-|\s)?\d{4}$/;
  return reg.test(str);
}
 console.log(telephoneCheck("(275)76227382"));

function test(str){
  let reg=/^[1$]?\s?\d{3}/.test(str);
  console.log(reg);
}

// test("1 555");




