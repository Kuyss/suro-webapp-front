import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roles } from '../util/roles';

import { Input, Menu } from 'semantic-ui-react'

export default class Header extends Component {
	state = { activeItem: 'home', role: "ADMIN" }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, role } = this.state

		return(
			<div>
				<Menu>
				  {
				  	role === roles.ADMIN &&
				  	<Link to="/user_management">
			          	<Menu.Item name='user management' active={activeItem === 'user management'} onClick={this.handleItemClick} />
			        </Link>
				  }
				  {
				  	role === roles.USER &&
				  	<Link to="/user_management">
			          	<Menu.Item name='user management' active={activeItem === 'user management'} onClick={this.handleItemClick} />
			        </Link>
				  }
		        </Menu>
			</div>
		);
	}
}