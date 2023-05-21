import React from 'react';
import Sidebar from '../components/Sidebar';
import StatusDashboard from "../components/StatusDashboard/statusDashboard";
import useFetchTickets from '../hooks/useFetchTicket';
import TicketsTable from '../components/TicketMaterialTable/ticketsTable';
import useTicketUpdate from '../hooks/useTicketUpdate';
import TicketUpdateModal from '../components/TicketUpdateModal/TicketUpdateModal';


function Engineer() {
    const [ticketDetails, fetchTickets] = useFetchTickets();
    const { editTicket, ticketUpdateModal, closeTicketUpdateModal, onTicketUpdate, updateTicketFn, selectedCurrTicket } = useTicketUpdate(fetchTickets);

    return (
        <div className='row bg-light'>
            <div className="col-1">
                <Sidebar />
            </div>
            <div className='col my-4'>
                <div className="container">

                    <StatusDashboard ticketDetails={ticketDetails} />
                    <TicketsTable ticketDetails={ticketDetails} editTicket={editTicket} title="TICKETS ASSIGNED TO YOU" />
                    <TicketUpdateModal closeTicketUpdateModal={closeTicketUpdateModal} ticketUpdateModal={ticketUpdateModal} updateTicketFn={updateTicketFn} selectedCurrTicket={selectedCurrTicket} onTicketUpdate={onTicketUpdate} />
                </div>
            </div>

        </div>
    )
}

export default Engineer


