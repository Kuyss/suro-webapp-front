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

const KEYS_TO_FILTERS = ['item.description'];

class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.state = {
			items: [],
			itemsToReserve: [],
			clicked: [],
			nodate: false,
			filtered: [],
			searchTerm: ''
		};

		this.reserve = this.reserve.bind(this);
		this.addToRes = this.addToRes.bind(this);
		this.filterBy = this.filterBy.bind(this);
	}

	componentWillMount() {
		getItems(read('token')).then((res) => {
			this.setState({
				items: res,
				filtered: res
			});
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
			console.log(this.state.itemsToReserve.toString());
			postReservation(read('token'), this.state.itemsToReserve.toString(), start, end);
			this.cancel();
		}
	}

	filterBy() {
		var e = document.getElementsByClassName("select")[0];
		var selectedFilter = (e.options[e.selectedIndex].value);
		var writtenValue = (this.search.value);
		var f = {};

		switch(selectedFilter){
			case 'id':
				f = this.state.items.filter(item => item.id === parseInt(writtenValue));
				break;
			case 'name':
				f = this.state.items.filter(item => item.description.includes(writtenValue));
				break;
			case 'type':
				f = this.state.items.filter(item => item.type.description.includes(writtenValue));
		}
		

		this.setState({
			filtered: f
		});

	}


	render() {
		return (
			<div>
				<div className="all">
					<div className="reserv">
						<Segment>{this.state.itemsToReserve.length} items in reservation.</Segment>
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
						<Button onClick={() => this.reserve(this.start.value, this.end.value)}>Start reservation</Button>
					</div>
					<br /><br /><br />
					<select className="ui fluid search dropdown" multiple="" className="select">
						<option value="id">Id</option>
						<option value="name">Name</option>
						<option value="type">Type</option>
					</select>
					<div className="ui search">
						<input className="prompt" type="text" placeholder="search" ref={(input) => {
							this.search = input;
						}} />

					</div>

					{ <Button onClick={() => this.filterBy()}>Search </Button> }

					


				</div>
				<ItemList items={this.state.filtered} do={this.addToRes} />
			</div>

		);
	}
}

export default SearchEquipment;