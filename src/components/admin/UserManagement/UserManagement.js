import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ROLES } from 'util/constants';

import UserTabs from './UserTabs';
import UsersOverview from './UsersOverview';
import CreateNewUser from './CreateNewUser';
import AcceptNewUsers from './AcceptNewUsers';
import ReservationApprovals from './ReservationApprovals';
import NotFound from 'components/NotFound';
import './UserManagement.css';

class UserManagement extends Component {
	constructor() {
		super();

		this.state = {
			activeTab: 'create new user'
		}
	}


	handleTabChange = (activeTab) => {
		this.setState({ activeTab });
	}

	renderUserManagementView = () => {
		switch(this.state.activeTab) {
			case 'create new user':
				return <CreateNewUser />
			case 'accept new users':
				return <AcceptNewUsers />
			case 'users overview':
				return <UsersOverview />
			case 'reservation approvals':
				return <ReservationApprovals />
			default:
				return null
		}
	}

	render() {
		if(this.props.role !== ROLES.ADMIN) {
			return <NotFound />
		} else {
			return (
			  <div className="UserManagement">	
			  	<Grid>
			        <Grid.Column width={3}>
			      		<UserTabs handleTabChange={this.handleTabChange}/>
			      	</Grid.Column>

			      	<Grid.Column stretched width={13} >
			          <Segment>
			            { this.renderUserManagementView() }
			          </Segment>
			        </Grid.Column>
			    </Grid>
			  </div>
			);
		}
		
	}
}

const mapStateToProps = (state) => {
  return {
    role: state.users.currentUserRole
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
)(UserManagement);