import { combineReducers } from 'redux'
import historyReducer from './historyReducer'

export default combineReducers({
    history: historyReducer
})