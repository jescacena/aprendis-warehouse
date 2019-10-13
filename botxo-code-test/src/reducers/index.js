import { combineReducers } from 'redux'
import currentContentReducer from './currentContent.reducer'
import dataReducer from './data.reducer'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
    currentContent: currentContentReducer,
    data: dataReducer,
    form: formReducer
})