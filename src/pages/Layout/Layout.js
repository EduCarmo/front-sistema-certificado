import React from 'react'
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Layout.css';

function Layout() {
    return (
        <>
            <div className='layout'>
                <Sidebar />
                <div className="layout-content">
                    <Header />
                    <main className="page-content">
                        <h1>Olá</h1>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout;