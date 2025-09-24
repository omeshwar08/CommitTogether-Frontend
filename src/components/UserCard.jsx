import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../store/feedSlice';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = user
    const dispatch = useDispatch();

    const handleRequests = async (status, userId) => {
        try {
            axios.post(import.meta.env.VITE_API_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={photoUrl || "https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg"}
                    alt="image"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName + (lastName ? (" " + lastName) : "")}</h2>
                {about && <p>{about}</p>}
                {age && gender && <p>{age + ", " + gender}</p>}
                {skills && <p>{skills.join(", ")}</p>}
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => handleRequests("ignore", _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleRequests("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard