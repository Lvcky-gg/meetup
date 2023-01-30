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
    let thisEvents = useSelector(state=> state.session.events)
    console.log(thisEvents)
    
    

    useEffect(() => {
        for(let i = 0; i < allGroups.length; i++){
            let groupId = allGroups[i].id
            getMyEvents(groupId)(dispatch)
        }
        
        
      
      }, [ dispatch]);

    return (
        <>
        <div>
            <h1>Welcome, {thisUser.firstName}</h1>
        </div>
        <div className="YourInfo">
            <div>
            <ul className="myGroupsList">
        {
            allGroups ? (

             allGroups.map(group=>(
                 <li key={group.id}>
             <img src={group.previewImage}/>
                <p>{group.name}</p>
                <p>Number of members:{group.numMembers}</p>
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