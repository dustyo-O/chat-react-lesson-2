import React, { FC } from 'react';

import { cnLabel } from './Label.classname';

type LabelProps = {
    text: string;
};

export const Label: FC<LabelProps> = ({ text }) => {
    console.log('Label ' + text);
    return <div className={cnLabel()}>
        {text}
    </div>;
};
