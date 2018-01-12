import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import userActions from '../actionCreators/userActionCreator';

import Popup from './Popup';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
        }
    }

    clearState = () => {
        this.setState({
            email: "",
            first_name: "",
            last_name: "",
            password: "",
        });
    }

    setEmail = (e) => {
        let email = e.target.value;
        this.setState({ email });
    }

    setPassword = (e) => {
        let password = e.target.value;
        this.setState({ password });
    }

    setFirstName= (e) => {
        let first_name = e.target.value;
        this.setState({ first_name });
    }

    setLastName = (e) => {
        let last_name = e.target.value;
        this.setState({ last_name });
    }

    handleRegister = () => {

        if(!this.state.email || !this.state.first_name || !this.state.last_name || !this.state.password) 
            return;
        

        let user = {
            email: this.state.email.trim(),
            first_name: this.state.first_name.trim(),
            last_name: this.state.last_name.trim(),
            password: this.state.password
        };

        this.props.dispatch(userActions.register(user));

        this.clearState();
    }

    renderPopup = () => {
        return(
            this.props.showRegisterPopup &&
            <div className="popup">
                <Popup  
                    action={"REGISTER"}
                    content={"Registered succesfully"} 
                    header={"REGISTER"}
                    type={"REGISTER"}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderPopup() }
                <Form style={{ padding: 15 }}>
                    <Form.Field >
                      <label>Email Address:</label>
                      <input placeholder='Email Address' value={this.state.email} onChange={this.setEmail}/>
                    </Form.Field>
                    <Form.Field >
                        <label>Password:</label>
                        <input type='password' placeholder='Password' value={this.state.password} onChange={this.setPassword}/>
                    </Form.Field>
                    <Form.Field >
                      <label>First Name:</label>
                      <input placeholder='First Name' value={this.state.first_name} onChange={this.setFirstName}/>
                    </Form.Field>
                    <Form.Field >
                      <label>Last Name:</label>
                      <input placeholder='Last Name' value={this.state.last_name} onChange={this.setLastName}/>
                    </Form.Field>
                    <Button type='button' onClick={this.handleRegister}>Register</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    showRegisterPopup: state.users.showRegisterPopup
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);