import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;