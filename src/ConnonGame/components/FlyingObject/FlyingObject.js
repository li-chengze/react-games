import React from 'react';

import FlyingObjectTop from "./FlyingObjectTop";
import FlyingObjectBase from './FlyingObjectBase';

const flyingObject = props => {
    return (
        <>
            <FlyingObjectTop {...props} />
            <FlyingObjectBase {...props} />
        </>
    );
}

export default flyingObject;