import React from 'react';
import { Loading180Ring } from '../../assets/loading';

const SimpleButton = ({ isDisabled = false, isLoading = false, className, clickHandler, text }) => (
    <button
        className={`btn-wrapper flex justify-center items-center transition ${className}`}
        disabled={isDisabled}
        onClick={clickHandler}
    >
        {isLoading ? (
            <div className="relative z-10 mr-2">
                <Loading180Ring width={24} height={24} fill="white" />
            </div>
        ) : null}
        {text}
    </button>
);

export default SimpleButton;
