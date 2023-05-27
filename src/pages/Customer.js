import React from 'react';
import Sidebar from '../components/Sidebar';
import StatusDashboard from '../components/StatusDashboard/statusDashboard';
import useFetchTickets from '../hooks/useFetchTicket';
import useTicketUpdate from '../hooks/useTicketUpdate';
import TicketUpdateModal from '../components/TicketUpdateModal/TicketUpdateModal';
import TicketsTable from '../components/TicketMaterialTable/ticketsTable';
import TicketCreationModal from '../components/TicketCreation/TicketCreationModal';
import useCreateTicket from '../hooks/useCreateTicket';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


function Customer() {

    const location = useLocation()
    const [ticketDetails, fetchTickets] = useFetchTickets();
    const { editTicket, ticketUpdateModal, closeTicketUpdateModal, onTicketUpdate, updateTicketFn, selectedCurrTicket } = useTicketUpdate(fetchTickets);

    const { createTicketModal, closeCreateTicketUpdateModal, openCreateTicketUpdateModal } = useCreateTicket();

    useEffect(()=>{
        const path= location.pathname;

        const isCreateTicketTrue = path.split("/")[2]==="createTicket";
        if(isCreateTicketTrue){
            openCreateTicketUpdateModal()
        }

        
    })



    // const userType = localStorage.getItem("userType");
    // if (userType !== constant.userTypes.customer) {
    //     return <h1>Insufficient permission yo access</h1>
    // }

    return (
        <div className='row bg-light'>
            <div className="col-1">
                <Sidebar />
            </div>
            <div className='col my-4'>
                <div className="container">

                    <StatusDashboard ticketDetails={ticketDetails} />
                    <TicketsTable ticketDetails={ticketDetails} editTicket={editTicket} title="TICKETS RAISED BY YOU" />

                    <div>
                        <input className='bg-primary border-white text-white' style={{ width: "100%" }}
                            onClick={openCreateTicketUpdateModal} type="submit" value="Raise Ticket" />
                    </div>

                    <TicketUpdateModal disabled closeTicketUpdateModal={closeTicketUpdateModal} ticketUpdateModal={ticketUpdateModal} updateTicketFn={updateTicketFn} selectedCurrTicket={selectedCurrTicket} onTicketUpdate={onTicketUpdate} />

                    {
                        <TicketCreationModal show={createTicketModal} onClose={closeCreateTicketUpdateModal} />
                    }

                </div>
            </div>
        </div>
    )
}
export default Customer
