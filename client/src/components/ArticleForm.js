import React, { useState } from 'react'
import { navigate } from "@reach/router";
import axios from "axios"
const ArticleForm = ({setSubmitted, submitted}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([])

    const addArticle = (e) => {
        e.preventDefault()
        axios.post("/articles/create", { 
            title, body
        })
        .then(res => {
            console.log(res);
            setSubmitted(!submitted)
            setTitle("");
            setBody("");
            navigate("/dashboard")})
        .catch(err => {console.log(err.response.data); setErrors(err.response.data); navigate("/dashboard") })
        }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div class="h-44 w-full bg-gradient-to-b from-sky-500 to-silver"></div>
                <img className="h-44 rounded-lg rounded-t-none" src="https://www.nycgovparks.org/pagefiles/75/citywide-priorities.jpg" alt="city" />
                <div class="h-44 w-full bg-gradient-to-b from-sky-500 to-silver"></div>
            </div>
            
            <h2 className="text-3xl font-bold bg-tahiti-500 text-midnight mb-4">Add a Travel Blog!</h2>
            <form onSubmit={addArticle} className="form">
                <label className="col-md-2 control-label">City Name:</label>
                <input className="form-input px-4 py-1 rounded-full" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                { errors &&
                <p>{errors.Titlemessage}</p>}

                <label>Travel Experience:</label>
                <textarea className="form-input px-4 py-1 rounded-full" type="body" value={body} onChange={(e) => setBody(e.target.value)} />

                { errors &&
                <p>{errors.Bodymessage}</p>}

                <br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add a Post</button>

            </form>
        </div>
    )
}

export default ArticleForm
