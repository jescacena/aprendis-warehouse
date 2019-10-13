const initialState = 'ge';
const currentContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CONTENT':
            return action.contentKey;
        case 'SWAP_CURRENT_CONTENT':
            return (state === 'ge') ? 'ss' : 'ge';
        default:
            return state
    }
}

export default currentContentReducer