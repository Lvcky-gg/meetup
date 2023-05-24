import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./search.css"

export const SearchBar = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("");
    const [url, setUrl] = useState("")
    console.log(eventType)
    const handleSearch = (e) => {
        e.preventDefault()
        if(url != ""){
            history.push(`/events${url}`)
            setEventName("")
            setEventType("")
            setUrl("")
        }
        else{
            history.push(`/events`)
            setEventName("")
            setEventType("")
            setUrl("")
        }
    }
    useEffect(()=>{
        if(eventName != "" && eventType != ""){
            setUrl(`?name=${eventName}&type=${eventType}`)
        }else if(eventName != ""){
            setUrl(`?name=${eventName}`)
        }else if(eventType != ""){
            setUrl(`?type=${eventType}`)
        }

    },[url, eventName, eventType])
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
            <select
            className='searchBarInputTwo'
            name="Event Type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            >
                <option value='' disabled>Event Type</option>
                <option name="Online">Online</option>
                <option name="In Person">In Person</option>
            </select>
            <button>
            <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    )
}