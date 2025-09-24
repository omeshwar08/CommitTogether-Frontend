import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Requests = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchRequests = async () => {
        setLoading(true)
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/user/requests/received", {
                withCredentials: true
            })
            setRequests(response.data.connectionRequest);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchRequests();
    }, [])

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            fetchRequests();
        }
        catch (error) {
            console.log(error.response);
        }
    }

    if (loading) {
        return <div className="text-center my-10 text-xl font-bold">Loading...</div>
    }

    if (!loading && requests.length === 0) {
        return (
            <div className="text-center my-10 text-2xl font-bold">
                No pending requests
            </div>
        )
    }
    return (
        <div className='text-center my-5'>
            <h1 className='text-2xl font-bold'>Requests</h1>
            {
                requests.map(
                    (request) => {
                        const { firstName, lastName, age, gender, about, photoUrl } = request.from;
                        return (
                            <div key={request._id} className='flex justify-between items-center my-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto'>
                                <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
                                <div className='text-left mx-4'>
                                    <h2 className='font-bold text-xl'>{firstName + (lastName ? (" " + lastName) : "")}</h2>
                                    <h2>{age && gender && age + " " + gender}</h2>
                                    <h2>{about && about}</h2>
                                </div>
                                <div className='mx-2'>
                                    <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                    <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default Requests