import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Input, Menu } from 'semantic-ui-react'

export default class Header extends Component {
	state = { activeItem: 'home' }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return(
			<div>
				<Menu>
		          <Link to="/">
		          	<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
		          </Link>
		          <Link to="/about">
		          	<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
		          </Link>
		          <Menu.Menu position='right'>
		            <Menu.Item>
		              <Input icon='search' placeholder='Search...' />
		            </Menu.Item>
		          </Menu.Menu>
		        </Menu>
			</div>
		);
	}
}