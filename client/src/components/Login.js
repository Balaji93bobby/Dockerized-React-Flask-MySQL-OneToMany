import React, { useState } from 'react'
import axios from "axios"
import { navigate } from "@reach/router";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("/api/bloggers/login", {email, password})
            .then(res => {console.log(res); navigate("/dashboard")})
            .catch(err => {console.log(err.response.data); setErrors(err.response.data); navigate("/")})
    }

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold bg-tahiti-500 text-midnight mb-4">Sign In</h2>
            <form onSubmit={handleLogin} className="flex flex-col items-center justify-center"> 
                <label>Please Enter Your Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input px-4 py-1 rounded-full" />

                { errors &&
                <p>{errors.Emailmessage}</p>}

                <label>Please Enter Your Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input px-4 py-1 rounded-full" />

                { errors &&
                <p>{errors.Passwordmessage}</p>}

                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
                <div class="border-top pt-3">
                <small class="text-muted">
                    Don't Have An Account? <a class="ml-2" href="/bloggers/register">Register!</a>
                </small>
            </div>
            </form>

        </div>
    )
}

export default Login
