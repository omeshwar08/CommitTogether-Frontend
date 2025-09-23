import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Login from './Login'
import Profile from "./Profile"
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user)
    const fetchUser = async () => {
        if (userData) return;
        try {
            const user = await axios.get(import.meta.env.VITE_API_URL + "/profile", {
                withCredentials: true
            })
            dispatch(addUser(user.data))
        } catch (error) {
            if (error.status === 401)
                navigate("/login")
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Body