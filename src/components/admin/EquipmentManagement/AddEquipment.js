import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Button, Dropdown, Form, Input, TextArea } from 'semantic-ui-react';

class AddEquipment extends Component {

	constructor() {
		super();

		this.state = {
			kit_id: null,
			type_id: null,
			subtype_id: null,
			device_type_id: null,
			description: "",
			identifier: ""
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

	handleCreateItem = () => {
		let { device_type_id, type_id, subtype_id, kit_id, description, identifier } = this.state;

		let item = {
			description,
			identifier,
			device_type_id,
			type_id,
			subtype_id,
			kit_id
		};

		this.props.dispatch(itemActions.createItem(item, this.props.token));
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

	render() {
		let { deviceTypes, types, subtypes, kits } = this.props;

		let deviceTypesDropdown = this.createDropdownList(deviceTypes, "TYPES");
		let typesDropdown = this.createDropdownList(types, "TYPES");
		let subTypesDropdown = this.createDropdownList(subtypes, "TYPES");
		let kitsDropdown = this.createDropdownList(kits, "KITS");

		return(
			<div>
				<Input onChange={this.setIdentifier} placeholder='Identifier'/>
				<Dropdown onChange={this.setDeviceType} placeholder='Select Device Type' search selection options={deviceTypesDropdown} />
				<Dropdown onChange={this.setType} placeholder='Select Type' search selection options={typesDropdown} />
				<Dropdown onChange={this.setSubtype} placeholder='Select Subtype' search selection options={subTypesDropdown} />
				<Dropdown onChange={this.setKit} placeholder='Select Kit' search selection options={kitsDropdown} />
				<Form>
					<TextArea onChange={this.setDescription} placeholder='Description' />
				</Form>
				<Button type='button' onClick={this.handleCreateItem}>Create Item</Button>
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