import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export interface CorrectWordProps {
    words: string[]
}

export default function (props: CorrectWordProps) {
    const [open, setOpen] = useState(false);

    const { words } = props;
    if (words.length === 0) {
        return (
            <ListGroup>
                <ListGroup.Item>No words found yet</ListGroup.Item>
            </ListGroup>
        );
    }
    
    const remainingWords = words.slice(1);
    console.log({ words, open, remainingWords});
    const remaining = remainingWords.map(word => <ListGroup.Item key={word}>{word}</ListGroup.Item>);
    return (
        <ListGroup>
            <ListGroup.Item onClick={() => setOpen(!open)}>
                {words[0]}
            </ListGroup.Item>
            {open && remaining}
        </ListGroup>
    );
}