import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import EquipmentTabs from './EquipmentTabs';
import AddEquipment from './AddEquipment';
import EquipmentOverview from './EquipmentOverview';
import EquipmentHistory from './EquipmentHistory';
import './EquipmentManagement.css';

export default class EquipmentManagement extends Component {

	constructor() {
		super();

		this.state = {
			activeTab: 'add equipment'
		}
	}

	handleTabChange = (activeTab) => {
		this.setState({ activeTab });
	}

	renderEquipmentManagementView = () => {
		switch(this.state.activeTab) {
			case 'add equipment':
				return <AddEquipment />
			case 'equipment overview':
				return <EquipmentOverview />
			case 'equipment history':
				return <EquipmentHistory />
			default:
				return null
		}
	}

	render() {
		return(
			<div className="EquipmentManagement">	
		  	<Grid>
		        <Grid.Column width={3}>
		      		<EquipmentTabs handleTabChange={this.handleTabChange}/>
		      	</Grid.Column>

		      	<Grid.Column stretched width={13} >
		          <Segment>
		            { this.renderEquipmentManagementView() }
		          </Segment>
		        </Grid.Column>
		    </Grid>
		  </div>
		);
	}
}