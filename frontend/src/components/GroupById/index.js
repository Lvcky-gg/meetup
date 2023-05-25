import {getMyGroups,  deleteGroupById} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { getSpecificGroup } from '../../store/specificGroup';
import { getMembers } from '../../store/members';
import { addImg } from '../../store/specificGroup';
import { AddImage } from '../addImage';
import { deleteImgById } from '../../store/specificGroup';
import CreateEventModal from '../createEvent';

//create feauture to grab members from the memberships endpoints
//state variable for memberships
//make feature for adding image to specific group reducer as well


import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../editFormModal';
import './groupById.css'
import { getEvents } from '../../store/events';


export const GroupById = () => {
    const [imgVal, setImgVal] = useState(false)

    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history =useHistory();

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
    
    
    let Groups = useSelector(state=>state.groups.Groups);
    let SpecificGroup = useSelector(state=>state.specificGroup);
    const memberships = useSelector(state=>state.members.Members);
    const Events = useSelector(state=>state.events.Events);





    let Group ={};
     
if(Groups){
    
    for(let i = 0; i < Groups.length; i++){
        
        if(Groups[i].id === +groupId){
            Group = Groups[i]
        }
    }

}

useEffect(()=> {

getSpecificGroup(+groupId)(dispatch)
getMyGroups(dispatch)
getMembers(+groupId)(dispatch)
getEvents(dispatch)


},[dispatch])



  const onClick = (e) => {
    e.preventDefault()

    if (window.confirm("Are you sure you want to delete this group?")) {
    deleteGroupById(+groupId)(dispatch)
    getMyGroups(dispatch)
    history.push('/groups')
    }
  }
  //make component to add an image
  const onAddImgClick = () => {
  setImgVal(!imgVal)
  
  }

     
     
      let groupImg = '';
      if(SpecificGroup){

        if( SpecificGroup?.name && SpecificGroup?.GroupImages[0]){
            groupImg =SpecificGroup.GroupImages[0].url;
            
       }
      }
     
    
    return (
       
        <div className="groupByIdMainTop">
            <NavLink to="/Groups" className="backToGroupsMainFromGroupById">Back to Groups</NavLink>
            <div className='groupByIdContainerOne'>
                {Group.name &&
                <div className='groupByIdContainerImgOne'>
                   {SpecificGroup.Organizer && groupImg ?(   <img src={groupImg} alt="GroupImg" className="groupImgMainImg"></img>):
                   (   <img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="GroupImg" className="groupImgMainImg"></img>)

                   }
                        
                    <div>
                        <h2>{Group.name}</h2>
                        <div>
                        <i className="fa-solid fa-location-dot"></i>
                        <p> {` ${Group.city}, ${Group.state}`}</p>
                            </div>
                        <div>
                        <i className ="fa-solid fa-users"></i>
                        <p>{` ${Group.numMembers} members`}</p>
                        </div>
                        <div>
                        <i className="fa-solid fa-user"></i>
                        {SpecificGroup.Organizer &&
                   <p>{`Organized by ${SpecificGroup.Organizer.firstName} ${SpecificGroup.Organizer.lastName}`}</p>
                   
                   }
                   </div>
                        
                        
                    </div>
                </div>
                }


            </div>
            <hr></hr>
            <div className="sticksToTop">
                <div className="groupByIdButtons">
                <OpenModalButton
      
      buttonText="Edit Group"
      modalComponent={<EditGroupModal Group={Group}  groupId={groupId}></EditGroupModal>}
      
      
      />
                      <OpenModalButton
      
      buttonText="Add Event"
      modalComponent={<CreateEventModal groupId={groupId}></CreateEventModal>}
      
      
      />
                    <button onClick={onClick}>Delete Group</button>
                    <button onClick={onAddImgClick}>Add Image</button>

                    
                </div>
               {
                imgVal ? (

                   <AddImage
                   imgVal={imgVal}
                   setImgVal={setImgVal}
                   ></AddImage>
                ):(

                    <></>
                )
               }
  </div>              
            <div className="backGroundcolor">
            <div className='groupImageBoxContainer'>
            <div className='groupImageBoxContainerDiv'>
                <div>

                        <h4>About</h4>
                        {
                            SpecificGroup && <p>{SpecificGroup.about}</p>
                        }
                        <h4>Events</h4> 
                        </div>
                        <div className="changeToScroll">
                        {
                            
                            Events ? (
                                
                                Events.filter(item =>item.groupId === +groupId).map(event=>(
                                    

                                    <li key={event.id} className="specificEventBox">
                                        <NavLink to={`/events/${event.id}`} >
                                        
                                                <div>
                                                    
                                                    <h4>{makeDate(event.startDate.split('T')[0])}</h4>
                                                    <h2>{event.name}</h2>
                                                    <p>{`number of Attendees:${event.numAttending}`}</p>
                                                    
                                                   
                                                    
                                                </div>
                                            <div>
                                            {
                                                        event.previewImage ?(<img src={event.previewImage}></img>):(<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg"></img>)
                                                    }
                                               
                                            </div>
                                        </NavLink>
                                    </li>
                                ))

                            ):(
                                <p>You Have No Events</p>
                            )
                        }
                        </div>
                    </div>
                    

                 <div className="memberListGroupByIdHolder">
                    <div className="memberListGroupById">
                        <h4>Member List</h4>
                        <ul className="memberListeBox">
                        {
                                memberships ? (

                                    memberships.map(member=>(
                                    <li className='groupoByidCard' key={member.id}>
                                        <div className="gruipByIdcircle">
                                            <i className="fas fa-user-circle" /> 
                                        </div>
                                     <p>{member.firstName}</p>
                                     </li>
                                 ))
                                 ):(
                                     <p>You have no Members </p>
                                 )
                          }


                        </ul>

                    </div>
                    <h4 className="moveH4toright">Group Images</h4>
                    <div className="groupImageBoxInner">
                    
                <ul className="groupImageBox">
                        {
                                SpecificGroup.GroupImages ? (

                                   SpecificGroup.GroupImages.map(group=>(
                                    <li key={group.id} className="groupImagePreviewHolder">
                                     <img  src={group.url} alt="image"/>
                                     <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        if (window.confirm("Are you sure you want to delete this image?")) {
                                        deleteImgById(group.id)(dispatch)
                                        }
                                     }}>
                                     <button className="deleteImgFromGroupById">Delete Image</button>
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
                </div>
            </div>

            </div>

    )
}