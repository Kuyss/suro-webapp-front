import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { roles } from '../util/roles';

import { Menu } from 'semantic-ui-react'

export default class Header extends Component {
	state = { activeItem: 'home', role: "ADMIN" }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, role } = this.state

		return(
			<div>
				<Menu>
					<Link to="/">
			          	<Menu.Item as="span" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
			        </Link>
				  {
				  	role === roles.ADMIN &&
				  		<Menu.Menu>
						  	<Link to="/user_management">
					          	<Menu.Item as="span" name='user management' active={activeItem === 'user management'} onClick={this.handleItemClick} />
					        </Link>
					        <Link to="/user_overview">
					          	<Menu.Item as="span" name='user overview' active={activeItem === 'user overview'} onClick={this.handleItemClick} />
					        </Link>
					        <Link to="/equipment_management">
					          	<Menu.Item as="span" name='equipment management' active={activeItem === 'equipment management'} onClick={this.handleItemClick} />
					        </Link>
					        <Link to="/equipment_overview">
					          	<Menu.Item as="span" name='equipment overview' active={activeItem === 'equipment overview'} onClick={this.handleItemClick} />
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