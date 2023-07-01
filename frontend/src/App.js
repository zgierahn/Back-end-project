import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/Spots";
import SpotForm from './components/Forms/SpotForm';
import CreateSpotForm from "./components/Forms/CreateSpotForm";
import EditSpotForm from "./components/Forms/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>

          <Route exact path='/allspots'>
            <GetAllSpots />
          </Route>

          <Route exact path='/spots/new'>
            <CreateSpotForm />
          </Route>

          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>

        </Switch>}
    </>
  );
}

export default App;
