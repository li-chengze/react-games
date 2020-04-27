import { MOVE_OBJECTS } from "../actions/actionTypes";
import { calculateAngle } from '../utils/formula';

const initialState = {
    angle: 45
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
        default: return state;
    }
}

export default reducer;