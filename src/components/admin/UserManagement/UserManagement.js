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
	            <Menu.Item name='accept new user' active={activeItem === 'accept new user'} onClick={this.handleItemClick} >
	            <Icon name='checkmark' />
	            	Accept New User
	            </Menu.Item>
	            <Menu.Item name='user overview' active={activeItem === 'user overview'} onClick={this.handleItemClick} >
	            	<Icon name='users' />
	            	User Overview
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