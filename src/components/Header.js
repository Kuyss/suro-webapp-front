import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROLES } from '../util/constants';
import { connect } from 'react-redux';
import userActions from '../actionCreators/userActionCreator';
import './Header.css';

import { Button, Icon, Label, Menu } from 'semantic-ui-react'

class Header extends Component {

	constructor() {
		super();
		this.state = {
			activeTab: 'home', 
			role: 2
		}
	}

	handleItemClick = (e, { name }) => {
		//this.setState({ activeTab: name });
		this.props.dispatch(userActions.changeActiveTab(name));
	}

	handleLogout = () => {
		this.props.dispatch(userActions.logout());
	}

	renderButtons = () => {
		if(this.props.role) {
			return(
				<Menu.Menu position='right'>
					<Menu.Item>
			          <span className='loggedAs'><Icon name='user' color='green'  /> Logged in as: <b>{this.props.user.email}</b></span>
			        </Menu.Item>
					<Link to="/" className='rightLink'>
						<Menu.Item as="span" name='logout' className='rightBtn'  onClick={this.handleLogout}>
							<Button color='grey'>Logout</Button>
						</Menu.Item>
					</Link>
				</Menu.Menu> 
			);
		} else {
			return(
				<Menu.Menu position='right'>
					<Link to="/register" className='rightLink'>
						<Menu.Item as="span" className='rightBtn' name='register' active={this.props.activeTab === 'register'} onClick={this.handleItemClick}>
							<Button primary>Register</Button>
						</Menu.Item>
					</Link>
				</Menu.Menu>
			);
		}
	}

	render() {
		const { activeTab, role } = this.props

		return (
			<div>
				<Menu icon='labeled'>
					{
						role === null &&
						<Link to="/">
							<Menu.Item as="span" name='home' active={activeTab === 'home'} onClick={this.handleItemClick} >
								<Icon name="home" />
								Home
				          	</Menu.Item>
						</Link>
					}
					{
						role === ROLES.ADMIN &&
						<Menu.Menu>
							<Link to="/user_management">
								<Menu.Item as="span" name='user management' active={activeTab === 'user management'} onClick={this.handleItemClick} >
									<Icon name="user" />
									User Management
					          	</Menu.Item>
							</Link>
							<Link to="/equipment_management">
								<Menu.Item as="span" name='equipment management' active={activeTab === 'equipment management'} onClick={this.handleItemClick} >
									<Icon name="archive" />
									Equipment Management
					          	</Menu.Item>
							</Link>
						</Menu.Menu>
					}
					{
						role === ROLES.USER &&
						<Menu.Menu>
							<Link to="/search_equipment">
								<Menu.Item as="span" name='search equipment' active={activeTab === 'search equipment'} onClick={this.handleItemClick}>
									<Icon name="search" />
									Search Equipment
								</Menu.Item>
							</Link>
							<Link to="/active_reservations">
								<Menu.Item as="span" name='active reservations' active={activeTab === 'active reservations'} onClick={this.handleItemClick}>
									<Icon name="find" />
									Active Reservations
								</Menu.Item>
							</Link>
							<Link to="/history">
								<Menu.Item as="span" name='history' active={activeTab === 'history'} onClick={this.handleItemClick}>
									<Icon name="history" />
									Reservations History
								</Menu.Item>
							</Link>
						</Menu.Menu>
					}
					{ this.renderButtons() }
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
  	activeTab: state.users.activeTab,
    role: state.users.currentUserRole,
    showLoginPopup: state.users.showLoginPopup,
    user: state.users.currentUser
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