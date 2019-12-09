import {
    StateProvider,
    initialState,
    reducer,
    useStateValue
} from '../services/state.service';

describe('Reducer tests', () => {
    it('reducer return same state with unknown action type', () => {
        const initState = { cartLines: [{ code: 'one', name: 'one name' }] };
        const resultState = reducer(initState, {
            type: 'unknownActionType'
        });
        expect(resultState.cartLines.length).toBe(1);
        expect(resultState.cartLines[0].code).toBe('one');
    });

    it('reducer with type addCartLine should add an item to state', () => {
        const initState = initialState;
        const resultState = reducer(initState, {
            type: 'addCartLine',
            newCartLine: { code: 'one', name: 'one name' }
        });
        expect(resultState.cartLines.length).toBe(1);
        expect(resultState.cartLines[0].code).toBe('one');
    });

    it('reducer with type removeCartLine should remove an item from state', () => {
        const initState = { cartLines: [{ code: 'one', name: 'one name' }] };
        const resultState = reducer(initState, {
            type: 'removeCartLine',
            indexToRemove: 0
        });
        expect(resultState.cartLines.length).toBe(0);
    });

    it('reducer with type updateCartLine should update an item from state', () => {
        const initState = { cartLines: [{ code: 'one', name: 'one name' }, { code: 'two', name: 'two name' }] };
        const newItem = { code: 'one NEW', name: 'one NEW name' };
        const resultState = reducer(initState, {
            type: 'updateCartLine',
            indexToUpdate: 0,
            newCartLine: newItem
        });
        expect(resultState.cartLines.length).toBe(2);
        expect(resultState.cartLines[0].code).toBe('one NEW');
    });
});
