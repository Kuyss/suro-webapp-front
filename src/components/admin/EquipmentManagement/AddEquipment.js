import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Button, Dropdown, Form, Input, Table, TextArea } from 'semantic-ui-react';
import './EquipmentManagement.css';

class AddEquipment extends Component {

	constructor() {
		super();

		this.state = {
			kit_id: null,
			type_id: null,
			subtype_id: null,
			device_type_id: null,
			description: "",
			identifier: "",
			itemList: []
		}
	}

	componentDidMount = () => {
		this.props.dispatch(itemActions.getAllDeviceTypes(this.props.token));
		this.props.dispatch(itemActions.getAllTypes(this.props.token));
		this.props.dispatch(itemActions.getAllSubtypes(this.props.token));
		this.props.dispatch(itemActions.getAllKits(this.props.token));
	}

	createDropdownList = (list, option) => {
		let dropdownList = [];
		let dropdownItem = {};

		for(let i = 0; i < list.length; i++) {
			dropdownItem = {
				key: list[i].id,
				value: list[i].id
			}
			if(option === "TYPES") dropdownItem.text = list[i].description;
			else if(option === "KITS") dropdownItem.text = list[i].name;
			dropdownList.push(dropdownItem);
		}

		return dropdownList;
	}

	handleAddItem = () => {
		const { device_type_id, type_id, subtype_id, kit_id, description, identifier } = this.state;
		let itemList = [...this.state.itemList];

		if(!device_type_id || !identifier || !description || !kit_id || !type_id) return;

		let item = {
			description,
			identifier,
			device_type_id,
			type_id,
			subtype_id,
			kit_id
		};

		itemList.push(item);

		this.setState({ itemList });

		this.resetState();
	}

	handleCreateItems = () => {
		const { itemList } = this.state;
		for(let i = 0; i < itemList.length; i++) {
			this.props.dispatch(itemActions.createItem(itemList[i], this.props.token));
		}
		
		this.setState({ itemList: [] });
		this.resetState();
	}

	resetState = () => {
		this.setState({
			kit_id: null,
			type_id: null,
			subtype_id: null,
			device_type_id: null,
			description: "",
			identifier: ""
		});
	}

	setIdentifier = (e) => {
		this.setState({ identifier: e.target.value });
	}

	setDescription = (e) => {
		this.setState({ description: e.target.value });
	}

	setDeviceType = (e, { value }) => {
		const device_type_id = value;
		this.setState({ device_type_id });
	}

	setType = (e, { value }) => {
		const type_id = value;
		this.setState({ type_id });
	}

	setSubtype = (e, { value }) => {
		const subtype_id = value;
		this.setState({ subtype_id });
	}

	setKit = (e, { value }) => {
		const kit_id = value;
		this.setState({ kit_id });
	}

	getNameFromId = (arr, id) => {
		for(let i = 0; i < arr.length; i++) {
			if(arr[i].value === id)
				return arr[i].text;
		}
	}

	render() {
		let { deviceTypes, types, subtypes, kits } = this.props;

		let deviceTypesDropdown = this.createDropdownList(deviceTypes, "TYPES");
		let typesDropdown = this.createDropdownList(types, "TYPES");
		let subTypesDropdown = this.createDropdownList(subtypes, "TYPES");
		let kitsDropdown = this.createDropdownList(kits, "KITS");

		return(
			<div>
				<Form widths='equal'>
					<Form.Field inline>
                      <label>Identifier:</label>
                      <Input className='identifierInput' value={this.state.identifier} onChange={this.setIdentifier} placeholder='Identifier'/>
                    </Form.Field>
					<Form.Group inline>
						<label>Select Types:</label>
				        <Dropdown value={this.state.device_type_id} onChange={this.setDeviceType} placeholder='Select Device Type' search selection options={deviceTypesDropdown} />
						<Dropdown value={this.state.type_id} onChange={this.setType} placeholder='Select Type' search selection options={typesDropdown} />
						<Dropdown value={this.state.subtype_id} onChange={this.setSubtype} placeholder='Select Subtype' search selection options={subTypesDropdown} />
						<Dropdown value={this.state.kit_id} onChange={this.setKit} placeholder='Select Kit' search selection options={kitsDropdown} />
			        </Form.Group>
			        <Form.Field >
                      <label>Description:</label>
                      <TextArea value={this.state.description} onChange={this.setDescription} placeholder='Description' />
                    </Form.Field>
					
					<Button type='button' onClick={this.handleAddItem}>Add Equipment</Button>
				</Form>
				<br/>
				
					{
						this.state.itemList.length > 0 &&
						<div>
							<Table celled padded>
					          <Table.Header>
					            <Table.Row>
					              <Table.HeaderCell>Identifier</Table.HeaderCell>
					              <Table.HeaderCell>Device Type</Table.HeaderCell>
					              <Table.HeaderCell>Type</Table.HeaderCell>
					              <Table.HeaderCell>Subtype</Table.HeaderCell>
					              <Table.HeaderCell>Kit</Table.HeaderCell>
					              <Table.HeaderCell>Description</Table.HeaderCell>
					            </Table.Row>
					          </Table.Header>

					          <Table.Body>
					            {
					              this.state.itemList.map((it, i) => {
					                return(
					                  <Table.Row key={i}>
					                    <Table.Cell>{it.identifier}</Table.Cell>
					                    <Table.Cell>{this.getNameFromId(deviceTypesDropdown, it.device_type_id)}</Table.Cell>
					                    <Table.Cell>{this.getNameFromId(typesDropdown, it.type_id)}</Table.Cell>
					                    <Table.Cell>{this.getNameFromId(subTypesDropdown, it.subtype_id)}</Table.Cell>
					                    <Table.Cell>{this.getNameFromId(kitsDropdown, it.kit_id)}</Table.Cell>
					                    <Table.Cell>{it.description}</Table.Cell>
					                  </Table.Row>
					                );
					              })
					            }
					          </Table.Body>
					        </Table>
					        <Button type='button' onClick={this.handleCreateItems}>Save Changes</Button>
				        </div>
				        
					}
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    deviceTypes: state.items.deviceTypes,
    types: state.items.types,
    subtypes: state.items.subtypes,
    kits: state.items.kits
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
)(AddEquipment);