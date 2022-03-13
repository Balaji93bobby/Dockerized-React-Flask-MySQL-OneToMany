import React, { useState, useEffect } from 'react'
import axios from "axios"
import { navigate } from "@reach/router";

const EditBlogger = ({id}) => {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        axios.get(`/api/bloggers/${id}`)
            .then(res => {
                console.log(res.data);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setImage(res.data.image);
            })
            .catch(err => {console.log(err)})
    }, [id])

    const updateBlogger = (e) => {
        e.preventDefault();
        axios.put(`/api/bloggers/update/${id}`, {first_name, last_name, email, image})
        .then(res => {console.log(res);navigate(`/bloggers/view/${id}`)})
        .catch(err => {console.log(err)})
    }
    
    return (
        <div>
        <form onSubmit={updateBlogger} className="form">
            <h1>First Name:</h1>
            <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} className="form-input px-4 py-1 rounded-full" />
            <h1>Last Name:</h1>
            <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-input px-4 py-1 rounded-full" />
            <h1>Email:</h1>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input px-4 py-1 rounded-full" />
            <h1>Profile Image:</h1>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="form-input px-4 py-1 rounded-full" />
            <br />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Blogger</button>
            <hr style={{ backgroundColor: "green", height: 2, width: "100%"}} />
        </form>
    </div>
    )
}

export default EditBlogger
