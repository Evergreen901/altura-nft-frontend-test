import { useContext, useState } from 'react';
import { SimpleButton } from '../reusable';
import { NFTDetailModal } from '../modals';
import { Loading180Ring } from '../../assets/loading';
import ETHLogo from '../../assets/png/eth.png';
import GlobalContext from '../../context/global/GlobalContext';

const Home = () => {
    const [address, setAddress] = useState();
    const { nftData, setNFTData, nftLoading, setNFTLoading } = useContext(GlobalContext);
    const [modalData, setModalData] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearch = () => {
        setNFTLoading(true);
        setNFTData(address);
    };

    return (
        <div className="w-full min-h-screen py-[80px]">
            <div className="max-w-[1400px] mx-auto w-full h-full">
                <p>Search NFTs by owner wallet address (available on Ethereum).</p>
                <div className="flex items-center w-full gap-x-8 mt-4">
                    <span>Wallet Address:</span>
                    <input
                        className="custom-input max-w-[500px]"
                        type="text"
                        placeholder="0x"
                        value={address || ''}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <SimpleButton
                        text="Search"
                        className="!w-[240px]"
                        clickHandler={handleSearch}
                        isLoading={nftLoading}
                        isDisabled={nftLoading}
                    />
                </div>
                {nftLoading ? (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        <Loading180Ring width={48} height={48} fill="white" />
                    </div>
                ) : nftData ? (
                    <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 mt-8 justify-items-center">
                        {nftData.map((item, index) => (
                            <div
                                className="nft-card rounded-[20px] bg-[#101524] w-full max-w-[320px] h-[400px] overflow-hidden flex flex-col"
                                key={index}
                            >
                                <figure
                                    className="w-full h-[290px] flex items-center justify-center cursor-pointer"
                                    onClick={() => {
                                        setModalData(item);
                                        setModalOpen(true);
                                    }}
                                >
                                    {item?.media?.length > 0 ? (
                                        <img
                                            src={item.media[0].thumbnail ?? item.media[0].raw}
                                            alt="nft card"
                                            className="w-full h-full object-cover transition"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </figure>
                                <div className="p-4">
                                    <p className="text-[14px]">{item.title}</p>
                                    <p className="text-[12px] text-green-100">
                                        {item?.contract?.openSea?.collectionName}
                                    </p>
                                    {item?.contract?.openSea?.floorPrice ? (
                                        <div className="flex items-center mt-2 gap-x-2">
                                            <img
                                                src={ETHLogo}
                                                alt="eth logo"
                                                className="w-4 h-4 rounded-full overflow-hidden"
                                            />
                                            <span>{item?.contract?.openSea?.floorPrice}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="w-full text-center mt-[250px]">No NFTs found</p>
                )}
            </div>
            <NFTDetailModal open={modalOpen} setOpen={setModalOpen} nftData={modalData} />
        </div>
    );
};

export default Home;
