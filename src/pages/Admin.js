import React from 'react';
import Sidebar from '../components/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { getAllTickets, updateTicket } from "../api/ticket";
import { getAllUsers } from "../api/user"
import MaterialTable from 'material-table';
import { Modal, Button } from "react-bootstrap";
import { Cursor, Textarea } from 'react-bootstrap-icons';

function Admin() {

    const userName = localStorage.getItem("name");

    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketStatusCount, setTicketStatusCount] = useState({});
    const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
    const [userDeatils, setUserdetails] = useState([]);


    useEffect(() => {
        fetchTickets();
        fetchUsers();
    }, []);

    const fetchTickets = () => {

        getAllTickets()
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setTicketDetails(res.data)
                updateTicketsCount(res.data)
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const fetchUsers = () => {
        getAllUsers()
            .then((res) => {
                setUserdetails(res.data)
                // console.log(res.data);
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

    const editTicket = (ticketDetail) => {
        // console.log(ticketDetail);
        setTicketUpdateModal(true);
        setSelectedCurrTicket(ticketDetail);
    }

    const closeTicketUpdateModal = () => {
        setTicketUpdateModal(false)
    }

    const onTicketUpdate = (e) => {

        // console.log(e.target);

        const fieldName = e.target.name;

        if (fieldName === "title") {
            selectedCurrTicket.title = e.target.value;
        } else if (fieldName === "description") {
            selectedCurrTicket.description = e.target.value;
        } else if (fieldName === "status") {
            selectedCurrTicket.status = e.target.value;
        } else if (fieldName === "assignee") {
            selectedCurrTicket.assignee = e.target.value;
        } else if (fieldName === "ticketPriority") {
            selectedCurrTicket.ticketPriority = e.target.value;
        }

        setSelectedCurrTicket({ ...selectedCurrTicket })
    }

    const updateTicketFn = (e) => {
        e.preventDefault();
        // console.log(selectedCurrTicket);

        // API CALL
        updateTicket(selectedCurrTicket)
            .then((res) => {
                // console.log(res);
                console.log("ticket update successfully");
                setTicketUpdateModal(false);
                fetchTickets()
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div className='row bg-light'>
            <div className="col-1">
                <Sidebar />
            </div>

            <div className='col my-4'>
                <div className="container">
                    <div>
                        <h3 className='text-primary text-center'>Welcome, {userName}</h3>
                        <p className='text-center text-muted'>Take a quick look at your admmin stats below</p>

                        <div className="row text-center">

                            <div className='col-xs-12 col-md-6 col-lg-3 my-1'>
                                <div className="card cardItem shadow bg-primary text-dark bg-opacity-25 border border-primary">
                                    <div className="card-body">
                                        <h5 className='mb-2'>
                                            <i className='bi bi-pencil mx-2 text-primary'></i>
                                            Open
                                        </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <h1 className='text-dark mx-4'>{ticketStatusCount.pending}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={ticketStatusCount.pending} styles={buildStyles({ pathColor: "darkBlue" })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-12 col-md-6 col-lg-3 my-1'>
                                <div className="card cardItem shadow bg-warning text-dark bg-opacity-25 border border-warning">
                                    <div className="card-body">
                                        <h5 className='mb-2'>
                                            <i className='bi bi-lightning-charge mx-2 text-warning'></i>
                                            Progress
                                        </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <h1 className='text-dark mx-4'>{ticketStatusCount.progress}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={ticketStatusCount.progress} styles={buildStyles({ pathColor: "#EEBC1D" })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-12 col-md-6 col-lg-3 my-1'>
                                <div className="card cardItem shadow bg-success text-dark bg-opacity-25 border border-success">
                                    <div className="card-body">
                                        <h5 className='mb-2'>
                                            <i className='bi bi-check-circle mx-2 text-success'></i>
                                            Closed
                                        </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <h1 className='text-dark mx-4'>{ticketStatusCount.closed}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={ticketStatusCount.closed} styles={buildStyles({ pathColor: "green" })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-12 col-md-6 col-lg-3 my-1'>
                                <div className="card cardItem shadow bg-secondary text-dark bg-opacity-25 border border-secondary">
                                    <div className="card-body">
                                        <h5 className='mb-2'>
                                            <i className='bi bi-slash-circle mx-2 text-dark'></i>
                                            Blocked
                                        </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <h1 className='text-dark mx-4'>{ticketStatusCount.blocked}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={ticketStatusCount.blocked} styles={buildStyles({ pathColor: "black" })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                columns={[
                                    { title: 'USERID', field: 'userId' },
                                    { title: 'NAME', field: 'name' },
                                    { title: 'EMAIL', field: 'email' },
                                    { title: 'ROLE', field: 'userTypes' },
                                    { title: 'STATUS', field: 'userStatus' }

                                ]}

                                options={{
                                    sorting: true,
                                    rowStyle: {
                                        backgroundColor: "light-grey",
                                        cursor: "pointer"
                                    }
                                }}

                                title="USER RECORDS"
                                data={userDeatils}
                            />
                        </div>

                        <hr />

                        <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                onRowClick={(event, rowdata) => editTicket(rowdata)}
                                columns={[
                                    { title: 'TICKETID', field: '_id' },
                                    { title: 'TITLE', field: 'title' },
                                    { title: 'DESCRIPTION', field: 'description' },
                                    { title: 'REQUESToR', field: 'requestor' },
                                    { title: 'PRIORITY', field: 'ticketPriority' },
                                    { title: 'ASSIGNEE', field: 'assignee' },
                                    { title: 'STATUS', field: 'status' }

                                ]}
                                title="TICKET RECORDS"
                                data={ticketDetails}

                                options={{
                                    sorting: true,
                                    rowStyle: {
                                        backgroundColor: "blanchedalmond",
                                        Cursor: "pointer"
                                    }
                                }}
                            />

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
                                                <input type="text" name='title' value={selectedCurrTicket.title} onChange={onTicketUpdate} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Assignee</span>
                                                <input type="text" name='assignee' value={selectedCurrTicket.assignee}
                                                    onChange={onTicketUpdate} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Status</span>
                                                <input type="text" name='status' value={selectedCurrTicket.status}
                                                    onChange={onTicketUpdate} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <textarea type="text" className='md-textarea form-control' row="4" name='description'
                                                    value={selectedCurrTicket.description} onChange={onTicketUpdate} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Priority</span>
                                                <input type="text" name='ticketPriority' value={selectedCurrTicket.ticketPriority}
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

                            {/* <Modal show={true} onHide={()=>{}}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>{}}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={()=>{}}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
