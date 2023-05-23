import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./search.css"

export const SearchBar = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [url, setUrl] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        if(eventName != "" && eventType != ""){
            setUrl(`?name=${eventName}&type=${eventType}`)
            history.push(`/events${url}`)
            setEventName("")
            setEventType("")
        }else if(eventName != ""){
            setUrl(`?name=${eventName}`)
            history.push(`/events${url}`)
            setEventName("")
            setEventType("")
        }else if(eventType != ""){
            setUrl(`?type=${eventType}`)
            history.push(`/events${url}`)
            setEventName("")
            setEventType("")
        }
        else{
            history.push('/events')
            setEventName("")
            setEventType("")
        }

    }
    return (
        <form 
        onSubmit={handleSearch}
        className="searchBar">
            <input 
            className='searchBarInputOne'
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            ></input>
            <input
            className='searchBarInputTwo'
            placeholder="Event Type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            ></input>
            <button>
            <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
}