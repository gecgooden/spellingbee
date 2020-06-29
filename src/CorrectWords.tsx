import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export interface CorrectWordProps {
    words: string[]
}

export default function (props: CorrectWordProps) {
    const [open, setOpen] = useState(false);
    const expand = () => setOpen(true);
    const collapse = () => setOpen(false);

    const words = props.words.map(capitalize);
    if (words.length === 0) return renderEmpty();
    
    return open
        ? renderExpanded(words, collapse) 
        : renderCollapsed(words, expand);
}

const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
}

const renderCollapsed = (words: string[], expand: () => void ) => (
    <ListGroup onClick={expand}>
        <ListGroup.Item>{words.map(capitalize).join(', ')}</ListGroup.Item>
    </ListGroup>
);

const renderExpanded = (words: string[], collapse: () => void) => (
    <ListGroup onClick={collapse}>
        {words.sort().map(word => 
            <ListGroup.Item key={word}>
                {word}
            </ListGroup.Item>
        )}
    </ListGroup>
);

const renderEmpty = () => (
    <ListGroup>
        <ListGroup.Item>No words found yet</ListGroup.Item>
    </ListGroup>
);