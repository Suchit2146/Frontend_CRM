import { useState, useEffect } from "react";
import { getAllUsers } from "../api/user";

const useFetchUsers = () => {
    const [userDetails, setUserdetails] = useState([]);
    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = () => {
        getAllUsers()
            .then((res) => {
                setUserdetails(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    return [userDetails]
}
export default useFetchUsers;