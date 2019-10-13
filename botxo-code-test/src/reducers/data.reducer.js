import _ from 'lodash';

const initialState = {
    generic: [],
    specific: []
};
const dataReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case 'SET_LIST':
            newState = _.cloneDeep(state);
            newState[action.key] = action.list;
            return newState;
        case 'ADD_TO_LIST':
            newState = _.cloneDeep(state);
            newState[action.key] = [action.item].concat(newState[action.key]);
            return newState;
        case 'DELETE_FROM_LIST':
            newState = _.cloneDeep(state);

            newState[action.key] = _.filter(newState[action.key], function(o) { return o.name!==action.name; })

            return newState;


        default:
            return state
    }
}

export default dataReducer