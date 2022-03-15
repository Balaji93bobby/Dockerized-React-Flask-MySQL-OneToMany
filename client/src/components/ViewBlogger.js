import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "@reach/router";

export const ViewBlogger = ({id}) => {
    const [blogger, setBlogger] = useState([{}])

    useEffect(() => {
        axios.get(`/api/bloggers_articles/${id}`)
            .then(res => {console.log(res);
                setBlogger(res.data);})
            .catch(err => {console.log(err)})
    }, [id])

    console.log(blogger)
    return (
    <div className="flex flex-col text-center items-center justify-center">
            <h1 className="text-3xl font-bold bg-tahiti-500 text-midnight mb-4">{blogger[0].first_name} {blogger[0].last_name}</h1>
            <h2>{blogger[0].email}</h2>

            {/* <div className="relative w-24 h-24 mb-10"> */}
            <div className="relative mb-10">   
            { blogger[0].image ===  "default" || blogger[0].image == null ?
            <img className="rounded-full border border-gray-100 h-48 w-48" src="https://i.pinimg.com/474x/ee/f4/4c/eef44ce61bce4df845e5d3f390269c37--woman-silhouette-avatar.jpg" alt="blogger" />
            
            :
            <img className="rounded-full border border-gray-100 h-48 w-48" src={`${ blogger[0].image }`} alt="blogger" />}
            <div className="absolute right-4 top-4 h-6 w-6 my-1 border-4 border-white rounded-full bg-green-400 z-2"></div>
            </div>
            <Link className="text-yellow-600 w-36 rounded bg-black" to={`/bloggers/edit/${blogger[0].blogger_id}`}>Edit Profile</Link>

        <div className="flex-1 p-10 text-lg flex flex-col items-center justify-center">
        <h2>{blogger[0].first_name}'s Articles</h2>
            { blogger ? 
                    blogger.map((x, i) => {
                        return (
                            
                            <div key={i} className="media content-section m-2 flex-auto w-96">
                                    <div className="flex flex-col items-center justify-center mb-1 bg-steel">
                                        <div className="flex flex-row items-center justify-center">
                                            <p className="text-muted">Posted on: { x.created_at }</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-center bg-metal">
                                        <div className="flex flex-col justify-center">
                                            <Link to={`/articles/view/${x.id}`}><h2 className="text-center">{x.title}</h2></Link>
                                        </div>
                                    </div>
                            </div>);
                    }):
                    null
                }
        </div>
    </div>
    )
}
