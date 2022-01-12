import axios from "axios"
import { navigate } from "@reach/router";

const Navbar = () => {
    

    const logOut = (e) => {
        e.preventDefault();
        axios.get('/logout')
            .then(res => {console.log(res); navigate("/")})
            .catch(err => console.log(err))
    }
    return (
        <div>
            <header className="site-header">
            <nav className="bg-steel">
                <div className="bg-steel border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                    <h3 className="text-3xl font-bold bg-tahiti-500 text-silver mb-4">Travel Blog</h3>

                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <div className="hidden w-full md:block md:w-auto">
                            <a className="nav-item nav-link text-2xl italic mr-4" href="/dashboard">Home</a>
                            <button className="nav-item nav-link text-2xl italic mr-4" href="{% url 'blog-about' %}">About</button>
                            <a className="nav-item nav-link text-2xl italic" href="/create_article">Add a Post</a>
                        </div>

                        <div className="hidden w-full md:block md:w-auto">
                            <a className="nav-item nav-link text-2xl italic mr-4" href="/">Login</a>
                            <a className="nav-item nav-link text-2xl italic mr-4" href="bloggers/register">Register</a>
                            <button className="nav-item nav-link text-2xl italic" onClick={logOut}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            </header>
        </div>
    )
}

export default Navbar
