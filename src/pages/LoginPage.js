import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validateEmail, setValidateEmail] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [user, setUser] = useState('');
    
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const setValidate = () => {
        if (email.length > 0 && validEmail.test(email) === true) {
            setValidateEmail(true);
        } else {
            setValidateEmail(false);
        }
        if (password.length >= 8) {
            setValidatePassword(true);
        } else {
            setValidatePassword(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateEmail === true && validatePassword === true) {
            axios.get('https://60dff0ba6b689e001788c858.mockapi.io/token').then(response => {
                console.log(response.data);
                setUser(response.data);
            })
        }
        
    }

    return (
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={evt => setEmail(evt.target.value)} />
                    {validateEmail === false && <p className="error">Your email is invalid</p>}
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={evt => setPassword(evt.target.value)} />
                    {validatePassword === false ? <p className="error">Your password is invalid</p> : ''}
                </label>
                <div>
                    <button className="btn" type="submit" onClick={setValidate}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
