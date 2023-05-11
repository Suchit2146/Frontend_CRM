import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { getAllTickets } from "../api/ticket";
import { getAllUsers } from "../api/user"
import MaterialTable from 'material-table';

import { ThemeProvider, createTheme } from '@mui/material';

function Admin() {

    const userName = localStorage.getItem("name");

    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketStatusCount, setTicketStatusCount] = useState({});
    const [tableData, setTableData] = useState([]);
    const [userDeatils, setUserdetails] = useState([])

    const columns = [
        { title: "name", field: "name" },
        { title: "email", field: "email" }
    ]


    useEffect(() => {
        fetchTickets();
        fetchUsers();
    }, []);

    const fetchTickets = () => {
        getAllTickets()
            .then((res) => {
                // console.log(res);
                console.log(res.data);
                setTicketDetails(res.data)
                updateTicketsCount(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const fetchUsers = () => {
        getAllUsers()
            .then((res) => {
                setUserdetails(res.data)
                console.log(res.data);
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
                                    rowStyle: {
                                        backgroundColor: "blanchedalmond"
                                    }
                                }}

                                title="USER RECORDS"
                                data={userDeatils}
                            />
                        </div>

                        <hr />

                        <div style={{ maxWidth: "100%" }}>
                            <MaterialTable
                                columns={[
                                    { title: 'TICKETID', field: '_id' },
                                    { title: 'TITLE', field: 'title' },
                                    { title: 'DESCRIPTION', field: 'description' },
                                    { title: 'REQUESToR', field: 'requestor' },
                                    { title: 'PRIORITY', field: 'ticketPriority' },
                                    { title: 'ASSIGNEE', field: 'assignee' },
                                    { title: 'STATUS', field: 'status' }

                                ]}

                                options={{
                                    sorting: true,
                                    rowStyle: {
                                        backgroundColor: "blanchedalmond"
                                    }
                                }}

                                title="TICKET RECORDS"
                                data={ticketDetails}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
