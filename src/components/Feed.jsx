import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed)
    const getFeed = async () => {
        if (feed) return;
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(response.data))
        } catch (error) {
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        getFeed();
    })
    return feed && (
        <div className='flex justify-center items-center mt-15'>
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed;