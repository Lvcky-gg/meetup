import {getMyGroups,  deleteGroupById} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { getSpecificGroup } from '../../store/specificGroup';
import { getMembers } from '../../store/members';
import { addImg } from '../../store/specificGroup';
import { AddImage } from '../addImage';
import { deleteImgById } from '../../store/specificGroup';
//create feauture to grab members from the memberships endpoints
//state variable for memberships
//make feature for adding image to specific group reducer as well


import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../editFormModal';
import './groupById.css'


export const GroupById = () => {
    const [imgVal, setImgVal] = useState(false)

    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history =useHistory();
    
    
    let Groups = useSelector(state=>state.groups.Groups)
    let SpecificGroup = useSelector(state=>state.specificGroup)
    const memberships = useSelector(state=>state.members.Members)
    const images = SpecificGroup.GroupImages

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

},[dispatch])



  const onClick = (e) => {
    e.preventDefault()


 deleteGroupById(+groupId)(dispatch)

    
    history.push('/groups')
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
       
        <div>
            <div className='groupByIdContainerOne'>
                {Group.name &&
                <div className='groupByIdContainerImgOne'>
                   {SpecificGroup.Organizer &&
                   <img src={groupImg} alt="GroupImg" className="groupImgMainImg"></img>
                   }
                        
                    <div>
                        <h2>{Group.name}</h2>
                        <p>{`${Group.city}, ${Group.state}`}</p>
                        <p>{`Number of members: ${Group.numMembers}`}</p>
                        {SpecificGroup.Organizer &&
                   <p>{`Organized by ${SpecificGroup.Organizer.firstName} ${SpecificGroup.Organizer.lastName}`}</p>
                   }
                        
                        
                    </div>
                </div>
                }
                <div className="groupByIdButtons">
                <OpenModalButton
      
      buttonText="Edit Group"
      modalComponent={<EditGroupModal Group={Group}  groupId={groupId}></EditGroupModal>}
      
      
      />
                    <button onClick={onClick}>Delete Group</button>
                    <button onClick={onAddImgClick}>Add Image</button>

                    
                </div>
               {
                imgVal ? (

                   <AddImage></AddImage>
                ):(

                    <></>
                )
               }
                

            </div>
            <hr></hr>
            <div className='groupImageBoxContainer'>
                <div className="groupImageBoxInner">
                    <h4>Group Images</h4>
                <ul className="groupImageBox">
                        {
                                SpecificGroup.GroupImages ? (

                                   SpecificGroup.GroupImages.map(group=>(
                                    <li key={group.id} className="groupImagePreviewHolder">
                                     <img  src={group.url} alt="image"/>
                                     <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        deleteImgById(group.id)(dispatch)
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
                 <div>
                    <div className="memberListGroupById">
                        <h4>Member List</h4>
                        <ul className="memberListeBox">
                        {
                                memberships ? (

                                    memberships.map(member=>(
                                    <li key={member.id}>
                                     <p>{member.firstName}</p>
                                     </li>
                                 ))
                                 ):(
                                     <p>You have no Members </p>
                                 )
                          }


                        </ul>

                    </div>
                    <div>
                        <h4>Events</h4>

                    </div>

                </div>
            </div>

            </div>

    )
}