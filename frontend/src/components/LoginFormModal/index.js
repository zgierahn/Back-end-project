import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };



  return (
    <div className="login-main-container">
      <h1>Log In</h1>
      <form
        className="loging-form-container"
        onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <div className="form-login-button">
          <button
          type="submit">Log In</button>
        </div>
      </form>
        <button onClick={()=>{return dispatch(sessionActions.login(
              { credential : 'Demo-lition', password: 'password' }))
              .then(closeModal)}}
        >Log in as Demo User</button>
    </div>
  );
}

export default LoginFormModal;

// logins= {
//   'Demo-lition': 'password',
//   'FakeUser1' : 'password2',
//   'FakeUser2' : 'password3'
// }
