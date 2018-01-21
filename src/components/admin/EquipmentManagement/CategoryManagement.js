import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Table, Button, Dropdown, Icon, Form, Segment } from 'semantic-ui-react';

const typeOptions = [
	{
		key: "DEVICE_TYPES",
		value: "DEVICE_TYPES",
		text: "Device Types"
	},
	{
		key: "TYPES",
		value: "TYPES",
		text: "Types"
	},
	{
		key: "SUBTYPES",
		value: "SUBTYPES",
		text: "Subtypes"
	},
	{
		key: "KITS",
		value: "KITS",
		text: "Kits"
	}
]

class CategoryManagement extends Component {

	constructor() {
		super();

		this.state = {
			type: "",
			description: "",
			label: "",
		}
	}

	componentDidMount = () => {
		this.props.dispatch(itemActions.getAllDeviceTypes(this.props.token));
		this.props.dispatch(itemActions.getAllTypes(this.props.token));
		this.props.dispatch(itemActions.getAllSubtypes(this.props.token));
		this.props.dispatch(itemActions.getAllKits(this.props.token));
	}

	handleAddDeviceType = () => {
		const { description, label } = this.state;

		if(!label || !description) return;

		const deviceType = { description, label };

		this.props.dispatch(itemActions.addDeviceType(deviceType, this.props.token));
	}

	handleDeleteDeviceType = (id) => {
		this.props.dispatch(itemActions.deleteDeviceType(id, this.props.token));
	}

	handleDeleteType = (id) => {
		this.props.dispatch(itemActions.deleteType(id, this.props.token));
	}

	handleDeleteSubtype = (id) => {
		this.props.dispatch(itemActions.deleteSubtype(id, this.props.token));
	}

	handleDeleteKit = (id) => {
		this.props.dispatch(itemActions.deleteKit(id, this.props.token));
	}

	handleTypeChange = (e, { value }) => {
		this.setState({
			type: value,
			description: "",
			label: ""
		});
	}

	render(){
		const { deviceTypes, types, subtypes, kits } = this.props;
		return(
			<div>
				<h4>Select type:</h4>
				<Dropdown placeholder='Select type' selection options={typeOptions} onChange={this.handleTypeChange}/>
				<br />
				<br />
				{
					this.state.type === "DEVICE_TYPES" &&
					<div>
					<Segment>
						<Form>
		                    <Form.Field >
		                      <label>Description:</label>
		                      <input placeholder='Description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}/>
		                    </Form.Field>
		                    <Form.Field >
		                      <label>Label:</label>
		                      <input placeholder='Label' value={this.state.label} onChange={(e) => this.setState({ label: e.target.value })}/>
		                    </Form.Field>
		                    <Button type='button' onClick={this.handleAddDeviceType}>Add Device Type</Button>
		                </Form>
					</Segment>
					<Table celled padded>
			          <Table.Header>
			            <Table.Row>
			              <Table.HeaderCell>Id</Table.HeaderCell>
			              <Table.HeaderCell>Description</Table.HeaderCell>
			              <Table.HeaderCell>Label</Table.HeaderCell>
			              <Table.HeaderCell>Created At</Table.HeaderCell>
			              <Table.HeaderCell>Delete</Table.HeaderCell>
			            </Table.Row>
			          </Table.Header>

			          <Table.Body>
			            {
			              deviceTypes.map((it, i) => {
			              		return(
				                  <Table.Row key={i}>
				                    <Table.Cell>{it.id}</Table.Cell>
				                    <Table.Cell>{it.description}</Table.Cell>
				                    <Table.Cell>{it.label}</Table.Cell>
				                    <Table.Cell>{it.created_at}</Table.Cell>
				                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteDeviceType(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
				                  </Table.Row>
			                	);
			              	}
			              )
			            }
			          </Table.Body>
			        </Table>
			        </div>
				}

				{
					this.state.type === "TYPES" &&
					<div>
					<Segment>
						<Form>
		                    <Form.Field >
		                      <label>Description:</label>
		                      <input placeholder='Description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}/>
		                    </Form.Field>
		                    <Form.Field >
		                      <label>Label:</label>
		                      <input placeholder='Label' value={this.state.label} onChange={(e) => this.setState({ label: e.target.value })}/>
		                    </Form.Field>
		                    <Button type='button' onClick={this.handleAddType}>Add Type</Button>
		                </Form>
					</Segment>
					<Table celled padded>
			          <Table.Header>
			            <Table.Row>
			              <Table.HeaderCell>Id</Table.HeaderCell>
			              <Table.HeaderCell>Description</Table.HeaderCell>
			              <Table.HeaderCell>Label</Table.HeaderCell>
			              <Table.HeaderCell>Created At</Table.HeaderCell>
			              <Table.HeaderCell>Delete</Table.HeaderCell>
			            </Table.Row>
			          </Table.Header>

			          <Table.Body>
			            {
			              types.map((it, i) => {
			              		return(
				                  <Table.Row key={i}>
				                    <Table.Cell>{it.id}</Table.Cell>
				                    <Table.Cell>{it.description}</Table.Cell>
				                    <Table.Cell>{it.label}</Table.Cell>
				                    <Table.Cell>{it.created_at}</Table.Cell>
				                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteType(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
				                  </Table.Row>
			                	);
			              	}
			              )
			            }
			          </Table.Body>
			        </Table>
			        </div>
				}
				
				{
					this.state.type === "SUBTYPES" &&
					<div>
					<Segment>
						<Form>
		                    <Form.Field >
		                      <label>Description:</label>
		                      <input placeholder='Description' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}/>
		                    </Form.Field>
		                    <Form.Field >
		                      <label>Label:</label>
		                      <input placeholder='Label' value={this.state.label} onChange={(e) => this.setState({ label: e.target.value })}/>
		                    </Form.Field>
		                    <Button type='button' onClick={this.handleAddSubtype}>Add Subtype</Button>
		                </Form>
					</Segment>
					<Table celled padded>
			          <Table.Header>
			            <Table.Row>
			              <Table.HeaderCell>Id</Table.HeaderCell>
			              <Table.HeaderCell>Description</Table.HeaderCell>
			              <Table.HeaderCell>Label</Table.HeaderCell>
			              <Table.HeaderCell>Created At</Table.HeaderCell>
			              <Table.HeaderCell>Delete</Table.HeaderCell>
			            </Table.Row>
			          </Table.Header>

			          <Table.Body>
			            {
			              subtypes.map((it, i) => {
			              		return(
				                  <Table.Row key={i}>
				                    <Table.Cell>{it.id}</Table.Cell>
				                    <Table.Cell>{it.description}</Table.Cell>
				                    <Table.Cell>{it.label}</Table.Cell>
				                    <Table.Cell>{it.created_at}</Table.Cell>
				                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteSubtype(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
				                  </Table.Row>
			                	);
			              	}
			              )
			            }
			          </Table.Body>
			        </Table>
			        </div>
				}

				{
					this.state.type === "KITS" &&
					<div>
					<Segment>
						<Form>
		                    <Form.Field >
		                      <label>Name:</label>
		                      <input placeholder='Name' value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}/>
		                    </Form.Field>
		                    <Button type='button' onClick={this.handleAddKit}>Add Kit</Button>
		                </Form>
					</Segment>
					<Table celled padded>
			          <Table.Header>
			            <Table.Row>
			              <Table.HeaderCell>Id</Table.HeaderCell>
			              <Table.HeaderCell>Name</Table.HeaderCell>
			              <Table.HeaderCell>Created At</Table.HeaderCell>
			              <Table.HeaderCell>Delete</Table.HeaderCell>
			            </Table.Row>
			          </Table.Header>

			          <Table.Body>
			            {
			              kits.map((it, i) => {
			              		return(
				                  <Table.Row key={i}>
				                    <Table.Cell>{it.id}</Table.Cell>
				                    <Table.Cell>{it.name}</Table.Cell>
				                    <Table.Cell>{it.created_at}</Table.Cell>
				                    <Table.Cell textAlign='center'><Button onClick={() => this.handleDeleteKit(it.id)} color='red' icon><Icon name='minus'/></Button></Table.Cell>
				                  </Table.Row>
			                	);
			              	}
			              )
			            }
			          </Table.Body>
			        </Table>
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
)(CategoryManagement);