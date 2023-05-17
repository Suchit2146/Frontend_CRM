import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatusDashboard from '../components/statusDashboard/statusDashboard';
import { getAllTickets } from "../api/ticket"


function Engineer() {
    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketStatusCount, setTicketStatusCount] = useState({});

    useEffect(() => {
        fetchTickets()
    })

    const fetchTickets = () => {

        getAllTickets()
            .then((res) => {
                setTicketDetails(res.data)
                updateTicketsCount(res.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const updateTicketsCount = (tickets) => {
        const data = {
            pending: 0,
            closed: 0,
            progress: 0,
            blocked: 0
        }

        tickets.forEach(ticket => {
            if (ticket.status === "OPEN") {
                data.pending += 1
            } else if (ticket.status === "INPROGRESS") {
                data.progress += 1
            } else if (ticket.status === "BLOCKED") {
                data.blocked += 1;
            } else {
                data.closed += 1
            }
        });
        setTicketStatusCount({ ...data })
    }

    return (
        <div className='row bg-light'>
            <div className="col-1">
                <Sidebar />
            </div>
            <StatusDashboard statusDetails={ticketStatusCount} />

        </div>
    )
}

export default Engineer
