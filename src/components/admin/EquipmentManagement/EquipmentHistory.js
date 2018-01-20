import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Dropdown, Loader, Table } from 'semantic-ui-react';

class EquipmentHistory extends Component {

	constructor() {
		super();

		this.state = {
			item_id: null
		}
	}

	componentDidMount = () => {
		this.props.dispatch(itemActions.getAllItems(this.props.token));
	}

	componentWillUnmount = () => {
		this.props.dispatch(itemActions.clearItemReservations());
	}

	createDropdownList = (list) => {
		let dropdownList = [];
		let dropdownItem = {};

		for(let i = 0; i < list.length; i++) {
			dropdownItem = {
				key: list[i].id,
				value: list[i].id
			}
			dropdownItem.text = `${list[i].description} - ${list[i].identifier}`;
			dropdownList.push(dropdownItem);
		}

		return dropdownList;
	}

	setItem = (e, { value }) => {
		const item_id = value;
		this.setState({ item_id });

		this.props.dispatch(itemActions.getReservationHistory(item_id, this.props.token))
	}

	render() {
		if(this.props.loading) {
			return(
				<Loader active />
			);
		} else {
			let { items, reservations } = this.props;
			const itemOptions = this.createDropdownList(items);
			return(
				<div>
					<h3>Select Item:</h3>
					<Dropdown value={this.state.item_id} onChange={this.setItem} fluid placeholder='Select Item' search selection options={itemOptions} />
					<br />
					{
						reservations.length === 0 && this.state.item_id !== null &&
						<div>
							<h3>There are no reservations for this item</h3>
						</div>
					}
					{
						reservations.length !== 0 &&
						<div>
							<h2>Item Reservations:</h2>
							<Table celled padded>
					          <Table.Header>
					            <Table.Row>
					              <Table.HeaderCell>Id</Table.HeaderCell>
					              <Table.HeaderCell>Start Date</Table.HeaderCell>
					              <Table.HeaderCell>Return Date</Table.HeaderCell>
					              <Table.HeaderCell>Returned Date</Table.HeaderCell>
					              <Table.HeaderCell>User</Table.HeaderCell>
					              <Table.HeaderCell>Status</Table.HeaderCell>
					            </Table.Row>
					          </Table.Header>

					          <Table.Body>
					            {
					              reservations.map((res, i) => {
				              		return(
					                  <Table.Row key={i}>
					                    <Table.Cell>{res.id}</Table.Cell>
					                    <Table.Cell>{res.start_date}</Table.Cell>
					                    <Table.Cell>{res.return_date}</Table.Cell>
					                    <Table.Cell>{res.returned_date}</Table.Cell>
					                    <Table.Cell>{res.user.email}</Table.Cell>
					                    <Table.Cell>{res.status.name}</Table.Cell>
					                  </Table.Row>
				                	);
					              })
					            }
					          </Table.Body>
					        </Table>
						</div>
					}
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    items: state.items.itemList,
    reservations: state.items.itemReservations,
    loading: state.items.itemsLoading
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
)(EquipmentHistory);