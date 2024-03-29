
import { getEventById } from "../../store/specificEvent";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './events.css'
import { getEvents, getEventsSearch } from "../../store/events";



export const EventPage = () => {
    const makeDate=(date)=>{
        let month = ''
        let valOne =date.split('-')
        let val = +date.split('-')[1]
        if (val === 1)month = 'January';
        else if(val === 2)month = 'February';
        else if(val === 3)month = 'March';
        else if(val === 4)month = 'April';
        else if(val === 5)month = 'May';
        else if(val === 6)month = 'June';
        else if(val === 7)month = 'July';
        else if(val === 8)month = 'August';
        else if(val === 9)month = 'September';
        else if(val === 10)month = 'October';
        else if(val === 11)month = 'November';
        else if(val === 12)month = 'December';
        return `${month} ${valOne[2]}, ${valOne[0]}`
       }
    const dispatch = useDispatch()
    const history=useHistory();
    const Events = useSelector(state=>state.events.Events);
    const allGroups = useSelector(state=>state.groups).Groups;
    const location = useLocation();
    const param = location.search
    console.log(param)
    const onEventClick=()=> {
       

    }

    const onBackClick = () => {
        history.push('/')

    }

    let arrayForGroupId = []
    if(allGroups){
        for(let i = 0; i < allGroups.length; i++){
            let val =allGroups[i]
            arrayForGroupId.push(val.id)
    
        };
    }

    const filterMe = (item)=>{
        for(let i =0; i< arrayForGroupId.length; i++){
            if(item.groupId === arrayForGroupId[i]){
                
                return item
            }
        }
    }

    useEffect(()=>{
        if(param) dispatch(getEventsSearch(param))
        else getEvents(dispatch);

    },[dispatch, param])

    return (
        <div className="eventsHomePage">
            <div>
            <p onClick={onBackClick} className='homePageFromGroup'> ⬅ Back to Home Page</p>

            </div>

            <div className="fillMeTwo">
                <h1>Your events</h1>
                <div className="fillMe">
            <ul className="myList">
                
        {
            Events ? (

                Events.sort((a,b)=>{
                    return new Date(a.startDate)  - new Date(b.startDate)    
                }).filter(filterMe).map(event=>(
                 <li key={event.id} className="handleWidth" onClick={onEventClick}>
                    <NavLink to={`/events/${event.id}`}>
                    <h3>{
                       makeDate(event.startDate.split('T')[0])
                    }</h3>
                    <hr></hr>
                    <div className="handleImage">
                        {
                           event.previewImage ?(<img src={event.previewImage} alt="image"/>) : (<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="image"/>)
                        }
                    {/* <img src={event.previewImage} alt="image"/> */}
                    <div>
                    <h3>{event.name}</h3>
                    </div>
                   
                    </div>
                    </NavLink>
               
             </li>
             ))
    ):(
      <p>You have no Events </p>
     )
     }
        </ul>
            </div>
            </div>

        </div>
    )
}
