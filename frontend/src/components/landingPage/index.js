import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getGroups } from '../../store/groups';
import './landingPage.css'
import logo from './PACKAGE_Artboard_1_copy_6.png'
import logoOne from './tpgbuttontest3.png'
import logoTwo from './TPG_Discord_Icon.png'
import logoThree from './TPGCore.png'

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
                <h1>Total Punishment Gaming
                    <br></br>
                    -Generic slogan
                </h1>
                <p>
                Whatever your interest, from gaming and movies to networking and skill sharing, there are thousands of people who share it in TPG. Events are happening every day—log in to join the fun.
                </p>
            </div>
                
            <div>
            <img src={logo} alt="img"/>
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
            <li key={group.id}>
                <img src={group.previewImag} alt="#"/>
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
                <h3>How TPG Event Manager works</h3>
                <p>Meet new people who share your interests through online and in-person events. It’s free to create an account.</p>
            </div>
            <div className="howItWorksImg">
                <div>
                    <img src={logoOne} alt="#"/>
                    <a href='/'> Join a Group</a>

               
                </div>
                <div>
                    <img src={logoThree} alt="#"/>
                     <a href='/'> Find an Event</a>
                    
                    

                </div>
                <div>
                    <img src={logoTwo} alt="#"/>
                    <a href='/'> Start a Group</a>


                </div>
            </div>
        </div>
        <div></div>
    </div>
    </>
)
}