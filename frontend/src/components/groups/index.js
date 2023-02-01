import { getGroups, getMyGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateGroupModal from '../createGroupModal';
import './groups.css'

export const GroupPage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    const history = useHistory()
    const thisUser = useSelector(state => state.session.user);
  console.log(allGroups)
    

    const onBackClick = () => {
        history.push('/')

    }
    const onCreateClick = () => {
        history.push('/groups')
    }

    useEffect(()=> {
        getMyGroups(dispatch)
    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    <p onClick={onBackClick} className='homePageFromGroup'>Back to Home Page</p>
                </div>
                <div>
                    <div className="groupsDivWithContent">
                        
                        <OpenModalButton
      
                         buttonText="Create Group"
                         modalComponent={<CreateGroupModal></CreateGroupModal>}
                         
                         
                         />
                         <h2>Your Groups</h2>
                        <p>Member</p>
                        <ul className="myListUl">
                        {
                                allGroups ? (

                                    allGroups.map(group=>(
                                     <li key={group.id} >
                                     <img src={group.previewImage} alt="image"/>
                                     <NavLink to={`/groups/${group.id}`}>{group.name}</NavLink>
                                     </li>
                                 ))
                                 ):(
                                     <p>You have no groups </p>
                                 )
                          }


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}