import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups } from '../../store/groups';
import { NavLink } from 'react-router-dom';
import './landingPage.css'
export const LandingPage = () => {
    const dispatch = useDispatch();
    const allGroups = useSelector(state=>state.groups).Groups;
    

    useEffect(() => {
        
        getGroups(dispatch)
      
      }, [ dispatch]);

      
return (
    
    <> 
<div className="landingPageContainer">
    <div>
        <div className="landingPageUpper">
            <div>
                <h1>The people platform
                    <br></br>
                    -Where interests become friendships.
                </h1>
                <p>
                Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—log in to join the fun.
                </p>
            </div>
                
            <div>
            <img src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" alt="img"></img>
            </div>
        </div>
       
    </div>


</div>

<div className="allGroupContainer">

    <div className="allGroupHeader">
        <h3>Current Groups</h3>
    </div>

        <div>
            <ul className="allGroupsList">
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
          <p>No groups </p>
        )
      }
            </ul>
            
           
        </div>
    </div>

    <div>
        <div>
            <div className="howItWorksTxt">
                <h3>How Meetup Works</h3>
                <p>Meet new people who share your interests through online and in-person events. It’s free to create an account.</p>
            </div>
            <div className="howItWorksImg">
                <div>
                    <img src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256" alt="img"></img>
                    <NavLink to='/'> Join a Group</NavLink>

               
                </div>
                <div>
                    <img src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256" alt="img"></img>
                    <NavLink to='/'> Find an Event</NavLink>
                   
                    

                </div>
                <div>
                    <img src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256" alt="img"></img>
                    <NavLink to='/'> Start a Group</NavLink>


                </div>
            </div>
        </div>
        <div></div>
    </div>
    </>
)
}