import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label } from 'semantic-ui-react';
import userActions from '../actionCreators/userActionCreator';

import Popup from './Popup';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    setEmail = (e) => {
        let email = e.target.value;
        this.setState({ email });
    }

    setPassword = (e) => {
        let password = e.target.value;
        this.setState({ password });
    }

    handleLogin = () => {

        if(!this.state.email || !this.state.password) 
            return;
        

        let user = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.dispatch(userActions.login(user));

    }

<<<<<<< HEAD
    render() {
        return (
            <Form style={{ padding: 15 }}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='email' ref={(input) => {
                        this.email = input;
                    }} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='password' ref={(input) => {
                        this.password = input;
                    }} />
                </Form.Field>
                <Button type='login' onClick={() => this.saveCredentials(this.email.value, this.password.value)}>Login</Button>
                {!this.state.passOK && <Label pointing>Invalid email or password</Label>}
=======
    renderPopup = () => {
        return(
            this.props.showLoginPopup &&
            <div className="popup">
                <Popup  
                    action={"LOGIN"}
                    content={"Logged in succesfully"} 
                    header={"LOGIN"}
                    type={"LOGIN"}
                />
            </div>
        );
        
    }

    renderForm = () => {
        return(
            !this.props.user && 
            <Form style={{padding: 15}}>
                <Form.Field >
                      <label>Email Address:</label>
                      <input placeholder='Email Address' value={this.state.email} onChange={this.setEmail}/>
                    </Form.Field>
                <Form.Field >
                        <label>Password:</label>
                        <input type='password' placeholder='Password' value={this.state.password} onChange={this.setPassword}/>
                    </Form.Field>
                <Button type='button' onClick={this.handleLogin}>Login</Button>
>>>>>>> 27e34061028b9a6840ac7199028abbf53601cd0a
            </Form>
        );
    }

    render() {
        return (
            <div>
                { this.renderPopup() }
                { this.renderForm() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.currentUser,
    showLoginPopup: state.users.showLoginPopup
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
)(Login);