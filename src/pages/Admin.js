import React from 'react';
import Sidebar from '../components/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { getAllTickets, updateTicket } from "../api/ticket";
import { getAllUsers, updateUser } from "../api/user"
import MaterialTable from 'material-table';
import { Modal, Button } from "react-bootstrap";
import StatusDashboard from '../components/statusDashboard/statusDashboard';
import { createTicketsCount } from "../handlers/ticketHandler"
// import { Cursor, textarea } from 'react-bootstrap-icons';

function Admin() {

    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketStatusCount, setTicketStatusCount] = useState({});
    const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false);

    const [userDetails, setUserdetails] = useState([]);
    const [selectedCurrUser, setSelectedCurrUser] = useState({});
    const [userUpdateModal, setUserUpdateModal] = useState(false);


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
                setUserdetails(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const editUser = (userDetail) => {
        // console.log(userDetail);
        setUserUpdateModal(true);
        setSelectedCurrUser(userDetail);
    }

    const updateUserFn = (e) => {
        e.preventDefault();
        // console.log(e);

        const userData = {
            _id: selectedCurrUser._id,
            status: selectedCurrUser.userStatus
        }

        // API CALL
        updateUser(userData)
            .then((res) => {
                if (res.status === 200) {
                    console.log("ticket update successfully");
                    // console.log(res);
                    setUserUpdateModal(false)
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            })

    }

    const closeUserUpdateModal = () => {
        setUserUpdateModal(false);
    }

    const updateTicketsCount = (tickets) => {
        const ticketsCount = createTicketsCount(tickets)
        setTicketStatusCount({ ...ticketsCount })
    }

    const editTicket = (ticketDetail) => {
        // console.log(ticketDetail);
        setTicketUpdateModal(true);
        setSelectedCurrTicket(ticketDetail);
    }

    const closeTicketUpdateModal = () => {
        setTicketUpdateModal(false)
    }

    const onUserUpdate = (e) => {
        // console.log(e.target);
        let userFieldName = e.target.name;

        if (userFieldName === "status") {
            selectedCurrUser.userStatus = e.target.value
        }

        setSelectedCurrUser({ ...selectedCurrUser })
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
                        <div className="row text-center">

                            <StatusDashboard statusDetails={ticketStatusCount} />

                        </div>

                        <br />

                        <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                onRowClick={(event, rowData) => editUser(rowData)}
                                columns={[
                                    { title: 'USERID', field: 'userId' },
                                    { title: 'NAME', field: 'name' },
                                    { title: 'EMAIL', field: 'email' },
                                    { title: 'ROLE', field: 'userTypes' },
                                    { title: 'STATUS', field: 'userStatus' }
                                ]}
                                title="USER RECORDS"
                                data={userDetails}

                                options={{
                                    sorting: true,
                                    filtering: true,
                                    rowStyle: {
                                        backgroundColor: "light-grey",
                                        cursor: "pointer"
                                    }
                                }}
                            />

                            <Modal show={userUpdateModal} onHide={closeUserUpdateModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit User Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={updateUserFn}>
                                        <div className="p-1">
                                            <h5 className='card-subtitle mb-2 text-primary'>UserId: {selectedCurrUser.userId} </h5>
                                            <h5 className='card-subtitle mb-2 text-primary'>UserType: {selectedCurrUser.userTypes} </h5>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Name</span>
                                                <input type="text" disabled name='name' value={selectedCurrUser.name} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Email</span>
                                                <input type="text" disabled name='email' value={selectedCurrUser.email} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className='input-group-text'>Status</span>
                                                <select name='status' value={selectedCurrUser.userStatus} onChange={onUserUpdate} className='form-select'>
                                                    <option value="APPROVED">APPROVED</option>
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="REJECTED">REJECTED</option>
                                                </select>
                                            </div>
                                        </div>
                                        <Button variant='secondary' onClick={closeUserUpdateModal}>
                                            Close
                                        </Button>
                                        <Button type='submit' variant='primary'>
                                            Update
                                        </Button>
                                    </form>
                                </Modal.Body>
                            </Modal>
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
