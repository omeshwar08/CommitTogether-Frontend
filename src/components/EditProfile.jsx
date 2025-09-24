/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import UserCard from "./UserCard"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from "../store/userSlice"

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [skillInput, setSkillInput] = useState("");
    const [age, setAge] = useState(user.age);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [toast, setToast] = useState(false)
    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skillInput.trim() && !skills.includes(skillInput.trim().toLowerCase())) {
            setSkills([...skills, skillInput.trim().toLowerCase()]);
            setSkillInput("");
        }
    };
    const handleRemoveSkill = (removeSkill) => {
        setSkills(skills.filter((s) => s !== removeSkill));
    };
    const saveProfile = async () => {
        setError("")
        try {
            const response = await axios.patch(import.meta.env.VITE_API_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    skills,
                    photoUrl
                }, { withCredentials: true }
            )
            dispatch(addUser(response?.data?.user))
            setToast(true)
            setTimeout(() => setToast(false), 3000);
        } catch (error) {
            setError(error.response.data)
            console.log(error.response);
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className='flex justify-center'>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center font-bold">Profile</h2>
                        {/* first name input field */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        {/* last name */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        {/* age */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="number" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        {/* gender */}
                        <fieldset>
                            <legend className="fieldset-legend">Gender</legend>
                            <select
                                placeholder="Select Gennder"
                                className="input"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </fieldset>
                        {/* About */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>
                        {/* Photo Url */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo Url</legend>
                            <input type="text" className="input" placeholder="Photo Url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>
                        {/* skills */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Skills</legend>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="input flex-grow"
                                    placeholder="Add a skill"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                                />
                                <button onClick={handleAddSkill} className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills.map((s, i) => (
                                    <div key={i} className="badge badge-outline gap-1">
                                        {s}
                                        <button
                                            type="button"
                                            className="ml-1 text-xs text-red-500 hover:text-red-700"
                                            onClick={() => handleRemoveSkill(s)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                        {/* Save Button*/}
                        <div className="mt-2 card-actions justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={saveProfile}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </div >
    )
}
export default EditProfile