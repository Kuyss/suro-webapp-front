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