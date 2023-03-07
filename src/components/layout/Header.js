import React from 'react';

const Header = () => {
    return (
        <header className="fixed w-screen h-[60px] flex items-center shadow-lg rounded-b-[20px] px-5 z-[100]">
            <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
                <div className="flex items-center gap-x-[10px]">
                    <span className="text-[18px] font-light">Frontend Engineer</span>
                    <div className="h-[20px] w-[1px] bg-white opacity-50" />
                    <span className="text-[18px] font-light opacity-50">Technical Test</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
