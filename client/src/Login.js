import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { useHistory } from "react-router-dom";


const App = () => {



  const history = useHistory();
  const [firstnameReg, setFirstnameReg] = useState("");
  const [lastnameReg, setLastnameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [loginStatuses, setLoginStatuses] = useState("");

  const onChangeHandler = (fieldName, value) => {
    if (fieldName === "firstnameReg") {
      setFirstnameReg(value);
    }
    else if (fieldName === "lastnameReg") {
      setLastnameReg(value);
    }
    else if (fieldName === "emailReg") {
      setEmailReg(value);
    }
    else if (fieldName === "passwordReg") {
      setPasswordReg(value);
    }
    else if (fieldName === "email") {
      setEmail(value);
    }
    else if (fieldName === "password") {
      setPassword(value);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (firstnameReg.trim() === "" || lastnameReg.trim() === "" || emailReg.trim() === "" || passwordReg.trim() === "") {
      alert("All the fields are required");
    }
    else {
      Axios.post("http://localhost:3001/create", {
        firstname: firstnameReg,
        lastname: lastnameReg,
        email: emailReg,
        password: passwordReg,
      }).then((response) => {

        if (response.data.message) {
          setLoginStatuses(response.data.message);
        } 
        else {
          history.push("/Dashboard");
        }
      });
    }
  }

  const onSubmitHandlerr = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("All the fields are required");
    }
    else {
      Axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      }).then((response) => {

        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          history.push("/Dashboard");
        }
      });
    }
  };


  return (
    <div className="App">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => { onSubmitHandler(e) }}>
            <h1>New here!!</h1><hr></hr>
            <h1>Create an Account</h1><hr></hr>
            <input type="text" placeholder="Firstname"
              onChange={(event) => {
                setFirstnameReg(); onChangeHandler("firstnameReg", event.target.value);
              }} />
            <hr></hr>
            <input type="text" placeholder="Lastname"
              onChange={(event) => {
                setLastnameReg(); onChangeHandler("lastnameReg", event.target.value);
              }} />
            <hr></hr>
            <input type="email" placeholder="Email"
              onChange={(event) => {
                setEmailReg(); onChangeHandler("emailReg", event.target.value);
              }} />
            <hr></hr>
            <input type="password" placeholder="Password"
              onChange={(event) => {
                setPasswordReg(); onChangeHandler("passwordReg", event.target.value);
              }} />
            <hr></hr>
            <div>
              <button>Sign Up</button>
              <h3>{loginStatuses}</h3>
            </div>
          </form>
        </div>


        <div className="form-container sign-in-container">
          <form onSubmit={(e) => { onSubmitHandlerr(e) }}>
            <h1>Welcome Back!!</h1><hr></hr>
            <h1>Login</h1><hr></hr>
            <input type="email" placeholder="Email"
              onChange={(event) => {
                setEmail(); onChangeHandler("email", event.target.value);
              }} />
            <hr></hr>
            <input type="password" placeholder="Password"
              onChange={(event) => {
                setPassword(); onChangeHandler("password", event.target.value);
              }} />
            <hr></hr>
            <button>Login</button><hr></hr>
            <h3>{loginStatus}</h3>
          </form>
        </div>


        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Login with your account to continue</p>
              <button className="ghost" id="signIn" onClick={reportWebVitals}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to continue</p>
              <button className="ghost" id="signUp" onClick={reportWebVitals}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default App;