import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roles } from '../util/roles';

import { Icon, Menu } from 'semantic-ui-react'

export default class Header extends Component {
	state = { activeItem: 'home', role: "ADMIN" }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, role } = this.state

		return(
			<div>
				<Menu icon='labeled'>
					<Link to="/">
			          	<Menu.Item as="span" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} >
			          		<Icon name="home" />
			          		Home
			          	</Menu.Item>
			        </Link>
				  {
				  	role === roles.ADMIN &&
				  		<Menu.Menu>
						  	<Link to="/user_management">
					          	<Menu.Item as="span" name='user management' active={activeItem === 'user management'} onClick={this.handleItemClick} >
					          		<Icon name="user" />
			          				User Management
					          	</Menu.Item>
					        </Link>
					        <Link to="/equipment_management">
					          	<Menu.Item as="span" name='equipment management' active={activeItem === 'equipment management'} onClick={this.handleItemClick} >
						          	<Icon name="archive" />
				          				Equipment Management
					          	</Menu.Item>
					        </Link>
				        </Menu.Menu>
				  }
				  {
				  	role === roles.USER &&
					  	<Menu.Menu>

					  	</Menu.Menu>
				  }
		        </Menu>
			</div>
		);
	}
}