import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'

const Layout = () => {
    return (
        <div className='row h-100'>
            <div className={`col-md-3 col-2 col-xl-2 ${styles.sidebar}`}>
                <div>
                    <Sidebar />
                </div>
            </div> 
            <div className={`${styles.outletbg} overflow-auto col-md-9 col-xl-10 col-10`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
