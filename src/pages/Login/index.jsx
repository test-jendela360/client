import './style.css';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios/index';

export default function Login() {
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/');
        }
    }, [])

    async function onSubmit(e) {
        e.preventDefault();
        console.log(userLogin, '<<< submit');
        try {
            const { data } = await axios.post('/api/login', userLogin);
            localStorage.setItem('token', data);
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    function onChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setUserLogin({...userLogin, [key] : value})
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={onSubmit}>
                        <div className="mt-3">
                            <input type="email" className="form-control" name="email" onChange={onChange} value={userLogin.username} placeholder="username"/>
                        </div>
                        <div className="mt-3">
                            <input type="password" name="password" className="form-control" onChange={onChange} value={userLogin.password} placeholder="password"/>
                        </div>
                        <button className="btn btn-primary mt-5" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
