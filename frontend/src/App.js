import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/landingPage";
import { Footer } from "./components/footer";
import { useSelector } from "react-redux";
import { HomePage } from "./components/home/home";
import { GroupPage } from "./components/groups";
import { EventPage } from "./components/events";
import { GroupById } from "./components/GroupById";
import { getMyGroups } from "./store/groups";
import { EventById } from "./components/eventsById";
import './index.css'

function App() {
  const allGroups = useSelector(state=>state.groups).Groups;

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const thisUser = useSelector(state => state.session.user);

 
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

    getMyGroups(dispatch)
  
  }, [ dispatch]);
   

    
 
  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path='/' exact>
          {
        thisUser ? (

          <HomePage></HomePage>
        ):(
          <LandingPage></LandingPage>
        )
      }
          </Route>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
          <Route path='/groups/:groupId' >
            <GroupById isLoaded={isLoaded}></GroupById>

          </Route>
          <Route path='/groups'>
            <GroupPage></GroupPage>
          </Route>
          <Route path='/events/:eventId'>
            <EventById ></EventById>
            
          </Route>
          <Route path='/events'>
            <EventPage></EventPage>

          </Route>
        </Switch>
        
      )}

      
      <Footer isLoaded={isLoaded}></Footer>
     
    </>
  );
}

export default App;