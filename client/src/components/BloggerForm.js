import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const BloggerForm = () => {
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    const addBlogger = (e) => {
        e.preventDefault()
        axios.post("/api/bloggers/register", {
            first_name,
            last_name,
            email,
            password
        })
        .then((res => {console.log(res); navigate("/dashboard")}))
        .catch((err) => {console.log(err.response.data); setErrors(err.response.data); navigate("/bloggers/register")})
    }

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold bg-tahiti-500 text-midnight mb-4">Sign Up</h2>
            <form onSubmit={addBlogger} className="form">
                <label>First Name</label>
                <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                { errors &&
                <p>{errors.FNmessage}</p>}
                <label>Last Name</label>
                <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                { errors &&
                <p>{errors.LNmessage}</p>}
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                { errors &&
                <p>{errors.Emailmessage}</p>}
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Account</button>
                <div className="border-top pt-3">
                <small className="text-muted">
                    Already Have An Account? <a className="ml-2" href="/">Sign In!</a>
                </small>
            </div>
            </form>
        </div>
    )
}

export default BloggerForm
