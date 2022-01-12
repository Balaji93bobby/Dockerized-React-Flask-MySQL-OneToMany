import React, { useState, useEffect } from 'react'
import axios from "axios"
import { navigate } from "@reach/router";
const EditArticle = ({id}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        axios.get(`/articles/${id}`)
            .then(res => {console.log(res.data);
                setTitle(res.data.title);
                setBody(res.data.body);})
            .catch(err => {console.log(err)})
    }, [id])

    const updateArticle = (e) => {
        e.preventDefault();
        axios.put(`/articles/update/${id}`, {title, body})
        .then(res => {console.log(res);navigate("/dashboard")})
        .catch(err => {console.log(err)})
    }

    return (
            <div>

                <form onSubmit={updateArticle} className="form">
                    <h1>City Name:</h1>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                    <h1>Travel Experience:</h1>
                    <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} className="form-input px-4 py-1 rounded-full" />
                    <br />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Article</button>
                    <hr style={{ backgroundColor: "green", height: 2, width: "100%"}} />
                </form>
            </div>
    )
}

export default EditArticle
