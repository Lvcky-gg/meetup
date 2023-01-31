import {getSpecificGroup} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const GroupById = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch()
    const Group = useSelector(state=>state.groups).Groups
    

    useEffect(() => {
     getSpecificGroup(+groupId)(dispatch)
        
        
      
      }, [ dispatch]);
    // console.log(+groupId)
    return (
        <h1>Hi</h1>
    )
}