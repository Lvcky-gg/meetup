import { useParams } from "react-router-dom";
import { getEvents } from "../../store/events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getEventById } from "../../store/specificEvent";
import { getSpecificGroup } from "../../store/specificGroup";
import { addImgEvent } from "../../store/specificEvent";
import { deleteEventImgById } from "../../store/specificEvent";
import { useState } from "react";
import { AddEventImage } from "../addEventImage";
import "./eventById.css";



export const EventById = () => {
    const [imgVal, setImgVal] = useState(false)
    const { eventId }=  useParams();
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.Events);
    let SpecificGroup = useSelector(state=>state.specificGroup);
    let event = useSelector(state=>state.EventSpecific);

    // const [groupId, setGroupId] = useState(0)
 
    const onAddImgClick = () => {
        setImgVal(!imgVal)
        
        }

   useEffect(()=>{

    getEvents(dispatch)
    getEventById(+eventId)(dispatch)
    getSpecificGroup(+event.groupId)(dispatch)
    
   },[])



    return (
       
        <div>
            {event &&
            <div>
            <div className='eventByIdPrimary'>
                
                <h1>{event.name}</h1>
            </div>
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
                <div className="eventByIdEventHolder">
                    <div className="eventByIdEventHolderChildOne">
                        {event.EventImages[0] &&
                            <img src={event.EventImages[0].url} alt="img" className="eventByIdEventHolderChildOneImg"></img>
                        }
                        
                        <div className="eventByIdEventHolderChildTwo">
                            <h3>Details</h3>
                            <p>{event.description}</p>
                        </div>
                        <div className="eventByIdEventHolderChildTwo">
                            <h3>{`Attendees(${event.numAttending})`}</h3>
                            <p>placeholder for attendees card</p>
                        </div>
                        <div className="eventByIdEventHolderChildTwo">
                            {
                               event.EventImages ?( <h3>{`Photos(${event.EventImages.length})`}</h3>):(<h3>{`Photos(0)`}</h3>)
                            }
                            <button onClick={onAddImgClick}>Add Image</button>
                            {
                                imgVal ? (

                                 <AddEventImage></AddEventImage>
                                         ):(

                                      <></>
                                         )
                            }
                            <ul className="specificImageForEventHolder">
                            {
                                event.EventImages ? (
                                    

                                   event.EventImages.map(item=>(
                                    <li key={item.id} className="">
                                     <img  src={item.url} alt="image"/>
                                     <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        deleteEventImgById(item.id)(dispatch)
                                     }}>
                                     <button className="">Delete Image</button>
                                     </form>
                                     </li>
                                     
                                 ))
                                 ):(
                                     <p>You have no images </p>
                                 )
                                 
                          }
                          </ul>

                        </div>

                    </div>

                    <div>
                    <div></div>
                    </div>

                </div>

            </div>
            
            }
       


            

        </div>
       
    )
}