import React, { useState } from 'react'
import styles from './sidebar.module.css';
import { IoIosMenu } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { Modal } from 'react-bootstrap';
import { IoIosHome } from "react-icons/io";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiProcessor } from "react-icons/gi";
import { GrUserExpert } from "react-icons/gr";
import { TbBrandDatabricks } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRev } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const userDetail = JSON.parse(localStorage.getItem('user'))
    const [showModal, setShowModal] = useState(false);
    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        setShowModal(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        navigate('/login');
    };

    const cancelLogout = () => {
        // Close the modal without logging out
        setShowModal(false);
    };

    return (
        <>
            <div className={` ${styles.sidebarmain}`}>
                {/* ... rest of your code */}
                <div className='d-flex flex-column h-100' >
                    <div className={`d-flex align-items-center justify-content-center gap-4 mt-3 ${styles.marginlogo}`} onClick={toggleSidebar}>
                        <img src={logo} alt="" className={styles.logoimage} />
                    </div>
                    <div className='text-center'> <button
                        className={`btn mt-2 h1 mb-2 d-lg-none d-md-none ${styles.togglebtn}`}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvas"
                        type="button"
                    >
                        <IoIosMenu />
                    </button></div>
                    <ul className={`list-unstyled mt-3 ${styles.sidebarmenu}`}>
                        <li>
                            <div className={`d-flex gap-3 align-items-center mb-2 `}>
                                <NavLink to={"/admin/home"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><IoIosHome /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Home Wrap</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2 '>
                                <NavLink to={"/admin/product"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><AiOutlineFundProjectionScreen /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Product</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2 '>
                                <NavLink to={"/admin/process"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><GiProcessor /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Process</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/experience"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><GrUserExpert /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Experience</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/brand"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><TbBrandDatabricks /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Brand</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/location"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><CiLocationOn /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Locations</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/client"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><FaUsers /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Client</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/contact"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><MdContactMail /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Contact</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/possible"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><MdOutlinePostAdd /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Possible</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='d-flex gap-3 align-items-center mb-2'>
                                <NavLink to={"/admin/revolution"} className={({ isActive }) =>
                                    isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                }>
                                    <div className={`d-flex  ${styles.startpadding}`}>
                                        <span className='fs-4 mb-1'><FaRev /></span>
                                        <p className={`ms-3 my-2 ${styles.sidebarMenu}`}>Revolution</p>
                                    </div>
                                </NavLink>
                            </div>
                        </li>
                        <div className={`d-flex gap-3 align-items-center ${styles.userinfo}`}>
                            <button className='bg-transparent border-0' onClick={handleLogout}>
                                <span className='fs-4 mb-1 text-secondary'><IoMdLogOut /></span>
                            </button>
                            <div>
                                <p className='mb-0 text-secondary'>{userDetail?.data?.firstname}</p>
                            </div>
                        </div>
                    </ul >
                </div >
            </div >
            <div className={`offcanvas offcanvas-start  ${styles.sideBarDiv}`} tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="true">
                <div className={`${styles.toggleheader} offcanvas-header`}>
                    <div className='d-flex align-items-center gap-4 justify-content-center'>
                        <img src={logo} alt="" className='img-fluid' />
                        <h2 className={``}>Route <br /> Runner</h2>
                        <button type="button" className={`${styles.closebtn} btn-close text-reset`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </div>
                <div>
                    <div className='d-flex flex-column'  >
                        <ul className={`list-unstyled mt-3 ${styles.togglesidebarmenu}`}>
                            <li>
                                <div className={`d-flex gap-3 align-items-center mb-2 `}>
                                    <NavLink to={"/admin/home"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Dashboard</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2 '>
                                    <NavLink to={"/admin/product"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                    }>
                                        <div className={`${styles.togglemenu} d-flex `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Location</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/process"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Machine</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/experience"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Employee</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/brand"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary `
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Report</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/location"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none w-100 text-secondary  ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary p-2`
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Collection Report</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/client"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none text-secondary w-100 p-2 ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary p-2`
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Repair</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <div className='d-flex gap-3 align-items-center mb-2'>
                                    <NavLink to={"/admin/contact"} className={({ isActive }) =>
                                        isActive ? `text-decoration-none text-secondary w-100 p-2 ${styles.bggradient}` : `${styles.navlinkpadding} text-decoration-none w-100 text-secondary p-2`
                                    }>
                                        <div className={`${styles.togglemenu} d-flex  `}>
                                            <span className='fs-4 mb-1'><IoIosHome /></span>
                                            <p className='ms-3'>Service Report</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={cancelLogout}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <button
                        className={`${styles.closebtn}`}
                        onClick={cancelLogout}>
                        No
                    </button>
                    <button className={`${styles.createbtn}`} onClick={confirmLogout}>
                        Yes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Sidebar