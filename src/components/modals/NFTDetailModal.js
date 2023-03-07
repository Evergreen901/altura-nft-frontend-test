import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import ETHLogo from '../../assets/png/eth.png';
import { getShortenedAddress } from '../../helpers/functions';
import { ExternalLink, SimpleButton } from '../reusable';

const NFTDetailModal = ({ open, setOpen, nftData }) => {
    const ref = useRef();

    useEffect(() => {
        const bodyMouseDowntHandler = (e) => {
            if (ref?.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', bodyMouseDowntHandler);
        return () => {
            document.removeEventListener('mousedown', bodyMouseDowntHandler);
        };
    }, [setOpen]);

    console.log(nftData);

    return open ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm">
                <div className="relative my-6 mx-auto max-w-4xl w-[1000px]" ref={ref}>
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative w-full bg-[#242f4e] outline-none focus:outline-none p-8">
                        {/*header*/}
                        <div className="flex items-center justify-between rounded-t">
                            <h3 className="text-2xl font-semibold">{nftData.title}</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black flex items-center justify-end text-3xl leading-none font-light outline-none focus:outline-none"
                                onClick={() => setOpen(false)}
                            >
                                <span className="bg-transparent text-white opacity-100 text-3xl block transition hover:opacity-60">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative pt-6 w-full grid grid-cols-2 gap-x-4 pb-8">
                            <figure className="">
                                <img
                                    src={nftData.media[0].thumbnail ?? nftData.media[0].raw}
                                    alt="nft data"
                                    className="w-full h-full rounded-2xl"
                                />
                            </figure>
                            <div className="">
                                <div className="w-full bg-[#0a0e1ba3] p-4 rounded-[12px]">
                                    <p className="text-[18px]">{nftData.title}</p>
                                    <p className="text-[14px] text-green-100">
                                        {nftData?.contract?.openSea?.collectionName}
                                    </p>
                                </div>
                                <div className="w-full bg-[#0a0e1ba3] p-4 rounded-[12px] mt-4">
                                    <p className="text-[16px]">Description:</p>
                                    {/* <p>{nftData?.description}</p> */}
                                    <ReactMarkdown children={nftData?.description} />
                                </div>
                                <div className="w-full bg-[#0a0e1ba3] p-4 rounded-[12px] mt-4 flex flex-col gap-y-1">
                                    {nftData?.contract?.openSea?.floorPrice ? (
                                        <div className="flex items-center justify-between">
                                            <p>Floor Price:</p>
                                            <div className="flex items-center gap-x-2">
                                                <img
                                                    src={ETHLogo}
                                                    alt="eth logo"
                                                    className="w-4 h-4 rounded-full overflow-hidden"
                                                />
                                                <span>{nftData?.contract?.openSea?.floorPrice}</span>
                                            </div>
                                        </div>
                                    ) : null}
                                    <div className="flex items-center justify-between">
                                        <p>Contract:</p>
                                        <ExternalLink
                                            to={`https://etherscan.io/address/${nftData?.contract?.address}`}
                                            className="underline transition hover:opacity-60"
                                        >
                                            {getShortenedAddress(nftData?.contract?.address)}
                                        </ExternalLink>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Deployer:</p>
                                        <ExternalLink
                                            to={`https://etherscan.io/address/${nftData?.contract?.contractDeployer}`}
                                            className="underline transition hover:opacity-60"
                                        >
                                            {getShortenedAddress(nftData?.contract?.contractDeployer)}
                                        </ExternalLink>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Token Type:</p>
                                        <p>{nftData?.contract?.tokenType}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Total Supply:</p>
                                        <p>{nftData?.contract?.totalSupply}</p>
                                    </div>
                                </div>
                                <ExternalLink
                                    to={`https://opensea.io/assets/ethereum/${nftData?.contract?.address}/${nftData?.tokenId}`}
                                >
                                    <SimpleButton text="Purcahse on Opensea" className="mt-4" />
                                </ExternalLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null;
};

export default NFTDetailModal;
