import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/Spots/GetAllSpots";
import GetSingleSpot from "./components/Spots/GetSingleSpot";
import SpotForm from './components/Forms/SpotForm';
import EditSpotForm from "./components/Forms/EditSpotForm";
import DeleteSpot from "./components/Spots/DeleteSpot";
import SpotsByOwner from "./components/Spots/SpotsByOwner";
import ReviewsByUser from "./components/Reviews/ReviewsByUser";

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

          <Route exact path='/'>
            <GetAllSpots />
          </Route>

          <Route exact path='/spots/new'>
            <SpotForm />
          </Route>

          <Route exact path='/spots/current'>
            <SpotsByOwner />
          </Route>

          <Route exact path='/spots/:spotId'>
            <GetSingleSpot />
          </Route>

          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>

          <Route exact path='/spots/:spotId/delete'>
            <DeleteSpot />
          </Route>

          <Route exact path='/reviews/current'>
            <ReviewsByUser />
          </Route>

        </Switch>}
    </>
  );
}

export default App;
