import { MOVE_OBJECTS, START_GAME } from "../actions/actionTypes";
import { calculateAngle } from '../utils/formula';

const initialState = {
    angle: 45,
    gameState: {
        lives: 3,
        scores: 0,
        started: false,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVE_OBJECTS: {
            if (!action.mousePosition) return state;
            const { x, y } = action.mousePosition;
            const angle = calculateAngle(0, 0, x, y);
            return {
                ...state,
                angle,
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