import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Button, Icon, Input, Table } from 'semantic-ui-react';

class EquipmentOverview extends Component {

	constructor() {
		super();

		this.state = {
			description: "",
			identifier: "",
			index: -1,
		}
	}

	componentDidMount = () => {
		this.props.dispatch(itemActions.getAllItems(this.props.token));
	}

	handleDismiss = () => {
		this.setState({
			description: "",
			identifier: "",
			index: -1,
		});
	}

	handleStartEdit = (index) => {
		this.setState({ index })
	}

	handleDeleteItem = (item_id) => {
		this.props.dispatch(itemActions.deleteItem(item_id, this.props.token));
	}

	handleEditItem = (item) => {
		const { description, identifier } = this.state;

		if(!description || !identifier) return;

		const newItem = Object.assign({}, item, { description, identifier });

		this.props.dispatch(itemActions.editItem(newItem, this.props.token));

		this.handleDismiss();
	}

	setIdentifier = (e) => {
		const identifier = e.target.value;
		this.setState({ identifier });
	}

	setDescription = (e) => {
		const description = e.target.value;
		this.setState({ description });
	}

	render() {
		const { items } = this.props;
		return(
			<div>
			  <Table celled padded>
		          <Table.Header>
		            <Table.Row>
		              <Table.HeaderCell singleLine>Id</Table.HeaderCell>
		              <Table.HeaderCell>Identifier</Table.HeaderCell>
		              <Table.HeaderCell>Description</Table.HeaderCell>
		              <Table.HeaderCell>Device Type, Type, Subtype, Kit</Table.HeaderCell>
		              <Table.HeaderCell>Created At</Table.HeaderCell>
		              <Table.HeaderCell>Updated At</Table.HeaderCell>
		              <Table.HeaderCell>Edit</Table.HeaderCell>
		              <Table.HeaderCell>Delete</Table.HeaderCell>
		            </Table.Row>
		          </Table.Header>

		          <Table.Body>
		            {
		              items.map((it, i) => {
		              	if(i === this.state.index) {
		              		return(
			                  <Table.Row key={i}>
			                    <Table.Cell>{it.id}</Table.Cell>
			                    <Table.Cell><Input placeholder='Identifier' value={this.state.identifier} onChange={this.setIdentifier} /></Table.Cell>
			                    <Table.Cell><Input placeholder='Description' value={this.state.description} onChange={this.setDescription} /></Table.Cell>
			                    <Table.Cell>{it.created_at}</Table.Cell>
			                    <Table.Cell>{it.updated_at}</Table.Cell>
			                    <Table.Cell textAlign='center'>
			                    	<Button onClick={() => this.handleEditItem(it)} color='green' icon><Icon name='checkmark'/></Button>
			                    	<Button onClick={this.handleDismiss} color='red' icon><Icon name='remove'/></Button>
			                    </Table.Cell>
			                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteItem(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
			                  </Table.Row>
			                );
		              	} else {
		              		return(
			                  <Table.Row key={i}>
			                    <Table.Cell>{it.id}</Table.Cell>
			                    <Table.Cell>{it.identifier}</Table.Cell>
			                    <Table.Cell>{it.description}</Table.Cell>
			                    <Table.Cell>{it.device_type.description}, {it.type.description}, {it.subtype ? it.subtype.description : ""}, {it.kit.name}</Table.Cell>
			                    <Table.Cell>{it.created_at}</Table.Cell>
			                    <Table.Cell>{it.updated_at}</Table.Cell>
			                    <Table.Cell textAlign='center'><Button onClick={() => this.handleStartEdit(i)} color='orange' icon><Icon name='edit'/></Button></Table.Cell>
			                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteItem(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
			                  </Table.Row>
		                	);
		              	}
		              })
		            }
		          </Table.Body>
		        </Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    items: state.items.itemList
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
)(EquipmentOverview);