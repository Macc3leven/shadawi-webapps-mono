function getRandomNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const builds = ["Base", "Colors", "Evo", "Fusion"];
const classes = ["Gas", "Humanoid", "Beast", "Divine", "Elemental", "Undead", "Plant", "Fairy"];
const purgLvls = ["Weak", "Resistant", "Strong", "Mighty", "Supermighty"];
const traits = ["Shaolin", "Samurai", "Cursed", "Tacticle", "Sorcerer", "Mystical", "Illusionist", "Conjurer"];

const make = {
    build: builds[getRandomNum(0, builds.length)],
    class: classes[getRandomNum(0, classes.length)],
    purgLvl: purgLvls[getRandomNum(0, purgLvls.length)],
    trait: traits[getRandomNum(0, purgLvls.length)],
}

console.log(make);
const resbox = document.getElementById("rescontain");


for (const x in make) {

    if (x == "build" && make[x] != "Base") {
        make.forms = getRandomNum(0, 25);
    }

    const p = document.createElement("p");
    p.innerText = `${x}: ${make[x]}`;
    resbox.appendChild(p)
    
}

