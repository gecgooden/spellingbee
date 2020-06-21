const arguments = process.argv.splice(2);

const files = arguments.length !== 0
    ? arguments.map(arg => `./english-words-${arg}.json`)
    : ['./english-words-10.json', './english-words-20.json', './english-words-35.json', './english-words-40.json', './english-words-50.json', './english-words-55.json', './english-words-60.json', './english-words-70.json'];

let words = [];

for (const file of files) {
    try {
        words.push(...require(file));
    } catch (e) {
        // Catch the failed require
    }
}
words = words.sort();

const asciiWords = [];
for(const word of words) {
    const asciiLetters = word.split('').map(letter => letter.charCodeAt(0)).filter(charCode => charCode >= 97 && charCode <= 122);
    if (asciiLetters.length === word.length) asciiWords.push(word);
}

console.log(JSON.stringify(asciiWords));