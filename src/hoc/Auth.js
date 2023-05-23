import React from 'react'
import constant from '../utils/constant';
import { useLocation } from 'react-router-dom';
import UnAuthenicated from '../components/UnAuthenticated/UnAuthenicated';
import UnAuthorized from '../components/UnAuthorized/UnAuthorized';

function Auth(props) {

    const location = useLocation()
    const userType = localStorage.getItem("userType");

    if (!userType) {
        return <UnAuthenicated />
    }

    // const {page} = props;
    const page = location.pathname.slice(1)

    let requiredUserType = null

    if (page === "admin") {
        requiredUserType = constant.userTypes.admin
    } else if (page === "customer") {
        requiredUserType = constant.userTypes.customer
    } else if (page === "engineer") {
        requiredUserType = constant.userTypes.engineer
    }


    if (userType !== requiredUserType) {
        return <UnAuthorized userType={userType} />
    }


    return (
        <div>
            {props.children}
        </div>
    )
}

export default Auth
