import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import User from "./components/User";
import UserList from "./components/UserList";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

    const marginTop = {
        marginTop:"20px"
    };

  return (
      <Router>
        <NavigationBar/>
        <Container className="bg-dark text-while">
         <Row>
             <Col lg={12} style={marginTop}>
                 <Switch>
                     <Route path="/" exact component={Welcome} />
                     <Route path="/addUser" exact component={User} />
                     <Route path="/edit/:id" exact component={User} />
                     <Route path="/userList" exact component={UserList} />

                 </Switch>

             </Col>
         </Row>
        </Container>
        <Footer/>
      </Router>
  );
}

export default App;
