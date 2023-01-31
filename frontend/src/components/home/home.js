import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups, getMyGroups } from '../../store/groups';
import { NavLink } from 'react-router-dom';
import './home.css'
import { getMyEvents } from '../../store/events';


export const HomePage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    const thisUser = useSelector(state => state.session.user);
    let thisEvents = useSelector(state=> state.events).Events;
    console.log(thisEvents)
   
    
    

    useEffect(() => {
        if(allGroups){
            for(let i = 0; i < allGroups.length; i++){
                let groupId = allGroups[i].id
                getMyEvents(groupId)(dispatch)
                getMyGroups(dispatch)
            }
        }

        
        
      
      }, [ dispatch]);

    return (
        <>
        <div>
            <h1>Welcome, {thisUser.firstName}</h1>
        </div>
        <div className="YourInfo">
            <div>
            <h4>Your Events</h4>
            <ul className="myList">
                
        {
            thisEvents ? (

                thisEvents.map(event=>(
                 <li key={event.id} className="myListUl">
             <img src={event.previewImage} alt="image"/>
                <p>{event.name}</p>
               
             </li>
             ))
    ):(
      <p>You have no Events </p>
     )
     }
        </ul>
            </div>
            <div>
            <h4>Your Groups</h4>
            <ul className="myList">
            
        {
            allGroups ? (

             allGroups.map(group=>(
                 <li key={group.id} className="myListUl">
             <img src={group.previewImage} alt="image"/>
                <p>{group.name}</p>
             </li>
             ))
    ):(
      <p>You have no groups </p>
     )
     }
        </ul>
            </div>
            <div></div>
        </div>

        </>
    )
    }