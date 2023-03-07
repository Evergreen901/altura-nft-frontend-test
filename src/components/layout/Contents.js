import React from 'react';
import OtarisBack from '../../assets/png/otaris-back.png';

const Contents = ({ children }) => {
    return (
        <div className="w-screen min-h-screen relative">
            <img
                src={OtarisBack}
                alt="otaris back logo"
                className="absolute w-full h-full object-cover opacity-60 z-[10]"
            />
            <div className="relative z-10 h-full px-4">{children}</div>
        </div>
    );
};

export default Contents;
