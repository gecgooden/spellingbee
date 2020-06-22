import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';

export interface CorrectWordProps {
    words: string[]
}

export default function (props: CorrectWordProps) {
    const [open, setOpen] = useState(false);
    
    const { words } = props;
    const remainingWords = words.length === 0 ? [] : words.slice(1);

    return (
        <>
            <ListGroup>
                {
                    words.length === 0
                    ? <ListGroup.Item>No words found yet</ListGroup.Item>
                    : <ListGroup.Item onClick={() => setOpen(!open)}>{words[0]}</ListGroup.Item>
                }
                <Collapse in={open}>
                    <div>
                        {remainingWords.length > 0 && remainingWords.map(word => <ListGroup.Item key={word}>{word}</ListGroup.Item>)}
                    </div>
                </Collapse>
            </ListGroup>
        </>
    );
}