import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups, getMyGroups } from '../../store/groups';
import { NavLink, Redirect } from 'react-router-dom';
import './home.css'
import { getMyEvents } from '../../store/events';
import { useHistory } from 'react-router-dom';

//unknown bug in my group grabbing and event grabbing
export const HomePage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    const thisUser = useSelector(state => state.session.user);
    let thisEvents = useSelector(state=> state.events).Events;
    let sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const onClick = () => {
        if(sessionUser){
            history.push('/groups')
        }
    }

    const onGroupClick=(groupId)=> {
        // return (
        //     <Redirect to={`/groups/${groupId}`}></Redirect>
        // )
        // return history.push(`/groups/${groupId}`)
    //    window.location.href= `/groups/${groupId}`

    }
    const onEventClick=()=> {
       

    }
    
   
    
//modify this!!!
    useEffect(() => {
        getMyGroups(dispatch)
        
        if(allGroups){
            for(let i = 0; i < allGroups.length; i++){
                let groupId = allGroups[i].id
                getMyEvents(groupId)(dispatch)
                
            }
        }else{
            thisEvents = null
        }

        
        
      
      }, [ dispatch]);

    return (
        <>
        <div className="HomeTop">
             <h1>Welcome, {thisUser.firstName} 👋</h1>
            <h4>Events from Your Groups</h4>
        </div>
        <div className="home">

        <div className="YourInfo">

            <div className='groupCardsFromHome'>
            <h4
            className="routerForGroups"
            onClick={onClick}
            >Your Groups</h4>
            <ul className="myList">
            
        {
            allGroups ? (
                allGroups.filter((group,idx)=>idx<5).map(group=>(
                    <NavLink to={`/groups/${group.id}`} key={group.id}>
                    <li  className="myListUl" >
                <img src={group.previewImage} alt="image"/>
                   <p>{group.name}</p>
                </li>
                </NavLink>
                ))
    ):(
        <p>You have no groups </p>
     )
     }
        </ul>
            </div>
            <div>
                
            </div>
            
        </div>
        <div className="HomeEvents">
        <div >
            <ul className="myList">
                
        {
            thisEvents ? (

                thisEvents.map(event=>(
                 <li key={event.id} className="myListUl" onClick={onEventClick}>
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
        </div>

        </div>
        </>
    )
    }