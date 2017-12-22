import React from 'react';
import { Button, Form, Label } from 'semantic-ui-react';
import { save, read } from '../services/storage.js';
import { loginUser } from '../services/user.js';


export default class Login extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            data: {},
            passOK: true
        };
        this.saveCredentials = this.saveCredentials.bind(this);
    }

    saveCredentials(emailAdd, passw) {

        loginUser(emailAdd, passw).then((response) => {

            if (response.token == undefined) {
                this.setState({
                    passOK: false
                });
                return;
            } else {
                this.setState({
                    passOK: true
                });
            }

            this.setState({
                data: response
            });

            save('email', emailAdd);
            save('token', this.state.data.token);
        });

    }

    render() {
        return (
            <Form style={{padding: 15}}>
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
            </Form>
        );
    }
}