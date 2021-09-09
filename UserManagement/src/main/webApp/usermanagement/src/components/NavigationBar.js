import React from 'react';
import {Navbar, Nav} from "react-bootstrap";

import { Link } from "react-router-dom";
class NavigationBar extends React.Component{

    render (){
        return(
            <Navbar bg="dark" variant="dark">
                <Link  to={""} className="navbar-brand">
                    <img src="https://img.freepik.com/free-vector/group-young-people-posing-photo_52683-18823.jpg?size=338&ext=jpg" width="35" height="25" alt="brand"/>User Manual
                </Link>

                <Nav className="me-auto">

                    <Link to={"addUser"} className="nav-link">Add User</Link>
                    <Link to={"userList"} className="nav-link">User List</Link>
                </Nav>
            </Navbar>
        );

    }
}

export default NavigationBar;