import { useParams } from "react-router-dom";
import { getEvents } from "../../store/events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSpecificGroup } from "../../store/specificGroup";
import { useState } from "react";
import "./eventById.css";



export const EventById = () => {
    const { eventId }=  useParams();
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.Events);
    let SpecificGroup = useSelector(state=>state.specificGroup);
    let event;
    let groupId;
    // const [groupId, setGroupId] = useState(0)
    
    
    
    if(events){
        for(let i =0; i < events.length; i++){
            if(events[i].id === +eventId){
                event = events[i] 
                groupId = event.groupId
                getSpecificGroup(+groupId)(dispatch)
            }  
        }
    }
    

   useEffect(()=>{

    getEvents(dispatch)
    getSpecificGroup(+groupId)(dispatch)
    
   },[])



    return (
       
        <div>
            {event &&
            <div className='eventByIdPrimary'>
                
                <h1>{event.name}</h1>
                <div className='eventByIdEventType'>
                    <i className="fa-solid fa-terminal"></i>
                    <p>{event.type}</p>
                    <i className="fa-solid fa-circle-question"></i>
                </div>
                <div>
                    {SpecificGroup.Organizer &&
                    <div className="eventByIdEventHost">
                    <p>{`Hosted By`}</p>
                    <h4>{`${SpecificGroup.Organizer.firstName} ${SpecificGroup.Organizer.lastName}`}</h4>
                    </div>
                    }
                </div>
                <hr></hr>

            </div>
            
            }
        </div>
       
    )
}