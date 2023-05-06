import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { userSignUp, userSignin } from "../api/auth"

function Login() {

    const [showSignup, setShowSignup] = useState(false);

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("CUSTOMER");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)

    const toggleSignup = () => {
        clearState()
        setShowSignup(!showSignup)
    }

    const clearState = () => {
        setUserEmail("")
        setUserId("")
        setPassword("")
        setUserName("")
        setError(false);
        setMessage("")
    }
    const onSignup = (e) => {
        const data = {
            name: userName,
            userId: userId,
            email: userEmail,
            userType: userType,
            password: password

        };
        e.preventDefault();

        if (userId.length < 5) {
            setError(true);
            setMessage("userId should be of 5 to 10 character")
            return;
        }
        else if (password.length < 5 || password.length > 12) {
            setError(true);
            setMessage("Password should be of 5 to 12 character")
            return;
        }

        //api call
        userSignUp(data)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setError(false);
                setMessage("signup sucessfull")
                window.location.href = "/"
            })
            .catch((err) => {
                // console.log(err.message);
                if (err.response.status === 400) {
                    // console.log(err.response.data.message);
                    setError(true);
                    setMessage(err.response.data.message);
                }
            })
    }

    const onLogin = (e) => {
        const data = { userId, password }

        e.preventDefault();

        userSignin(data)
            .then(res => {
                // console.log(res);
                setError(false);
                setMessage("Login Successfull")

                if (res.data.userType === "ENGINEER") {
                    window.location.href = "/engineer"
                } else if (res.data.userType === "CUSTOMER") {
                    window.location.href = "/customer"
                } else {
                    window.location.href = "/admin"
                }
            })
            .catch((err) => {
                if (err.response.status) {
                    setError(true);
                    setMessage(err.response.data.message)
                }
            })

    }

    const updateSignUpData = (e) => {
        // console.log(e.target.value);
        const id = e.target.id;
        if (id === "userId") {
            setUserId(e.target.value)
        }
        else if (id === "password") {
            setPassword(e.target.value)
        }
        else if (id === "email") {
            setUserEmail(e.target.value)
        }
        else {
            setUserName(e.target.value)
        }
    }

    return <div className="bg-info d-flex justify-content-center align-items-center vh-100">
        <div style={{ width: 30 + "rem" }} className="card p-3 rounded-3 shadow-lg">

            <h4 className="text-info">{showSignup ? "Sign Up" : "Log In"}</h4>

            <form onSubmit={showSignup ? onSignup : onLogin}>
                <div className="input-group">
                    <input className="form-control m-1" type="text" id="userId" value={userId} onChange={updateSignUpData} placeholder="Userid" />
                </div>

                {
                    showSignup &&
                    <>
                        <div className="input-group">
                            <input className="form-control m-1" type="text" id="userName" value={userName} onChange={updateSignUpData} placeholder="UserName" />
                        </div>

                        <div className="input-group">
                            <input className="form-control m-1" type="email" id="email" value={userEmail} onChange={updateSignUpData} placeholder="Email" />
                        </div>
                    </>
                }
                <div className="input-group">
                    <input className="form-control m-1" type="password" id="password" value={password} onChange={updateSignUpData} placeholder="Password" />
                </div>

                {
                    showSignup &&
                    <>
                        <DropdownButton
                            title={userType}
                            id="userType"
                            variant="light"
                            align="end"
                        >
                            <Dropdown.Item eventKey="CUSTOMER"> CUSTOMER </Dropdown.Item>
                            <Dropdown.Item eventKey="ENGINEER"> ENGINEER </Dropdown.Item>
                        </DropdownButton>

                    </>
                }

                <div className="input-group">
                    <input className="form-control btn btn-info m-1 text-white" type="submit"
                        value={showSignup ? "Sign Up" : "Log In"} />
                </div>

                <div className="text-info m-1" onClick={toggleSignup}>
                    {
                        showSignup ? "Already have an account ? Log In" : "Don't have an account ? Sign Up"
                    }

                </div>
                <div className={error ? "text-danger" : "text-success"}>{message}</div>
            </form>
        </div>
    </div>
}

export default Login;