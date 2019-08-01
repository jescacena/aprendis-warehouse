const initialState = [{
    squares: Array(9).fill(null),
}];
const historyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_HISTORY':
        return [
          ...state,
          {
            squares: action.squares
          }
        ]
      case 'CLEAN':
        return initialState
      default:
        return state
    }
  }
  
  export default historyReducer