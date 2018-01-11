import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { registerUser } from '../services/user.js';

export default class Register extends React.Component {

    constructor(args) {
        super(args);
    }

    render() {
        return (<Form style={{ padding: 15 }}>
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
            <Form.Field>
                <label>First name</label>
                <input placeholder='first_name' ref={(input) => {
                    this.first_name = input;
                }} />
            </Form.Field>
            <Form.Field>
                <label>Last name</label>
                <input placeholder='last_name' ref={(input) => {
                    this.last_name = input;
                }} />
            </Form.Field>
            <Button type='register' onClick={() =>
                registerUser(this.email.value, this.password.value, this.first_name.value, this.last_name.value)}>Register</Button>
        </Form>);
    }
}