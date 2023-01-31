import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/landingPage";
import { Footer } from "./components/footer";
import { useSelector } from "react-redux";
import { HomePage } from "./components/home/home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const thisUser = useSelector(state => state.session.user);

 
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  
  }, [ dispatch]);
   

    
 
  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
        
      )}
      {
        thisUser ? (

          <HomePage></HomePage>
        ):(
          <LandingPage></LandingPage>
        )
      }
      
      <Footer></Footer>
     
    </>
  );
}

export default App;