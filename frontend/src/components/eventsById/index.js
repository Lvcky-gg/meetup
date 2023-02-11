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
import { deleteEventById } from "../../store/events";
import { useHistory } from "react-router-dom";
import { getAttendees } from "../../store/attendees";
import EditEventModal from "../editSpecificEvent";
import OpenModalButton from "../OpenModalButton";
import "./eventById.css";



export const EventById = () => {
    const history = useHistory()
    const [imgVal, setImgVal] = useState(false)
    const { eventId }=  useParams();
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.Events);
    let SpecificGroup = useSelector(state=>state.specificGroup);
    let event = useSelector(state=>state.EventSpecific);
    const attendees = useSelector(state=>state.Attendee.Attendees)
    

    // const [groupId, setGroupId] = useState(0)
 
    const onAddImgClick = () => {
        setImgVal(!imgVal)
        
        }

    const onClick = (e) => {
        e.preventDefault()
        deleteEventById(+eventId)(dispatch);
        getEvents(dispatch);
        history.push(`/groups/${+event.groupId}`)

    }

   useEffect(()=>{
    getEventById(+eventId)(dispatch)
    getEvents(dispatch)
    getEventById(+eventId)(dispatch)
    getSpecificGroup(+event.groupId)(dispatch)
    getAttendees(+eventId)(dispatch)
    
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
                         <div className="deleteButtonEventById">
                          <button onClick={onClick} className="deleteEventByIdBtn">Delete Event</button>
                          <OpenModalButton
      
                             buttonText="Edit Event"
                             modalComponent={<EditEventModal   eventId={eventId}></EditEventModal>}
                                />
                          </div>
                        {event.EventImages && event.EventImages[0] && event.EventImages[0].url ?(<img src={event.EventImages[0].url} alt="img" className="eventByIdEventHolderChildOneImg"></img>):(<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="img" className="eventByIdEventHolderChildOneImg"></img>)

                            // <img src={event.EventImages[0].url} alt="img" className="eventByIdEventHolderChildOneImg"></img>
                        }
                        
                        <div className="eventByIdEventHolderChildTwo">
                            <h3>Details</h3>
                            <p>{event.description}</p>
                        </div>
                        <div className="eventByIdEventHolderChildTwo">
                            <h3>{`Attendees(${event.numAttending})`}</h3>
                            <ul className='attendeeCardEvent'>
                            {attendees && 
                            attendees.map(attendee =>(
                                
                                <div>
                                   <span className="makeCircle">
                                   <i className="fas fa-user-circle" />
                                    </span>
                                <li key={attendee.id}>{`${attendee.firstName} ${attendee.lastName[0]}`}</li>
                                </div>
                                
                            ))
                            }
                            </ul>
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