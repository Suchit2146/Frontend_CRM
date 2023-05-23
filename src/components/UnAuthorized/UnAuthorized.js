import React from 'react';
import { logout } from "../../handlers/logoutHandler"

function UnAuthorized(props) {
    return (
        <div className='bg-info text-white vh-100 d-flex align-items-center flex-column justify-content-center text-center'>
            <h2> OOPS! user of {props.userType} type doesnot have sufficient permission to access this page</h2>
            <p className='text-white' onClick={logout}>Login as another role</p>
        </div>
    )
}

export default UnAuthorized
