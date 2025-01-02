import React from 'react'
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Layout.css';

function Layout({children}) {
    return (
        <>
            <div className='layout'>
                <Sidebar />
                <div className="layout-content">
                    <Header />
                    <main className="page-content">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout;