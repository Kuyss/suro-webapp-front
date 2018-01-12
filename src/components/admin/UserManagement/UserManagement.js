import React, { Component } from 'react';
import { Grid, Icon, Menu, Segment } from 'semantic-ui-react';
import './UserManagement.css';

export default class Header extends Component {
	state = { activeItem: 'create new user' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="UserManagement">	
	      <Grid>
	        <Grid.Column width={3}>
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
	        </Grid.Column>

	        <Grid.Column stretched width={13} >
	          <Segment>
	            This is an stretched grid column. This segment will always match the tab height
	          </Segment>
	        </Grid.Column>
	      </Grid>
      </div>
    )
  }
}