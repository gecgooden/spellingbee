import React, { useState } from 'react';
import './App.css';
import pangrams from './words/pangrams.json';
import { HexGrid, Layout, Hexagon, Text, Pattern } from 'react-hexgrid';
import shuffle from './shuffle';
import words from './words/words.json';

const pangram = pangrams[Math.floor(Math.random() * pangrams.length)];
console.log(pangram);
let letters = shuffle(
  Array.from(
    new Set<string>(pangram.split('')).values()
  ).map(letter => letter.toUpperCase())
);
const requiredLetter = letters.pop();
letters = letters.splice(0);

function App() {
  const [selectedLetters, setLetters] = useState<string[]>([]);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const checkWord = (word: string) => {
    console.log(word);
    if (word.indexOf(requiredLetter) >= 0 && words.indexOf(word.toLowerCase()) >= 0) {
      setCorrectWords([...correctWords, word]);
    }
    setLetters([]);
  }


  return (
    <div className="App">
      <h1>{selectedLetters.join('')}</h1>
      <HexGrid width={800} height={800} viewBox="-50 -50 100 100">
        <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
          <Hexagon q={0} r={0} s={0} onClick={() => setLetters([...selectedLetters, requiredLetter])}>
            <Text>{requiredLetter}</Text>
          </Hexagon>

          <Hexagon q={0} r={-1} s={1} onClick={() => setLetters([...selectedLetters, letters[0]])}>
            <Text>{letters[0]}</Text>
          </Hexagon>
          <Hexagon q={0} r={1} s={-1} onClick={() => setLetters([...selectedLetters, letters[1]])}>
            <Text>{letters[1]}</Text>
          </Hexagon>
          <Hexagon q={1} r={-1} s={0} onClick={() => setLetters([...selectedLetters, letters[2]])}>
            <Text>{letters[2]}</Text>
          </Hexagon>

          <Hexagon q={1} r={0} s={-1} onClick={() => setLetters([...selectedLetters, letters[3]])}>
            <Text>{letters[3]}</Text>
          </Hexagon>
          <Hexagon q={-1} r={1} s={0} onClick={() => setLetters([...selectedLetters, letters[4]])}>
            <Text>{letters[4]}</Text>
          </Hexagon>
          <Hexagon q={-1} r={0} s={1} onClick={() => setLetters([...selectedLetters, letters[5]])}>
            <Text>{letters[5]}</Text>
          </Hexagon>
        </Layout>
        <Pattern id="pat-1" link="http://cat-picture" />
      </HexGrid>
      <button onClick={() => setLetters([])}>Clear</button>
      <button onClick={() => checkWord(selectedLetters.join(''))}>Submit</button>
      <ul>{correctWords.map(word => (<li key={word}><h2>{word}</h2></li>))}</ul>
    </div>
  );
}

export default App;
