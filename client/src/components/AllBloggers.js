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
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
{bloggers.map((x,i) => {
    return (
    <div className="flex flex-col items-center bg-metal rounded">
        <div key={i} className="flex flex-col items-center rounded overflow-hidden shadow-lg">
            { x.image ===  "default" || x.image == null ?
            <img className="mt-2 object-contain h-48 w-96" src="https://i.pinimg.com/474x/ee/f4/4c/eef44ce61bce4df845e5d3f390269c37--woman-silhouette-avatar.jpg" alt="blogger"  />:
            <img className="mt-2 object-contain h-48 w-96" src={`${ x.image }`} alt="blogger"  />}
            <div className="font-bold text-xl mb-2">
                <h1 className="text-left">{x.first_name} {x.last_name}</h1>
                <p class="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
        </div>
    </div>
    )
})}
    </div>
    );
};

export default AllBloggers;
