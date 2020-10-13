
// Create Dino Constructor
    function Dino(species,weight,height,diet,where,when,fact=[]) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }


// Create Dino Objects
    let dinoData=[];
    function getDinoData(){
     fetch('./dino.json')
     .then(res => {return res.json()})
     .then(data => {return data.Dinos.map((dino)=>{
                return new Dino(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.when,[dino.fact]);
        })}).then(dino => {
            dinoData=dino;
            dinoData.splice(4, 0,human);
            document.getElementById('dino-compare').classList='no-display';
            generateTiles(dinoData,human);
        })
    }

// Create Human Object

    function Human(name, species, weight, height, diet) {
     return {
        name,
        species,
        weight,
        height,
        diet
        };
    }


    
// Use IIFE to get human data from form
    function getHumanData() {
        let name = document.getElementById("name").value;
        let feet = parseInt(document.getElementById("feet").value);
        let inches = parseInt(document.getElementById("inches").value);
        let height = feet * 12 + inches;
        let weight = parseInt(document.getElementById("weight").value);
        let diet = document.getElementById("diet").value;
        return Human(name, 'Human', weight, height, diet);
    }

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
    Dino.prototype.compareWeight = function(humanWeight){
        if(humanWeight<this.weight)
       return `The ${this.species} is heavier than you by ${this.weight-humanWeight} lbs`;
       else
       return `You are heavier than ${this.species} by ${humanWeight-this.weight} lbs`;
    }
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareHeight = function(humanHeight){
        if(humanHeight<this.height)
       return `The ${this.species} is taller than you by ${this.height-humanHeight} inches`;
       else
       return `You are taller than ${this.species} by ${humanHeight-this.height} inches`;
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareDiet = function(humanDiet){
        if(humanDiet==this.diet)
       return `Both you and ${this.species} are ${this.diet} in nature`;
       else
       return `${this.species} was ${this.diet} in nature`;
    }
    

    // Generate Tiles for each Dino in Array
    function generateTiles(dinoData,human) {
        let gridContainer = document.getElementById('grid');
        let fragment = new DocumentFragment();
        console.log('Inside generateTiles');
        console.log(dinoData);
        dinoData.forEach((dino) => {
            let div = document.createElement('div');
            let heading = document.createElement('h3');
            let img = document.createElement('img');
            let p = document.createElement('p');
            div.classList.add('grid-item');
            heading.textContent = generateHeader(dino);
            img.setAttribute('src',`./images/${dino.species.toLowerCase()}.png`);
            p.innerHTML = generateRandomFacts(dino,human);
            div.appendChild(heading);
            div.appendChild(img);
            div.appendChild(p);
            fragment.appendChild(div);
        })
        gridContainer.appendChild(fragment);
    }

    function generateHeader(dino) {
        if(dino.species == 'Human'){
            return dino.name;
        }else {
            return dino.species;
        }
    }

    // Generate randomized fact
    function generateRandomFacts(dino,human) {
        if(dino===human){
            return ''
        }
        if(dino.species == 'Pigeon'){
            return dino.fact[0];
        }
        else {
            let fact='';
            let random = Math.floor(Math.random()*6);
            switch(random) {
                case 0 : fact = dino.compareWeight(human.weight);
                         break;
                case 1 : fact = dino.compareHeight(human.height);
                         break;
                case 2 : fact = dino.compareDiet(human.diet.toLowerCase());
                         break;
                case 3 : fact = `${dino.species} lived in ${dino.where}`
                         break;
                case 4 : fact = `${dino.species} belongs to ${dino.when} period`
                         break;
                default : fact = dino.fact[0]
                         break;
            }
            return fact;
        }
    }
        // Add tiles to DOM

    // Remove form from screen






// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click',displayInfographic);
let human={};
function displayInfographic(){
    human = getHumanData();  
    getDinoData();
    
}