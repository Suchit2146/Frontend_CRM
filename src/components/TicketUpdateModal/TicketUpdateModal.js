import React from 'react';
import { Modal, Button } from "react-bootstrap";
import fetchDisabledFields from '../../utils/fetchDisabledFields';

function TicketUpdateModal(props) {

    const { closeTicketUpdateModal, ticketUpdateModal, updateTicketFn, selectedCurrTicket, onTicketUpdate } = props;
    const disabledField = fetchDisabledFields()

    return (
        <Modal show={ticketUpdateModal} onHide={closeTicketUpdateModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Ticket Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={updateTicketFn}>
                    <div className="p-1">
                        <h5 className='card-subtitle mb-2 text-primary'>Ticket Id: {selectedCurrTicket._id}</h5>
                        <div className="input-group mb-3">
                            <span className='input-group-text'>Title</span>
                            <input disabled={disabledField.title} type="text" name='title' value={selectedCurrTicket.title} onChange={onTicketUpdate} />
                        </div>
                        <div className="input-group mb-3">
                            <span className='input-group-text'>Assignee</span>
                            <input disabled={disabledField.assignee} type="text" name='assignee' value={selectedCurrTicket.assignee}
                                onChange={onTicketUpdate} />
                        </div>
                        <div className="input-group mb-3">
                            <span className='input-group-text'>Status</span>
                            <input disabled={disabledField.status} type="text" name='status' value={selectedCurrTicket.status}
                                onChange={onTicketUpdate} />
                        </div>
                        <div className="input-group mb-3">
                            <textarea disabled={disabledField.description} type="text" className='md-textarea form-control' row="4" name='description'
                                value={selectedCurrTicket.description} onChange={onTicketUpdate} />
                        </div>
                        <div className="input-group mb-3">
                            <span className='input-group-text'>Priority</span>
                            <input disabled={disabledField.priority} type="text" name='ticketPriority' value={selectedCurrTicket.ticketPriority}
                                onChange={onTicketUpdate} />
                        </div>
                    </div>
                    <Button variant='secondary' onClick={closeTicketUpdateModal}>
                        Close
                    </Button>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </form>

            </Modal.Body>
        </Modal>
    )
}

export default TicketUpdateModal
