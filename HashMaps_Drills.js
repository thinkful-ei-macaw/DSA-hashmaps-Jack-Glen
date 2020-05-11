const HashMap = require('./hash-map')

function main() {

    const lotr = new HashMap();

    HashMap.MAX_LOAD_RATIO = 0.5;
    HashMap.SIZE_RATIO = 3;

    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragorn")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "Treebeard")



    console.log(lotr.get("Hobbit"))
    console.log(lotr.get("Maiar"))

    console.log(lotr)

}

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}


const removeDupesAlt = str => {
    const map = new Map();
    [...str].forEach(c => map.set(c)); //for each loops over an entire array
    let iterator = map.keys(); //returns an iterator that will iterate over all the keys
    console.log(iterator)
    let result = '';
    for (const value of iterator) {
        result += value;
    }
    return result;
}

const palindrome = str => {

    let value = Math.ceil(str.length / 2)
    let result = removeDupesAlt(str).length

    return value === result

}

function sortAlpha(str) {
    let chars = [...str]
    let sorted = chars.sort();
    let result = sorted.join('');
    return result

}
// for each word in the list, add the sorted version of that work as an item in our map, 
// with the key being the sorted word, and the value being an empty array

// for each word in our list, we retrieve the object from our map using the sorted version of that word. 
// then add that word to the array of that object

// const valArr = map.get('aest')

// valArr.push('east)



const anagrams = arr => {

    const map = new Map();

    arr.forEach(word => map.set(sortAlpha(word), [])) //paramters, (key, value)

    arr.forEach(word => {


        const wordStorage = map.get(sortAlpha(word))
        wordStorage.push(word)


    })
    let iterator = map.values()
    return [...iterator]

}

const collisionFix = (key, value) => {



    const map = new Map();


    key.forEach(key => {

        for (let i = 0; i < value.length; i++) {
            map.set(key, value[i])
        }
    })

    console.log(map)



}

collisionFix(["Hobbit", "Wizard", "Human", "Elf", "Maiar", "Maiar", "RingBearer", "LadyOfLight", "HalfElven", "Ent"],
    ["Bilbo", "Frodo", "Gandalf", "Aragorn", "Legolas", "The Necromancer", "Sauron", "Gollum", "Galadriel", "Arwen", "Treebeard"])

// otr.set("Hobbit", "Bilbo")
//     lotr.set("Hobbit", "Frodo")
//     lotr.set("Wizard", "Gandalf")
//     lotr.set("Human", "Aragorn")
//     lotr.set("Elf", "Legolas")
//     lotr.set("Maiar", "The Necromancer")
//     lotr.set("Maiar", "Sauron")
//     lotr.set("RingBearer", "Gollum")
//     lotr.set("LadyOfLight", "Galadriel")
//     lotr.set("HalfElven", "Arwen")
//     lotr.set("Ent", "Treebeard")


// console.log(palindrome("north"));

// const removeDupesAlt = str => {
//     const map = new Map();
//     [...str].forEach(c => map.set(c));
//     let iterator = map.keys();
//     return [...iterator].join('');
//   }


// removeDupesAlt('hello')

// main();

// WhatDoesThisDo();