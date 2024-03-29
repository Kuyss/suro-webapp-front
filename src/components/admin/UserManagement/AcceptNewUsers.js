import React, { Component } from 'react';
import { connect } from 'react-redux';
import userActions from 'actionCreators/userActionCreator';
import { Button, Icon, Table } from 'semantic-ui-react';

class AcceptNewUser extends Component {

	componentDidMount = () => {
    	this.props.dispatch(userActions.loadAllInactiveUsers(this.props.token));
  	}

  	convertRole = (role_id) => {
	   if (role_id === 1) return "ADMIN";
	   else if (role_id === 2) return "USER";
	   else return "ROLE";
	}

	handleActivateUser = (user_id) => {
		this.props.dispatch(userActions.changeUserActive(user_id, true, this.props.token));
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
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Activate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              users.map((u, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell>{u.id}</Table.Cell>
                    <Table.Cell>{u.first_name}</Table.Cell>
                    <Table.Cell>{u.last_name}</Table.Cell>
                    <Table.Cell>{u.email}</Table.Cell>
                    <Table.Cell>{this.convertRole(u.role_id)}</Table.Cell>
                    <Table.Cell>{u.created_at}</Table.Cell>
                    <Table.Cell>{u.updated_at}</Table.Cell>
                    <Table.Cell textAlign='center'><Button onClick={() => this.handleActivateUser(u.id)} color='blue' icon><Icon name='check circle'/></Button></Table.Cell>
                  </Table.Row>
                );
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
)(AcceptNewUser);