import React, { FC, useState } from 'react';
import { Label } from '../Label/Label';

import { cnTextInput } from './TextInput.classname';


// function getUseState() {
//     let currentValue: unknown;

//     function setState(newValue: unknown) {
//         currentValue = newValue;

//         // нечто, что заставляет реакт перерисовать компонент
//     }

//     return function useState(initialValue: unknown) {
//         currentValue = currentValue === undefined ? initialValue : currentValue;

//         return [currentValue, setState];
//     }
// }

// const useState = getUseState();

const STATIC_LABEL = 'static text';

let counterRedraw = 0;

export const TextInput: FC = () => {
    console.log('TextInput');
    const [state, setState] = useState({
        textLength: 0,
    });

    const { textLength } = state;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        console.log('change')
        setState(prev => ({ ...prev, textLength: event.target.value.length }));
    };

    counterRedraw++;

    console.log('return');
    return <div className={cnTextInput()}>
        {counterRedraw}
        <Label text={STATIC_LABEL}/>
        <input className={cnTextInput('control')} onChange={handleChange} />
        {textLength ? <Label text={textLength.toString()}/> : undefined}
    </div>;
};
