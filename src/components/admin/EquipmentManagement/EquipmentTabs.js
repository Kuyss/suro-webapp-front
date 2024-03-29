import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class EquipmentTabs extends Component {
	state = { activeItem: 'add equipment' }

  	handleItemClick = (e, { name }) => {
  		this.setState({ activeItem: name });
  		this.props.handleTabChange(name);
  	} 

	render() {
		const { activeItem } = this.state

		return(
			<Menu fluid vertical pointing>
				<Menu.Item name='add equipment' active={activeItem === 'add equipment'} onClick={this.handleItemClick} >
					<Icon name='add square' />
					Add New Equipment
				</Menu.Item>
				<Menu.Item name='equipment overview' active={activeItem === 'equipment overview'} onClick={this.handleItemClick} >
				<Icon name='briefcase' />
					Equipment Overview
				</Menu.Item>
				<Menu.Item name='equipment history' active={activeItem === 'equipment history'} onClick={this.handleItemClick} >
				<Icon name='history' />
					Equipment History
				</Menu.Item>
				<Menu.Item name='category management' active={activeItem === 'category management'} onClick={this.handleItemClick} >
				<Icon name='history' />
					Category Management
				</Menu.Item>
			</Menu>
		);
	}
}