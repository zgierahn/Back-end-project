import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <nav className="nav-drop-down-menu">
      <button className='header-menu-button' onClick={openMenu}>
        <i className="fa fa-bars"></i>
        <i className="fas fa-user-circle" id="user-menu-logo" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello {user.firstName}</div>
            <div>{user.email}</div>
            <div className="Manage-spots-div">
              <button className="manage-spots-button" onClick={()=>{history.push('/spots/current')}}>Manage Spots</button>
            </div>
            <div>
              <button className="log-out-button" onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </nav>
  );
}

export default ProfileButton;
{/* <i class="fa fa-bars"></i> */}

//secret user/password combos sssshhhhh

// logins= {
//   'Demo-lition': 'password',
//   'FakeUser1' : 'password2',
//   'FakeUser2' : 'password3'
// }
