import React from 'react';
import { CSidebarToggler, CNavItem, CSidebar, CSidebarNav, CNavTitle } from "@coreui/react";
import { Link } from 'react-router-dom';
import { logout } from '../handlers/logoutHandler';


function Sidebar() {

    return (
        <CSidebar unfoldable className='vh-100 bg-black' >
            <CSidebarNav>
                <CNavTitle className='text-white fw-normal'>CRM Application</CNavTitle>
                <CNavItem href="#" className='bg-dark'>
                    <i className='bi bi-bar-chart-fill text-white m-2'></i>
                </CNavItem>
                <CNavItem href="#">
                    <i className='bi bi-house text-white m-2'></i>

                    <Link to="/admin" className='text-decoration-none text-white mx-3'>
                        Home
                    </Link>

                </CNavItem>
                <div onClick={logout}>
                    <CNavItem href="#">
                        <i className='bi bi-box-arrow-left text-white m-2'></i>
                        <div className='text-decoration-none text-white mx-3'>
                            Logout
                        </div>
                    </CNavItem>
                </div>
            </CSidebarNav>
            <CSidebarToggler />
        </CSidebar>
    )
}

export default Sidebar
