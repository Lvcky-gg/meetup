import { useEffect, useState } from "react";
import { addImg } from "../../store/specificGroup";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyGroups } from "../../store/groups";
import { getSpecificGroup } from "../../store/specificGroup";
import { getMembers } from "../../store/members";
import './addImage.css'




export const AddImage = ({imgVal, setImgVal}) => {
    const {groupId} = useParams()
    const dispatch = useDispatch()
    const [url, setUrl ] = useState('')
    const [preview, setPreview] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        getSpecificGroup(+groupId)(dispatch)
        getMyGroups(dispatch)
        getMembers(+groupId)(dispatch)
        
        },[dispatch])

    const onSubmit =(e) =>{
        e.preventDefault();
        setErrors([]);
        return addImg({
            url,
            preview
        }, +groupId)(dispatch)
        .then(setImgVal(false))
        .catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );

    }
    return (
        <form className="addImageFrom" onSubmit={onSubmit}>
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