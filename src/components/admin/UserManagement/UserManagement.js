import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import UserTabs from './UserTabs';
import UsersOverview from './UsersOverview';
import CreateNewUser from './CreateNewUser';
import AcceptNewUsers from './AcceptNewUsers';
import ReservationApprovals from './ReservationApprovals';
import './UserManagement.css';

export default class UserManagement extends Component {
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