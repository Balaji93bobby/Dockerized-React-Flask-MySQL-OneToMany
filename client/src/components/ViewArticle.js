import React, { useState, useEffect } from 'react'
import axios from "axios"
import { GoogleMap, useLoadScript } from "@react-google-maps/api"
import { Link } from "@reach/router";

const mapContainerStyle = {
    width: "40vw",
    height: "40vh"
}

const Key = "dNRDTO6hjvETgxCteuW40aYSlFl7_HSXBMFy_7N6FRM"
const ViewArticle = ({id}) => {
    const [article, setArticle] = useState({})
    const [lat, setLat] = useState(32.715736)
    const [lng, setLng] = useState(-117.161087)
    const [libraries] = useState(["places"]);
    const [cityImage, setCityImage] = useState("")


    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    }

    useEffect(() => {
        axios.get(`/articles_bloggers/${id}`)
            .then(res => {;
                setArticle(res.data[0]);})
            .catch(err => {console.log(err)})
    }, [id])

    useEffect(() => {
        axios.get(`https://api.unsplash.com/search/photos?query=${article.title}&client_id=${Key}`)
            .then(res => {console.log(res.data.results);
                setCityImage(res.data.results[2].urls.small);})
                
            .catch(err => {console.log(err)})
    }, [article.title])
    console.log(cityImage)

    useEffect(() => {

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${article.title}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
            )
            .then((response) => {
                console.log(response);
                setLat(response.data.coord.lat);
                setLng(response.data.coord.lon);

            })
            .catch(function (error) {
                console.log(error);

            });
    },[article.title]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <div>
            <br />
            <div className="map">
                <h1 className="text-3xl font-bold bg-tahiti-500 text-midnight pt-4 my-4 break-normal">Location: {article.title}</h1>

                <img className="h-40" src={`${cityImage}`} alt="img" />
                <p className="mb-4 text-lg">Posted By: <Link className="text-green-600 text-lg w-36 rounded bg-black" to={`/bloggers/view/${article.blogger_id}`}>{article.first_name} {article.last_name}</Link></p>
                <p className="mb-2 text-lg">Email Address: <span className="w-46 rounded bg-black text-white text-lg">{article.email}</span></p>
                <h3 className="mb-2 text-white text-lg bg-green-500 rounded w-2/12">Travel Experience</h3>

                    <p className="text-white bg-green-800 w-2/12 text-center h-fit rounded mb-4">{article.body}</p>

                {/* <hr className="bg-black w-full"/> */}
                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center} /> 
    
            </div>
        </div>
    )
}

export default ViewArticle
