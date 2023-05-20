import { useState, useEffect } from "react";
import { getAllTickets } from "../api/ticket";

const useFetchTickets = () => {
    const [ticketDetails, setTicketDetails] = useState([]);
    useEffect(() => { fetchTickets(); }, []);

    const fetchTickets = () => {

        getAllTickets()
            .then((res) => {
                setTicketDetails(res.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }
    return [ticketDetails, fetchTickets]
}
export default useFetchTickets;