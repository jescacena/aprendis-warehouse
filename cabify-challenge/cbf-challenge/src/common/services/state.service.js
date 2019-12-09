import React, { createContext, useContext, useReducer } from 'react';

export const initialState = {
    cartLines: [],
    productDetailModal: {
        show: false,
        image: null
    }
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'addCartLine':
            return {
                ...state,
                cartLines: [...state.cartLines, action.newCartLine]
            };

        case 'removeCartLine':
            return {
                ...state,
                cartLines: state.cartLines.filter(
                    (item, index) => index !== action.indexToRemove
                )
            };
        case 'updateCartLine':
            return {
                ...state,
                cartLines: state.cartLines.map((item, index) =>
                    index === action.indexToUpdate ? action.newCartLine : item
                )
            };
        case 'openProductDetailModal':
            return {
                ...state,
                productDetailModal: {
                    ...state.productDetailModal,
                    show: true,
                    image: action.image
                }
            };
        case 'closeProductDetailModal':
            return {
                ...state,
                productDetailModal: {
                    ...state.productDetailModal,
                    show: false
                }
            };
        default:
            return state;
    }
};

export const StateContext = createContext();
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
