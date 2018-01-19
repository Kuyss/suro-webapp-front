import React, { Component } from 'react';
import { connect } from 'react-redux';
import userActions from 'actionCreators/userActionCreator';
import { Button, Dropdown, Icon, Input, Table } from 'semantic-ui-react';
import "./UsersOverview.css";
import { ROLES } from "util/constants";

const roleOptions = [
  {
    text: "ADMIN",
    key: ROLES.ADMIN,
    value: ROLES.ADMIN
  },
  {
    text: "USER",
    key: ROLES.USER,
    value: ROLES.USER
  }
];

const activeOptions = [
  {
    text: "YES",
    key: 1,
    value: 1
  },
  {
    text: "NO",
    key: 0,
    value: 0
  }
];

class UsersOverview extends Component {

  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      role_id: null,
      active: null,
      index: -1,
    }
  }

  componentDidMount = () => {
    this.props.dispatch(userActions.loadAllUsers(this.props.token));
  }

  convertRole = (role_id) => {
   if (role_id === 1) return "ADMIN";
   else if (role_id === 2) return "USER";
   else return "ROLE";
  }

   handleDeleteUser = (user_id) => {
      this.props.dispatch(userActions.deleteUser(user_id, this.props.token));
   }

   handleDismiss = () => {
    this.setState({
      first_name: "",
      last_name: "",
      role_id: null,
      active: null,
      index: -1,
    });
  }

  handleEditUser = (user) => {
    const { first_name, last_name, role_id, active } = this.state;

    if(!first_name || !last_name || !role_id || active === null) return;

    const newUser = { id: user.id, first_name, last_name, role_id, active };

    this.props.dispatch(userActions.editUser(newUser, this.props.token));

    this.handleDismiss();
  }

  handleStartEdit = (user, index) => {
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      role_id: user.role_id,
      active: user.active,
      index 
    });
  }

  setActive = (e, { value }) => {
    const active = value;
    this.setState({ active });
  }

  setFirstName = (e) => {
    const first_name = e.target.value;
    this.setState({ first_name });
  }

  setLastName = (e) => {
    const last_name = e.target.value;
    this.setState({ last_name });
  }

  setRole = (e, { value }) => {
    const role_id = value;
    this.setState({ role_id });
  }

	render() {
    const { users } = this.props;
		return(
			<div>
			  <Table celled textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              users.map((u, i) => {
                if(i === this.state.index) {
                  return(
                    <Table.Row key={i}>
                      <Table.Cell>{u.id}</Table.Cell>
                      <Table.Cell><Input placeholder='First Name' value={this.state.first_name} onChange={this.setFirstName} /></Table.Cell>
                      <Table.Cell><Input placeholder='Last Name' value={this.state.last_name} onChange={this.setLastName} /></Table.Cell>
                      <Table.Cell>{u.email}</Table.Cell>
                      <Table.Cell><Dropdown value={this.state.role_id} onChange={this.setRole} placeholder='Select Role' selection options={roleOptions} /></Table.Cell>
                      <Table.Cell><Dropdown value={this.state.active} onChange={this.setActive} placeholder='Select If User Is Active' selection options={activeOptions} /></Table.Cell>
                      <Table.Cell>{u.created_at}</Table.Cell>
                      <Table.Cell>{u.updated_at}</Table.Cell>
                      <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleEditUser(u)} color='green' icon><Icon name='checkmark'/></Button>
                            <Button onClick={this.handleDismiss} color='red' icon><Icon name='remove'/></Button>
                          </Table.Cell>
                      <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteUser(u.id)} color='red' icon><Icon name='user delete'/></Button></Table.Cell>
                    </Table.Row>
                );
                } else {
                  return(
                    <Table.Row key={i}>
                      <Table.Cell>{u.id}</Table.Cell>
                      <Table.Cell>{u.first_name}</Table.Cell>
                      <Table.Cell>{u.last_name}</Table.Cell>
                      <Table.Cell>{u.email}</Table.Cell>
                      <Table.Cell>{this.convertRole(u.role_id)}</Table.Cell>
                      <Table.Cell>{u.active ? "YES" : "NO"}</Table.Cell>
                      <Table.Cell>{u.created_at}</Table.Cell>
                      <Table.Cell>{u.updated_at}</Table.Cell>
                      <Table.Cell textAlign='center'><Button onClick={() => this.handleStartEdit(u,i)} color='orange' icon><Icon name='edit'/></Button></Table.Cell>
                      <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteUser(u.id)} color='red' icon><Icon name='user delete'/></Button></Table.Cell>
                    </Table.Row>
                );
                }
                
              })
            }
          </Table.Body>
        </Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    users: state.users.userList
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
)(UsersOverview);