import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Contents } from '../layout';

const Layout = () => {
    return (
        <div id="layout-wrapper">
            <div className="top-mask right" />
            <Header />
            <Contents>
                <Outlet />
            </Contents>
        </div>
    );
};

export default Layout;
