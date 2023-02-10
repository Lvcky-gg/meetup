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
        <div className='topOfGroupHome'>
            <div>
                <div className="groupsDivRoot">
                    
                </div>
                <div>
                    <div className="groupsDivWithContent">
                        <div className='groupsDivRootOne'>
                        <OpenModalButton
      
                         buttonText="Create Group"
                         modalComponent={<CreateGroupModal></CreateGroupModal>}
                         
                         
                         />
                         
                         </div>
                         <div className="topOfHeaderForGroup">
                         <p onClick={onBackClick} className='homePageFromGroup'> ⬅ Back to Home Page</p>
                         <div>
                         <h2>Your Groups</h2>
                         <p className="mildLittlePTag">{`${thisUser.firstName} ${thisUser.lastName}`}</p>
                         </div>
                         </div>
                        
                        <ul className="myListUli">
                        {
                                allGroups ? (

                                    allGroups.map(group=>(
                                     <li key={group.id} >
                                        {
                                           group.previewImage ? (<img src={group.previewImage} alt="image"/>):(<img src="https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg" alt="image"/>)
                                        }
                                     
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