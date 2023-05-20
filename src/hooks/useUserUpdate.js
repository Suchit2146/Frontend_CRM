import { useState } from "react";
import { updateUser } from "../api/user";

const useUserUpdate = () => {
    const [selectedCurrUser, setSelectedCurrUser] = useState({});
    const [userUpdateModal, setUserUpdateModal] = useState(false);

    const editUser = (userDetail) => {
        // console.log(userDetail);
        setUserUpdateModal(true);
        setSelectedCurrUser(userDetail);
    }

    const updateUserFn = (e) => {
        e.preventDefault();
        // console.log(e);

        const userData = {
            _id: selectedCurrUser._id,
            status: selectedCurrUser.userStatus
        }

        // API CALL
        updateUser(userData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("ticket update successfully");
                    // console.log(res);
                    setUserUpdateModal(false)
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    }

    const closeUserUpdateModal = () => {
        setUserUpdateModal(false);
    }

    const onUserUpdate = (e) => {
        // console.log(e.target);
        let userFieldName = e.target.name;

        if (userFieldName === "status") {
            selectedCurrUser.userStatus = e.target.value
        }

        setSelectedCurrUser({ ...selectedCurrUser })
    }
    return {closeUserUpdateModal,onUserUpdate,updateUserFn,editUser,selectedCurrUser,userUpdateModal}
}

export default useUserUpdate;