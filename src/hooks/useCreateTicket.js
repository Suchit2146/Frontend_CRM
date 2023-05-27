import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function useCreateTicket() {
    const navigate = useNavigate()
    const [createTicketModal, setCreateTicketModal] = useState(false);

    const closeCreateTicketUpdateModal = () => {
        setCreateTicketModal(false);
        navigate('/customer')
    }

    const openCreateTicketUpdateModal = () => {
        setCreateTicketModal(true);
        navigate('/customer/createTicket')

    }

    return { createTicketModal, closeCreateTicketUpdateModal, openCreateTicketUpdateModal };
}

export default useCreateTicket
