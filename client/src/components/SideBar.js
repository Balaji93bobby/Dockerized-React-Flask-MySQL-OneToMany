const SideBar = () => {
    return (
        <div>
            <div className="relative min-h-fit h-100 flex mt-20 pr-3 pt-6 border-solid">
            <div className="border-2 border-indigo-600 rounded-md sidebar mt-3 bg-sky-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform-translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <div>
                <span className="text-2xl font-extrabold">Better Dev</span>
                    <div className="bg-blue text-white">
                        <ul className="block py-2 5 px-4">
                            <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Latest Posts - # - Under Construction</li>
                            <a href="/all_bloggers"><li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">User List</li></a>
                            <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">Calendars - # - Under Construction</li>
                            <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">etc - # - Who Knows?</li>
                        </ul>
                    </div>
                </div>
        </div>
            </div>
        </div>
    )
}



export default SideBar