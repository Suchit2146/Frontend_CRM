import React from 'react';
import Sidebar from '../components/Sidebar';
import StatusDashboard from '../components/statusDashboard/statusDashboard';
import useFetchTickets from '../hooks/useFetchTicket';


function Engineer() {
    const [ticketDetails] = useFetchTickets();

    return (
        <div className='row bg-light'>
            <div className="col-1">
                <Sidebar />
            </div>
            <StatusDashboard ticketDetails={ticketDetails} />

        </div>
    )
}

export default Engineer


