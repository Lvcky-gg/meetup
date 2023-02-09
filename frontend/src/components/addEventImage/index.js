import { useEffect, useState } from "react";
import { addImgEvent } from "../../store/specificEvent";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEventById } from "../../store/specificEvent";

import './index.css'




export const AddEventImage = () => {
    const {eventId} = useParams()
    const dispatch = useDispatch()
    const [url, setUrl ] = useState('')
    const [preview, setPreview] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        getEventById(+eventId)(dispatch)
        },[dispatch])

    const onSubmit =(e) =>{
        e.preventDefault();
        setErrors([]);
        return addImgEvent({
            url,
            preview
        }, +eventId)(dispatch)
        .catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );

    }
    return (
        <form className="addEventImageFrom" onSubmit={onSubmit}>
            <label
            >Image URL</label>
            <input
                name ='url'
                onChange={(e)=>setUrl(e.target.value)}
            ></input>
            <label>Preview</label>
            <select 
            name='preview'
            onChange={(e)=>setPreview(e.target.value)}
            >
                <option value='' disabled>Select Preview</option>
                <option value={true}>True</option>
                <option value={false}>False</option>

            </select>
            <button type="submit" >Submit</button>

        </form>
    )
}