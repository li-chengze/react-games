import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sky from './Sky';
import Ground from './Ground';
import ConnonPipe from './ConnonPipe';
import ConnonBase from './ConnonBase';
import { MOVE_OBJECTS } from "../actions/actionTypes";
import { getCanvasPosition } from '../utils/formula';

class GameCanvas extends Component {

    componentDidMount() {
        setInterval(() => {
            this.props.moveMouseHandler(this.canvasMousePosition);
        }, 10);
    }

    render() {
        const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];
        const style = { border: '1px solid black' };
        return (
            <svg
                id="cannon-game-canvas"
                viewBox={viewBox}
                style={style}
                preserveAspectRatio="xMaxYMax none"
                onMouseMove={event => this.trackMouse(event)}>
                <Sky />
                <Ground />
                <ConnonPipe rotation={this.props.angle} />
                <ConnonBase />
            </svg>
        );
    }

    trackMouse = (event) => {
        this.canvasMousePosition = getCanvasPosition(event);
    }

}

GameCanvas.propTypes = {
    message: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    angle: state.angle,
});

const mapDispatchToProps = dispatch => ({
    moveMouseHandler:
        mousePosition => dispatch(
            { type: MOVE_OBJECTS, mousePosition: mousePosition }
        )
})

export default connect(mapStateToProps, mapDispatchToProps)(GameCanvas);