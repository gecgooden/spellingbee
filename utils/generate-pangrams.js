const arguments = process.argv.splice(2);

const files = arguments.length !== 0
    ? arguments.map(arg => `./english-words-${arg}.json`)
    : ['./english-words-10.json', './english-words-20.json', './english-words-35.json', './english-words-40.json', './english-words-50.json', './english-words-55.json', './english-words-60.json', './english-words-70.json'];

let words = [];

for (const file of files) {
    words.push(...require(file));
}
words = words.sort();

const pangrams = [];

for (const word of words) {
    const letters = new Set();
    for (let i = 0; i < word.length; i++) {
        letters.add(word.charAt(i));
    }
    const asciiLetters = [...letters].map(letter => letter.charCodeAt(0)).filter(charCode => charCode >= 97 && charCode <= 122);
    if (asciiLetters.length === 7) {
        pangrams.push({ word, letters: [...letters].sort() });
    }
}

const setCounts = {};

for(const pangram of pangrams) {
    if (setCounts[pangram.letters]) {
        setCounts[pangram.letters] += 1;
    } else {
        setCounts[pangram.letters] = 1;
    }
}

const distinctPangrams = [];
for(const pangram of pangrams) {
    if (setCounts[pangram.letters] === 1) distinctPangrams.push(pangram);
}

// console.log(distinctPangrams.length);
console.log(JSON.stringify(distinctPangrams.map(pangram => pangram.word)));
