import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Connections = () => {
    const [connectedUsers, setConnectedUsers] = useState([])
    const fetchConnections = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/user/connections", {
                withCredentials: true
            })
            setConnectedUsers(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchConnections()
    }, [])
    if (connectedUsers.length === 0) {
        return <div>
            No Connection found
        </div>
    }

    return (
        <div className='text-center my-10'>
            <h1 className='text-2xl font-bold'>Connections</h1>
            {connectedUsers.map(
                (connection) => {
                    const { firstName, lastName, age, gender, about, photoUrl } = connection;
                    return (
                        <div key={connection._id} className='flex my-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto'>
                            <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
                            <div className='text-left mx-4'>
                                <h2 className='font-bold text-xl'>{firstName + (lastName && (" " + lastName))}</h2>
                                <h2>{age && gender && age + " " + gender}</h2>
                                <h2>{about}</h2>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default Connections