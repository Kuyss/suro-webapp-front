import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ROLES } from 'util/constants';

import EquipmentTabs from './EquipmentTabs';
import AddEquipment from './AddEquipment';
import EquipmentOverview from './EquipmentOverview';
import EquipmentHistory from './EquipmentHistory';
import CategoryManagement from './CategoryManagement';
import NotFound from 'components/NotFound';
import './EquipmentManagement.css';

class EquipmentManagement extends Component {

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
			case 'category management':
				return <CategoryManagement />
			default:
				return null
		}
	}

	render() {
		if(this.props.role !== ROLES.ADMIN) {
			return <NotFound />
		} else {
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
}

const mapStateToProps = (state) => {
  return {
    role: state.users.currentUserRole
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
)(EquipmentManagement);