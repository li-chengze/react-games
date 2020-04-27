import { MOVE_OBJECTS, START_GAME, SHOOT } from "../actions/actionTypes";
import { calculateAngle, } from '../utils/formula';
import createFlyingObject from './createFlyingObject';
import moveBalls from './moveConnonBalls';
import checkCollisions from './checkCollisions';

const initialState = {
    angle: 45,
    gameState: {
        lives: 3,
        scores: 0,
        started: false,
        flyingObjects: [],
        lastObjectCreatedAt: new Date(),
        cannonBalls: [],
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_OBJECTS: {
            if (!action.mousePosition) return state;

            const newState = createFlyingObject(state);
            let cannonBalls = moveBalls(state.gameState.cannonBalls);

            //remove the flyingobjects consists more than 4 seconds
            const now = (new Date()).getTime();
            let flyingObjects = newState.gameState.flyingObjects.filter(object => (
                (now - object.createdAt) < 4000
            ));

            const { x, y } = action.mousePosition;
            const angle = calculateAngle(0, 0, x, y);

            const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
            const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
            const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

            cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
            flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));

            return {
                ...newState,
                angle,
                gameState: {
                    ...newState.gameState,
                    flyingObjects,
                    cannonBalls
                }
            };
        }
        case START_GAME: {
            const gameState = { ...state.gameState };
            gameState.started = true;
            return {
                ...state,
                gameState: gameState,
            }
        }
        case SHOOT: {
            if (!state.gameState.started) return state;

            const { cannonBalls } = state.gameState;

            if (cannonBalls.length === 2) return state;

            const { x, y } = action.mousePosition;

            const angle = calculateAngle(0, 0, x, y);

            const id = (new Date()).getTime();
            const cannonBall = {
                position: { x: 0, y: 0 },
                angle,
                id,
            };

            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    cannonBalls: [...cannonBalls, cannonBall],
                }
            };
        }
        default: return state;
    }
}

export default reducer;