function Animal() { }
function Bird() { }
function Dog() { }

Bird.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);

// Only change code below this line

Bird.prototype.constructor =Bird;
Dog.prototype.constructor=Dog;

let duck = new Bird();
let beagle = new Dog();

console.log(duck.constructor === Bird);
console.log(duck.constructor === Animal);

---------
function Animal() { }
Animal.prototype.eat = function() { console.log("nom nom nom"); };

function Dog() { }

// Only change code below this line
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark= function(){
    console.log('Woof!');
}

// Only change code above this line

let beagle = new Dog();

console.log(beagle.constructor === Dog);
beagle.bark();

--
function Bird() { }

Bird.prototype.fly = function() { return "I am flying!"; };

function Penguin() { }
Penguin.prototype = Object.create(Bird.prototype);
Penguin.prototype.constructor = Penguin;

// Only change code below this line

Penguin.prototype.fly=function(){
    console.log("Alas,this is a flightless bird");
}


// Only change code above this line

let penguin = new Penguin();
console.log(penguin.fly());

---
let bird = {
    name: "Donald",
    numLegs: 2
  };
  
  let boat = {
    name: "Warrior",
    type: "race-boat"
  };
  
  // Only change code below this line
  
  function glideMixin(obj){
    obj.glide= function(){
      console.log("can glide");
    }
  }
  
  glideMixin(bird);
  glideMixin(boat);
  bird.glide();

  ----
  function Bird() {
    let weight = 15;
    this.name="feiniao";
  
    this.getWeightValue= function(){
      return weight;
    }
  }
  
  let b = new Bird();
  
  console.log(b.getWeightValue());
  console.log(b.weight);
  console.log(b.name);

  ---
  (function () {
    console.log("A cozy nest is ready");
  })();

  (function (name) {
    console.log(name+ "A cozy nest is ready");
  })("charlie");

  ---
  let isCuteMixin = function(obj) {
    obj.isCute = function() {
      return true;
    };
  };
  let singMixin = function(obj) {
    obj.sing = function() {
      console.log("Singing to an awesome tune");
    };
  };
  
  let funModule=(function(){
    return {
      isCuteMixin:function(obj){
        obj.isCute= function(){
          return true;
        }
      },
      singMixin:function(obj){
        obj.sing= function(){
          console.log("Singing to an awesome tune");
        }
      }
    }
  })();
  function Dog(){}
  let dog= new Dog();
  funModule.singMixin(dog);
  dog.sing();
  
  