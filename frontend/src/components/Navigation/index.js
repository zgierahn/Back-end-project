// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  return (
    <header className='header-container'>

        <div>
          {/* <NavLink exact to="/"> */}
            <div className='nav-logo' onClick={()=>{history.push('/')}}>
              <img className='home-logo' src='https://media.istockphoto.com/id/690555566/photo/letter-z-neon-light-full-isolated-on-black.jpg?s=170667a&w=0&k=20&c=Nid0DdAAgQgqRXhr53k_tClVbE05lfX_UQvLxVLWyP4=' />
              <h1 id='zach-main'>Zach's BnB</h1>
            </div>
          {/* </NavLink> */}
        </div>
        {isLoaded && (
          <span className='header-right-side'>
            {sessionUser && <button className="create-a-new-spot-button" onClick={()=>{history.push('/spots/new')}}>Create a new Spot</button>}
          <div className='profile-button'>
            <ProfileButton user={sessionUser} />
          </div>
          </span>
        )}

    </header>
  );
}

export default Navigation;
