import React from 'react';

const CustomButton = ({ isDisabled = false, className, clickHandler, text, description }) => (
    <button
        className={`custom-button flex flex-col items-center transition ${className}`}
        disabled={isDisabled}
        onClick={clickHandler}
    >
        <span className="content w-full leading-[34px] text-[14px] transition">{text}</span>
        <span className="description w-full leading-[24px] text-[10px]">{description}</span>
    </button>
);

export default CustomButton;
