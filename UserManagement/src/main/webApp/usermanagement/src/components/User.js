import React, { Component } from "react";
import { Card, Form, Button, Col, Row, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
    faList,
    faSave,
    faPlusSquare,
    faUndo, faEdit
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./Toasts";
export default class User extends Component {

    constructor(props) {
        super(props);
       // this.state = this.initialState;
       //  this.state = {
       //      firstName:'',lastName:'',nic:'',address:'',telephoneNo:'',gender:''
       //  };
        this.state = this.initialState;
        this.state.show= false;
        this.userChange= this.userChange.bind(this);
        this.submitUser= this.submitUser.bind(this);

    }

    initialState = {
        id: "",
        firstName: "",
        lastName: "",
        coverPhotoURL: "",
        nic: "",
        address: "",
        date: "",
        gender: "",
    };

    componentDidMount() {
        const userId = +this.props.match.params.id;
        if(userId){
           this.findUserById(userId);

        }
    }

    findUserById = (userId) => {
        axios.get("http://localhost:8080/api/v1/person/"+userId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        firstName:response.data.firstName,
                        lastName: response.data.lastName,
                        coverPhotoURL: response.data.coverPhotoURL,
                        nic: response.data.nic,
                        address:response.data.address ,
                        date: response.data.date,
                        gender: response.data.gender
                    });
                }
            }).catch((error) => {
            console.error("Error - "+error);
        });
    }

    resetUser = () => {
        this.setState(() => this.initialState);
    };

    submitUser (event) {
       // alert('firstName: '+this.state.firstName+', lastName: '+this.state.lastName+', nic: '+this.state.nic+', address: '+this.state.address+', date: '+this.state.date+', gender: '+this.state.gender,);
        event.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName:  this.state.lastName,
            nic: this.state.nic,
            address: this.state.address,
            date: this.state.date,
            gender: this.state.gender,
        };

        axios.post("http://localhost:8080/api/v1/add/person", user)
            .then(response => {
                if(response.data != null){
                    this.setState({"show": true});
                    setTimeout(()=>  this.setState({"show": false}), 3000);
                    // alert("user Saved Successfully");
                }
                else {
                    this.setState({"show": false});
                }

            })
        this.setState(this.initialState);
    };


    updateUser  = (userId) => {

        const user = {
           id: this.state.id,
            firstName: this.state.firstName,
            lastName:  this.state.lastName,
            nic: this.state.nic,
            address: this.state.address,
            date: this.state.date,
            gender: this.state.gender,
        };

        axios.post("http://localhost:8080/api/v1/add/person", user)
            .then(response => {
                if(response.data != null){
                    this.setState({"show": true});
                    setTimeout(()=>  this.setState({"show": false}), 3000);
                    setTimeout(()=>  this.userList(), 3000);
                    // alert("user Saved Successfully");
                }
                else {
                    this.setState({"show": false});
                }

            })
        this.setState(this.initialState);

    };

    userChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        );
    };

    userList = () => {
        return this.props.history.push("/userList");
    };

    render() {
        const {firstName, lastName, coverPhoto, nic, address, date, gender } = this.state;


        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"User Saved Successfully"} type={"success" }/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update User" : "Add New User"}
                    </Card.Header>
                    <Form onReset={this.resetUser} id="userFormId" onSubmit={this.state.id ? this.updateUser :this.submitUser}>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control  required
                                                   value={firstName}
                                                   autoComplete="off"
                                                   onChange={this.userChange} type="firstName" name="firstName" placeholder="Enter First Name" className={"bg-dark text-white"}/>

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required
                                                  value={lastName}
                                                  autoComplete="off"
                                                  onChange={this.userChange}
                                                  type="lastName" name="lastName" placeholder="Enter Last Name" className={"bg-dark text-white"}/>
                                </Form.Group>

                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>NIC</Form.Label>
                                    <Form.Control required
                                                  value={nic}
                                                  autoComplete="off"
                                                  onChange={this.userChange}
                                                  type="nic" name="nic" placeholder="Enter NIC number" className={"bg-dark text-white"} />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required
                                        // value={this.state.address}
                                                  value={address}
                                                  autoComplete="off"
                                                  onChange={this.userChange}
                                                  type="address" name="address" placeholder="Enter Address" className={"bg-dark text-white"}/>
                                </Form.Group>

                            </Form.Group>{' '}
                            <Form.Group as={Row}>
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control required
                                                  value={date}
                                                  autoComplete="off"
                                                  onChange={this.userChange}
                                                  type="date" name="date" placeholder="Enter Date Of Birth " className={"bg-dark text-white"}/>

                                </Form.Group>{' '}
                                <Form.Group as={Col} controlId="formGridUser">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control required
                                                  value={gender}
                                                  autoComplete="off"
                                                  onChange={this.userChange}
                                                  type="gender" name="gender" placeholder="Enter Gender" className={"bg-dark text-white"}/>
                                </Form.Group>

                            </Form.Group>{' '}
                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />  {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            {/*&nbsp;&nbsp;*/}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}

                            <Button size="sm" variant="info" type="button" onClick={this.userList.bind(this)}>
                                <FontAwesomeIcon icon={faList} /> Users List
                            </Button>{' '}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

        );

    }
}