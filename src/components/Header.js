import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROLES } from '../util/constants';
import { connect } from 'react-redux';

import { Button, Icon, Menu } from 'semantic-ui-react'

class Header extends Component {

	constructor() {
		super();
		this.state = {
			activeItem: 'home', 
			role: null
		}
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, role } = this.state

		return (
			<div>
				<Menu icon='labeled'>
					<Link to="/">
						<Menu.Item as="span" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} >
							<Icon name="home" />
							Home
			          	</Menu.Item>
					</Link>
					{
						this.props.role === ROLES.ADMIN &&
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
						this.props.role === ROLES.USER &&
						<Menu.Menu>
							<Link to="/search_equipment">
								<Menu.Item as="span" name='search equipment' active={activeItem === 'search equipment'} onClick={this.handleItemClick}>
									<Icon name="search" />
									Search Equipment
								</Menu.Item>
							</Link>
							<Link to="/active_reservations">
								<Menu.Item as="span" name='active reservations' active={activeItem === 'active reservations'} onClick={this.handleItemClick}>
									<Icon name="find" />
									Active Reservations
								</Menu.Item>
							</Link>
							<Link to="/history">
								<Menu.Item as="span" name='history' active={activeItem === 'history'} onClick={this.handleItemClick}>
									<Icon name="history" />
									Reservations History
								</Menu.Item>
							</Link>
						</Menu.Menu>
					}
					<Menu.Menu position='right'>
						<Link to="/register">
							<Menu.Item name='registracija' active={activeItem === 'registracija'} onClick={this.handleItemClick}>
								<Button primary>Register</Button>
							</Menu.Item>
						</Link>
					</Menu.Menu> 
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    role: state.users.currentUserRole,
    showLoginPopup: state.users.showLoginPopup
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
)(Header);