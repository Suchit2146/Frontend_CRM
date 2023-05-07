import React from 'react';
import Sidebar from '../components/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
import { getAllTickets } from "../api/ticket"

function Admin() {
    const userName = localStorage.getItem("name");

    const [tiketDetails, setTicketDetails] = useState([]);

    useEffect(() => {
        fetchTickets()
    }, []);

    const fetchTickets = () => {
        getAllTickets()
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                setTicketDetails(res.data)
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

            <div className='col vh-100 my-4'>
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
                                                <h1 className='text-dark mx-4'>8</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({ pathColor: "darkBlue" })} />
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
                                                <h1 className='text-dark mx-4'>4</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={40} styles={buildStyles({ pathColor: "#EEBC1D" })} />
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
                                                <h1 className='text-dark mx-4'>7</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={70} styles={buildStyles({ pathColor: "green" })} />
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
                                                <h1 className='text-dark mx-4'>5</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ height: 50, width: 50 }}>
                                                    <CircularProgressbar value={50} styles={buildStyles({ pathColor: "black" })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;
