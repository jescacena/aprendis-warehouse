import { actionTypes } from "../actions/index";
import successReducer from "./successReducer";

test("return default initial state of 'false' when no action state is defined", () => {
    const newState = successReducer(undefined, {});
    expect(newState).toBe(false);
});

test("returns state of true upon receiving an action of type 'CORRECT_GUESS'", () => {
    const newState = successReducer(undefined, {
        type: actionTypes.CORRECT_GUESS
    });
    expect(newState).toBe(true);
});
