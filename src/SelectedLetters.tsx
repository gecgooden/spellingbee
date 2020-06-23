import React from 'react';
import './SelectedLetters.css';

export interface SelectedLettersProps {
    required: string
    selected: string[]
}

export default function (props: SelectedLettersProps) {
    const { required, selected } = props;
    const divs = selected
        .map((s, index) => 
            <span key={`${s}-${index}`} className={s === required ? 'required': ''}>{s}</span>
        );
    return (
        <div className='selected text-center'>
           {divs} 
        </div>
    );
}