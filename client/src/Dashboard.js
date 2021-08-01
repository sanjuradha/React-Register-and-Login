import "./Dashboard.css";
import Axios from "axios";
import { useState } from "react";
import { NavLink } from 'react-router-dom';




function Dashboard() {

  const [userList, setUserList] = useState([]);


  const getUser = () => {
    Axios.get("http://localhost:3001/user").then((response) => {
      setUserList(response.data);
    });
  };



  return (
    <div className="Appp">
      <header></header>
      <center>
        <NavLink activeClassName="active" to="/Login">
          <button >Logout</button>
        </NavLink>
        <div className="click">
          <h2>Click the button below(Show users) to see previously registered user details</h2>
        </div>
        <button onClick={getUser}>Show Users</button><hr></hr>
        <tr>
          <th><h3>firstname</h3></th>
          <th><h3>lastname</h3></th>
          <th><h3>email</h3></th>
        </tr>
        {userList.map((val, key) => {
          return (

            <div>
              <table>

                <tr>
                  <td><b>{val.firstname}</b></td>
                  <td><b>{val.lastname}</b></td>
                  <td><b>{val.email}</b></td>
                </tr>
              </table>
            </div>
          );
        })}
      </center>
    </div>
  );
}


export default Dashboard;