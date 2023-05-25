import React from 'react'
import { useState } from 'react'

function useCreateTicket() {
    const [createTicketModal, setCreateTicketModal] = useState(false);

    const closeCreateTicketUpdateModal = () => {
        setCreateTicketModal(false)
    }

    const openCreateTicketUpdateModal = () => {
        setCreateTicketModal(true)
    }

    return { createTicketModal, closeCreateTicketUpdateModal, openCreateTicketUpdateModal };
}

export default useCreateTicket
