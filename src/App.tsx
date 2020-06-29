import React, { useState } from 'react';
import './App.css';
import pangrams from './words/pangrams.json';
import { HexGrid, Layout, Hexagon, Text } from 'react-hexgrid';
import shuffle from './shuffle';
import words from './words/words.json';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CorrectWords from './CorrectWords';
import SelectedLetters from './SelectedLetters';


const pangram = pangrams[Math.floor(Math.random() * pangrams.length)];
let letters = shuffle(
  Array.from(
    new Set<string>(pangram.split('')).values()
  ).map(letter => letter.toUpperCase())
);
const requiredLetter = letters.pop();
letters = letters.splice(0);

export default function () {

  const [selectedLetters, setLetters] = useState<string[]>([]);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const checkWord = (word: string) => {
    const containsRequired = word.indexOf(requiredLetter) >= 0;
    const validWord = words.indexOf(word.toLowerCase()) >= 0;
    console.log({ containsRequired, validWord });
    if (containsRequired && validWord) {
      setCorrectWords([word, ...correctWords]);
    }
    setLetters([]);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <SelectedLetters selected={selectedLetters} required={requiredLetter}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <HexGrid width="100%" height="350px" viewBox="-1 -30 1 60">
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
          </HexGrid>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button onClick={() => setLetters([])} disabled={selectedLetters.length === 0}>Clear</Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button onClick={() => {setLetters(selectedLetters.slice(0, -1));}} disabled={selectedLetters.length === 0}>Delete</Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button onClick={() => checkWord(selectedLetters.join(''))} disabled={!(selectedLetters.length > 3 && selectedLetters.indexOf(requiredLetter) >= 0)}>Submit</Button>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <CorrectWords words={correctWords} />
        </Col>
      </Row>
    </Container>
  );
}