import { getGroups, getMyGroups } from '../../store/groups';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const GroupPage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    const history = useHistory()
    

    const onBackClick = () => {
        history.push('/')

    }

    useEffect(()=> {
        getMyGroups(dispatch)
    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    <p onClick={onBackClick}>Back to Home Page</p>
                </div>
                <div>
                    <div>
                        <h2>Your Groups</h2>
                        <button>Create Group</button>
                        <p>Member</p>
                        <ul>
                        {
                                allGroups ? (

                                    allGroups.map(group=>(
                                     <li key={group.id} className="myListUl" >
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