import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import contentData from '../data/content.json';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar menuData={contentData.menu} title={contentData.general.title} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer text={contentData.general.footerText} />
        </div>
    );
};

export default Layout;
