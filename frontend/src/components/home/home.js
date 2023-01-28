import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups, getMyGroups } from '../../store/groups';
import { NavLink } from 'react-router-dom';


export const HomePage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    console.log(allGroups)
    

    useEffect(() => {
        
        getMyGroups(dispatch)
      
      }, [ dispatch]);

    return (
        <ul className="myGroupsList">
        {
    allGroups ? (

      allGroups.map(group=>(
        <li>
            <img>{group.previewImage}</img>
            <p>{group.name}</p>
            <p>Number of members:{group.numMembers}</p>
        </li>
      ))
    ):(
      <p>You have no groups </p>
    )
  }
        </ul>
    )
    }