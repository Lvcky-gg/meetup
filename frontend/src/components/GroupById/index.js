import {getSpecificGroup} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';


import OpenModalButton from '../OpenModalButton';
import EditGroupModal from '../editFormModal';
import './groupById.css'


export const GroupById = ({isLoaded}) => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    
    let Group = useSelector(state=>state.groups)


    console.log(Group)
   
     

    
    

    useEffect(() => {
     getSpecificGroup(+groupId)(dispatch)
     
     console.log(Group)
      }, [ dispatch]);
     
     
      let groupImg = '';
      if(Group){
        if( Group.name && Group.GroupImages[0] && isLoaded){
            groupImg =Group.GroupImages[0].url;
       }
      }
     
    
    return (
       
   
            <div className='groupByIdContainerOne'>
                {Group.name &&
                <div className='groupByIdContainerImgOne'>
                   
                        <img src={groupImg} alt="GroupImg"></img>
                    <div>
                        <h2>{Group.name}</h2>
                        <p>{`${Group.city}, ${Group.state}`}</p>
                        <p>{Group.numMembers}</p>
                        <p>{`Organized by ${Group.Organizer.firstName} ${Group.Organizer.lastName}`}</p>
                        
                    </div>
                </div>
                }
                <div>
                <OpenModalButton
      
      buttonText="Edit Group"
      modalComponent={<EditGroupModal Group={Group} groupId={groupId}></EditGroupModal>}
      
      
      />
                    <button>Delete Group</button>
                </div>

            </div>

    )
}