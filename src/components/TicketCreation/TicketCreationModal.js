import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { createNewTicket } from '../../api/ticket'

function TicketCreationModal(props) {

    const createTicket = (e) => {
        e.preventDefault()

        const title = e.target.title.value
        const description = e.target.title.value
        const priority = parseInt(e.target.title.value)

        const ticket = { title, description, priority };

        createNewTicket(ticket)
            .then((res) => {
                if (res.status == 201) {
                    window.location.href = "/customer"
                }
            }).catch((err) => {
                console.log(err);
            })

    }


    return (
        <Modal show={props.show} onHide={props.onClose} >
            <Modal.Header closeButton >
                <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={createTicket} >
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>Title</span>
                        <input type="text" name='title' required />
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>Description</span>
                        <textarea name="description" id="description" rows="5" required></textarea>
                    </div>
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>Priority</span>
                        <select className='form-select' >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <Button variant='secondary' onClick={props.onClose}>Cancel</Button>
                    <Button type='submit' variant='primary' >Create</Button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default TicketCreationModal
