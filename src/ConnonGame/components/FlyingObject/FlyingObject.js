import React from 'react';

import FlyingObjectTop from "./FlyingObjectTop";
import FlyingObjectBase from './FlyingObjectBase';

const flyingObject = props => {
    return (
        <g>
            <FlyingObjectTop {...props} />
            <FlyingObjectBase {...props} />
        </g>
    );
}

export default flyingObject;