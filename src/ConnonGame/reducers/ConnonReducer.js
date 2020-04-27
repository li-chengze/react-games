import { MOVE_OBJECTS, START_GAME } from "../actions/actionTypes";
import { calculateAngle } from '../utils/formula';
import createFlyingObject from './createFlyingObject';

const initialState = {
    angle: 45,
    gameState: {
        lives: 3,
        scores: 0,
        started: false,
        flyingObjects: [],
        lastObjectCreatedAt: new Date(),
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_OBJECTS: {
            if (!action.mousePosition) return state;

            const newState = createFlyingObject(state);

            //remove the flyingobjects consists more than 4 seconds
            const now = (new Date()).getTime();
            const flyingObjects = newState.gameState.flyingObjects.filter(object => (
                (now - object.createdAt) < 4000
            ));

            const { x, y } = action.mousePosition;
            const angle = calculateAngle(0, 0, x, y);

            return {
                ...newState,
                angle,
                gameState: {
                    ...newState.gameState,
                    flyingObjects
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
        default: return state;
    }
}

export default reducer;