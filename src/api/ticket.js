import axios from "axios";
const BASE_URL = process.env.REACT_APP_CRM_BACKEND_URL;
// const BASE_URL = "https://relevel-crm-be.herokuapp.com";

export async function getAllTickets(data) {
    return axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
}