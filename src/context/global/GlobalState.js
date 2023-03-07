import React, { useReducer } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import { SET_NFT_LOADING, SET_NFT_DATA } from '../types';
import { toast } from 'react-hot-toast';

const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const GlobalState = ({ children }) => {
    const initialState = {
        nftData: null,
        nftLoading: false,
    };

    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    const { nftData, nftLoading } = state;

    const setNFTData = async (address) => {
        try {
            const nfts = await alchemy.nft.getNftsForOwner(address);
            console.log(nfts);

            if (nfts?.ownedNfts?.length > 0) {
                dispatch({
                    type: SET_NFT_DATA,
                    payload: nfts.ownedNfts,
                });
            }
        } catch (e) {
            console.log(e);
            toast.error('failed to fetch NFTs');
        }
        setNFTLoading(false);
    };

    const setNFTLoading = (value) => {
        dispatch({
            type: SET_NFT_LOADING,
            payload: value,
        });
    };

    return (
        <GlobalContext.Provider
            value={{
                nftData,
                nftLoading,
                setNFTData,
                setNFTLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;
