import { actionTypes } from "../actions/index";

export default (state = false, action) => {
    switch (action.type) {
        case actionTypes.SET_SHOW_FAILURE_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};
