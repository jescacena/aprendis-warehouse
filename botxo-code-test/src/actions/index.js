export const setCurrentContentAction = contentKey => ({
    type: 'SET_CURRENT_CONTENT',
    contentKey
})
export const swapCurrentContentAction = () => ({
    type: 'SWAP_CURRENT_CONTENT'
})
export const setList = (key, list) => ({
    type: 'SET_LIST',
    key,
    list
})
export const addToList = (key, item) => ({
    type: 'ADD_TO_LIST',
    key,
    item
})
export const deleteFromList = (key, name) => ({
    type: 'DELETE_FROM_LIST',
    key,
    name
})