import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class UserTabs extends Component {
	state = { activeItem: 'create new user' }

  	handleItemClick = (e, { name }) => {
  		this.setState({ activeItem: name });
  		this.props.handleTabChange(name);
  	} 

	render() {
		const { activeItem } = this.state

		return(
			<Menu fluid vertical pointing>
				<Menu.Item name='create new user' active={activeItem === 'create new user'} onClick={this.handleItemClick} >
					<Icon name='add user' />
					Create New User
				</Menu.Item>
				<Menu.Item name='accept new users' active={activeItem === 'accept new users'} onClick={this.handleItemClick} >
				<Icon name='check circle' />
					Accept New Users
				</Menu.Item>
				<Menu.Item name='users overview' active={activeItem === 'users overview'} onClick={this.handleItemClick} >
					<Icon name='users' />
					Users Overview
				</Menu.Item>
				<Menu.Item name='reservation approvals' active={activeItem === 'reservation approvals'} onClick={this.handleItemClick} >
					<Icon name='clipboard' />
					Reservation Approvals
				</Menu.Item>
			</Menu>
		);
	}
}