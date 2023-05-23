import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthenicated() {
    return (
        <div className='bg-info text-white vh-100 d-flex align-items-center flex-column justify-content-center text-center'>
            <h2>You need to be logged in to access this page</h2>
            <Link className='text-white' to="/">Moved to Login page</Link>
        </div>
    )
}

export default UnAuthenicated
