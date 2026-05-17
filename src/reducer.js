const getInitialBasket = () => {
    try {
        const localData = localStorage.getItem('basket');
        return localData ? JSON.parse(localData) : [];
    } catch (e) {
        return [];
    }
};

export const initialState = {
    basket: getInitialBasket(),
    user: null,
    searchQuery: ''
};

const reducer = (state, action) => {
     switch (action.type) {
        case 'ADD_TO_BASKET':
            const existingItemIndex = state.basket.findIndex(item => item.id === action.item.id);
            let updatedBasket = [...state.basket];
            
            if (existingItemIndex >= 0) {
                const updatedItem = {
                    ...updatedBasket[existingItemIndex],
                    quantity: (updatedBasket[existingItemIndex].quantity || 1) + 1
                };
                updatedBasket[existingItemIndex] = updatedItem;
            } else {
                updatedBasket.push({ ...action.item, quantity: 1 });
            }

            return {
                ...state,
                basket: updatedBasket
            };

        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            let newBasket = [...state.basket];

            if (index >= 0) {
                if (newBasket[index].quantity > 1) {
                    newBasket[index].quantity -= 1;
                } else {
                    newBasket.splice(index, 1);
                }
            } else {
                console.warn(`Can't remove product (id: ${action.id} as its not in basket)`);
            }

            return {
                ...state,
                basket: newBasket
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        case 'EMPTY_BASKET': 
            return {
                ...state,
                basket: []
            };

        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.query
            };

        default: 
           return state;
     }
};

export default reducer;