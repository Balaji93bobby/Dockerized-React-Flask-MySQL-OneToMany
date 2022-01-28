import React, {useState, useEffect} from 'react';
import axios from "axios"
import { Link } from "@reach/router";

const AllBloggers = () => {

    const [bloggers, setBlogger] = useState([])

    useEffect(() => {
        axios.get(`/bloggers`)
            .then(res => {console.log(res);
                setBlogger(res.data);})
            .catch(err => {console.log(err)})
    }, [])
    return(
    <div>
{bloggers.map((x,i) => {
    return (

        <div key={i} className="flex flex-col items-center justify-center">
            <h1 className="text-left">{x.first_name} {x.last_name}</h1>
            { x.image ===  "default" || x.image == null ?
            <img className="h-12 w-12 rounded-full" src="https://i.pinimg.com/474x/ee/f4/4c/eef44ce61bce4df845e5d3f390269c37--woman-silhouette-avatar.jpg" alt="blogger"  />:
            <img className="h-12 w-12 rounded-full" src={`${ x.image }`} alt="blogger"  />}

    </div>
    )
})}
    </div>
    );
};

export default AllBloggers;
