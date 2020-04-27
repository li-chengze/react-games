import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sky from './Sky';
import Ground from './Ground';
import ConnonPipe from './ConnonPipe';
import ConnonBase from './ConnonBase';
import ConnonBall from './ConnonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject/FlyingObject';
import Heart from './Heart';
import StartGameButton from './StartGameButton';
import Title from './Title';


import { MOVE_OBJECTS, START_GAME, SHOOT } from "../actions/actionTypes";
import { getCanvasPosition } from '../utils/formula';

class GameCanvas extends Component {

    componentDidMount() {
        setInterval(() => {
            this.props.moveMouseHandler(this.canvasMousePosition);
        }, 10);
        window.onresize = () => {
            const cnv = document.getElementById('cannon-game-canvas');
            cnv.style.width = `${window.innerWidth}px`;
            cnv.style.height = `${window.innerHeight}px`;
        };
        window.onresize();
    }

    render() {
        const gameHeight = 1200;
        const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
        const style = { border: '1px solid black' };
        return (
            <svg
                id="cannon-game-canvas"
                viewBox={viewBox}
                style={style}
                onMouseMove={event => this.trackMouse(event)}
                onClick={() => { this.props.shoot(this.canvasMousePosition) }}>
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="1" dy="1" stdDeviation="2" />
                    </filter>
                </defs>
                <Sky />
                <Ground />
                {this.props.gameState.cannonBalls.map(cannonBall => <ConnonBall
                    key={cannonBall.id}
                    position={cannonBall.position}
                />)}
                <ConnonPipe rotation={this.props.angle} />
                <ConnonBase />
                <CurrentScore score={15} />
                {this.props.gameState.started &&
                    this.props.gameState.flyingObjects.map(
                        flyingObject => <FlyingObject key={flyingObject.id} position={flyingObject.position} />)}
                <Heart position={{ x: -300, y: 35 }} />
                {!this.props.gameState.started && <>
                    <StartGameButton onClick={this.props.startGame} />
                    <Title />
                </>}
            </svg>
        );
    }

    trackMouse = (event) => {
        this.canvasMousePosition = getCanvasPosition(event);
    }

}

const mapStateToProps = state => ({
    angle: state.angle,
    gameState: state.gameState,
});

const mapDispatchToProps = dispatch => ({
    moveMouseHandler:
        mousePosition => {
            dispatch(
                { type: MOVE_OBJECTS, mousePosition: mousePosition }
            )
        },
    startGame:
        () => { dispatch({ type: START_GAME }) },
    shoot: (mousePosition) => { dispatch({ type: SHOOT, mousePosition: mousePosition }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameCanvas);