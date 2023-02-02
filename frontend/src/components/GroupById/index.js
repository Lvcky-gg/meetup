import {getMyGroups, getSpecificGroup, deleteGroupById} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';



import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../editFormModal';
import './groupById.css'


export const GroupById = () => {

    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history =useHistory();
    
    
    let Groups = useSelector(state=>state.groups.Groups)
    // let SpecificGroup = useSelector(state=>state.SpecificGroup)

    let Group ={};
     
if(Groups){
    
    for(let i = 0; i < Groups.length; i++){
        
        if(Groups[i].id === +groupId){
            Group = Groups[i]
        }
    }

}

useEffect(()=> {
getMyGroups(dispatch)
// getSpecificGroup(+groupId)(dispatch)
},[dispatch])
// console.log(SpecificGroup) 

  const onClick = (e) => {
    e.preventDefault()


 deleteGroupById(+groupId)(dispatch)

    
    history.push('/groups')
  }
     
     
    //   let groupImg = '';
    //   if(Group){
    //     if( Group?.name && Group?.GroupImages[0] && isLoaded){
    //         groupImg =Group.GroupImages[0].url;
    //    }
    //   }
     
    
    return (
       
   
            <div className='groupByIdContainerOne'>
                {Group.name &&
                <div className='groupByIdContainerImgOne'>
                   
                        <img src='#' alt="GroupImg"></img>
                    <div>
                        <h2>{Group.name}</h2>
                        <p>{`${Group.city}, ${Group.state}`}</p>
                        <p>{Group.numMembers}</p>
                        <p>{`Organized by ${Group} ${Group}`}</p>
                        
                    </div>
                </div>
                }
                <div>
                <OpenModalButton
      
      buttonText="Edit Group"
      modalComponent={<EditGroupModal Group={Group}  groupId={groupId}></EditGroupModal>}
      
      
      />
                    <button onClick={onClick}>Delete Group</button>
                </div>

            </div>

    )
}