import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    Table,
    Image,
    ButtonGroup,
    Button,
    InputGroup,
    FormControl, Nav,
} from "react-bootstrap";
import axios from "axios";
import MyToast from "./Toasts";
import {Link} from "react-router-dom";
export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.findAllUsers();
    }
 findAllUsers(){
     //this.findAllBooks(this.state.currentPage);
     // axios.get("http://localhost:8080/api/v1/person")
     //     .then(response => console.log(response.data));
     axios.get("http://localhost:8080/api/v1/person")
         .then(response => response.data)
         .then((data) => {
             this.setState({users: data})
         });

 }
    deleteUser = (userId) => {
        //alert(userId);
        axios.delete("http://localhost:8080/api/v1/person/" +userId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show": true});
                    setTimeout(()=>  this.setState({"show": false}), 3000);
                    // alert("User deleted Successfully");
                    this.setState({
                       users: this.state.users.filter(user => user.id !== userId)
                    });
                }
                else {
                    this.setState({"show": false});
                }
            })
    }

    render() {
        return (
            <div>

                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"User Deleted Successfully.."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList}/> User List
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                <th>Address</th>
                                <th>DateOfBirth</th>
                                <th>Gender</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.users.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">User Available</td>

                                </tr> :
                                this.state.users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <Image src={user.coverPhotoURL} roundedCircle width="25" height="25"/>
                                            {user.id}
                                        </td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.nic}</td>
                                        <td>{user.address}</td>
                                        <td>{user.date}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+user.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{ ' '}
                                                {/*<Button size="sm"*/}
                                                {/*        variant="outline-primary" ><FontAwesomeIcon icon={faEdit}/> </Button>*/}
                                                <Button size="sm"
                                                        variant="outline-danger"
                                                        onClick={this.deleteUser.bind(this, user.id)}
                                                > <FontAwesomeIcon icon={faTrash}/> </Button>
                                            </ButtonGroup>
                                        </td>

                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}