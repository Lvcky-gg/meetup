import {getMyGroups,  deleteGroupById} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { getSpecificGroup } from '../../store/specificGroup';



import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../editFormModal';
import './groupById.css'


export const GroupById = () => {

    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history =useHistory();
    
    
    let Groups = useSelector(state=>state.groups.Groups)
    let SpecificGroup = useSelector(state=>state.specificGroup)

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

},[dispatch])
console.log(SpecificGroup.GroupImages)


  const onClick = (e) => {
    e.preventDefault()


 deleteGroupById(+groupId)(dispatch)

    
    history.push('/groups')
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
                   <img src={groupImg} alt="GroupImg"></img>
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
                    <button>Add Image</button>
                    
                </div>
                

            </div>
            <hr></hr>
            <div className='groupImageBoxContainer'>
                <div className="groupImageBoxInner">
                    <h4>Group Images</h4>
                <ul className="groupImageBox">
                        {
                                SpecificGroup.GroupImages ? (

                                   SpecificGroup.GroupImages.map(group=>(
                                    <li>
                                     <img src={group.previewImage} alt="image"/>
                                     </li>
                                 ))
                                 ):(
                                     <p>You have no images </p>
                                 )
                          }


                        </ul>
                </div>
                <div></div>
            </div>
            </div>

    )
}