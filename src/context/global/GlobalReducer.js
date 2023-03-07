import { SET_NFT_DATA, SET_NFT_LOADING } from '../types';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_NFT_LOADING:
            return {
                ...state,
                nftLoading: action.payload,
            };
        case SET_NFT_DATA:
            return {
                ...state,
                nftData: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
