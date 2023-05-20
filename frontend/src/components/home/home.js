import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups, getMyGroups } from '../../store/groups';
import { NavLink, Redirect } from 'react-router-dom';
import './home.css'
import { getEvents, getMyEvents } from '../../store/events';
import { useHistory } from 'react-router-dom';


//unknown bug in my group grabbing and event grabbing
export const HomePage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups.Groups);
    const thisUser = useSelector(state => state.session.user);
    let thisEvents = useSelector(state=> state.events.Events);
    let sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

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
    
//modify this!!!
//push into an array


    useEffect(() => {
        getMyGroups(dispatch)
        // if(allGroups){
        //     for(let i = 0; i <allGroups.length; i++){
        //         let groupId = allGroups[i].id
        //         getMyEvents(groupId)(dispatch)
    
        //     }
        // }
        getEvents(dispatch)

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
                    {
                    group.previewImage ? (<img src={group.previewImage} alt="image"/>):(<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="image"/>)
                     }
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

                thisEvents.filter(filterMe).map(event=>(
                 <li key={event.id} className="handleWidth" onClick={onEventClick}>
                    <NavLink to={`/events/${event.id}`}>
                    <h3>{
                       makeDate(event.startDate.split('T')[0])
                    }</h3>
                    <hr></hr>
                    <div className="handleImage">
                    {
                    event.previewImage ? (<img src={event.previewImage} alt="image"/>):(<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="image"/>)
                     }
                    <div>
                    <h3>{event.name}</h3>
                    </div>
                   
                    </div>
                    </NavLink>
               
             </li>
             )).sort((a,b)=>a.startDate - b.startDate)
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