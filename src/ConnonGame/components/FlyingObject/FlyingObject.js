import React from 'react';
import styled, { keyframes } from 'styled-components';

import FlyingObjectTop from "./FlyingObjectTop";
import FlyingObjectBase from './FlyingObjectBase';

const flyingObject = props => {
    const gameHeight = 1200;
    const moveVertically = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;

    const Move = styled.g`
    animation: ${moveVertically} 4s linear;
    `;
    return (
        <Move>
            <FlyingObjectTop {...props} />
            <FlyingObjectBase {...props} />
        </Move>
    );
}

export default flyingObject;