import React from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import ItemList from '../ItemList/ItemList';
import { getItems } from '../../../services/item';
import { read } from '../../../services/storage';
import { postReservation } from '../../../services/reservation';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import './SearchEquipment.css';
import TextArea from 'semantic-ui-react/dist/commonjs/addons/TextArea/TextArea';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import itemActions from 'actionCreators/itemActionCreator';
import reservationActions from 'actionCreators/reservationActionCreator'
import { connect } from 'react-redux';
import reservationActionCreator from '../../../actionCreators/reservationActionCreator';
import NotFound from 'components/NotFound';
import { ROLES } from 'util/constants';


class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.state = {
			itemsToReserve: [],
			clicked: [],
			nodate: false,
			filtered: []
		};

		this.reserve = this.reserve.bind(this);
		this.addToRes = this.addToRes.bind(this);
		this.filterBy = this.filterBy.bind(this);
	}


	componentDidMount() {

		this.props.dispatch(itemActions.getAllItems(this.props.token));

		this.setState({
			filtered: this.props.items
		});
	}

	addToRes(newid) {


		if (!(this.state.clicked.indexOf(newid) > -1)) {
			console.log(`${newid} added`);
			var newArray = this.state.itemsToReserve.slice();
			newArray.push(newid);
			this.setState({
				itemsToReserve: newArray
			});

			newArray = this.state.itemsToReserve.slice();
			newArray.push(newid);
			this.setState({
				clicked: newArray
			});
		} else {
			console.log('already clicked');
		}

	}

	cancel() {
		this.setState({
			itemsToReserve: [],
			clicked: []
		});

		this.start.value = '';
		this.end.value = '';
	}

	reserve(start, end) {
		if (start.length === 0 || end.length === 0) {
			this.setState({
				nodate: true
			});

		} else {
			this.props.dispatch(reservationActions.postReservation(this.props.token, this.state.itemsToReserve, start, end));
			this.cancel();
		}
	}

	filterBy() {
		var e = document.getElementsByClassName("select")[0];
		var selectedFilter = (e.options[e.selectedIndex].value);
		var writtenValue = (this.search.value);
		var f = {};

		switch (selectedFilter) {
			case 'id':
				f = this.props.items.filter(item => item.id === parseInt(writtenValue));
				break;
			case 'name':
				f = this.props.items.filter(item => item.description.toLowerCase().includes(writtenValue.toLowerCase()));
				break;
			case 'type':
				f = this.props.items.filter(item => item.type.description.toLowerCase().includes(writtenValue.toLowerCase()));
				break;
			case 'kittype':
				f = this.props.items.filter(item => item.kit.name.toLowerCase().includes(writtenValue.toLowerCase()));
				break;
			default:
				break;
		}

		this.setState({
			filtered: f
		});

	}

	cancelQuery() {
		var e = document.getElementsByClassName("select")[0];
		var selectedFilter = (e.options[e.selectedIndex].value);

		if (selectedFilter == 'id') {
			e.value = 'name';
			this.search.value = "";
			this.filterBy();
			e.value = 'id';
		} else {
			this.search.value = "";
			this.filterBy();
			e.value = selectedFilter;
		}

	}


	render() {
		if(this.props.role !== ROLES.USER) {
			return <NotFound />
		} else {
			return (
				<div>
					<div className="all">
						<div className="reserv">
							<Segment>{this.state.itemsToReserve.length} items in reservation: [{this.state.itemsToReserve.toString()}]</Segment>
							<h3>Starting date</h3>
							<div className="ui calendar" id="example1">
								<div className="ui input left icon">
									<i className="calendar icon"></i>
									<input type="text" placeholder="startdate" ref={(input) => {
										this.start = input;
									}} />
								</div>
							</div>
							<h3>Return date</h3>
							<div className="ui calendar" id="example1">
								<div className="ui input left icon">
									<i className="calendar icon"></i>
									<input type="text" placeholder="returndate" ref={(input) => {
										this.end = input;
									}} />
								</div>
							</div>
							{this.state.nodate && <Label pointing>Enter both dates</Label>}
							<Button style={{ 'margin-left': 400 }} onClick={() => this.cancel()}>Cancel</Button>
							<Button color='grey' onClick={() => this.reserve(this.start.value, this.end.value)}>Start reservation</Button>
						</div>
						<br /><br /><br />
						<div className="searchForm">
							<select multiple="" className="select">
								<option value="name">Name</option>
								<option value="id">Id</option>
								<option value="type">Type</option>
								<option value="kittype">Kit type</option>
							</select>
							<div className="ui search" >
								<input className="prompt" type="text" placeholder="search" ref={(input) => {
									this.search = input;
								}} />

							</div>

							<Button style={{ "margin": 5 }} onClick={() => this.cancelQuery()}>Cancel filter</Button>
							<Button color='grey' style={{ "margin": 5 }} onClick={() => this.filterBy()}>Search </Button>
						</div>

					</div>
					<ItemList items={this.state.filtered} do={this.addToRes} />
				</div>

			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		role: state.users.currentUserRole,
		items: state.items.itemList,
		itemStatus: state.items.status,
		token: state.users.token
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
)(SearchEquipment);