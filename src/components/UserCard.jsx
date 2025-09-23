import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, skills, about } = user
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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard