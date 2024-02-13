import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'

const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            {/* <Footer/> */}
        </div>
    )
}

export default Layout
