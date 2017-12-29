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

class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.state = {
			items: []
		};
		this.reserve = this.reserve.bind(this);
	}

	componentWillMount() {
		getItems(read('token')).then((res) => {
			this.setState({
				items: res
			});
		});
	}

	reserve(id) {
		postReservation(read('token'), id, '11.01.2011', '12.02.2012.');
	}

	filterBy() {
		var e = document.getElementsByClassName("select")[0];
		console.log(e.options[e.selectedIndex].value);
		console.log(document.getElementsByClassName("input").value);
	}

	render() {
		return (
			<div>
				<div className="all">
					<div className="reserv">
						<Segment>0 items in reservation.</Segment>
						<h3>Starting date</h3>
						<div class="ui calendar" id="example1">
							<div class="ui input left icon">
								<i class="calendar icon"></i>
								<input type="text" placeholder="Date" />
							</div>
						</div>
						<h3>Return date</h3>
						<div class="ui calendar" id="example1">
							<div class="ui input left icon">
								<i class="calendar icon"></i>
								<input type="text" placeholder="Date" />
							</div>
						</div>
						<Button style={{ 'margin-left': 500 }}>Start reservation</Button>
					</div>
					<br /><br /><br />
					<select class="ui fluid search dropdown" multiple="" className="select">
						<option value="id">Id</option>
						<option value="name">Name</option>
						<option value="type">Type</option>
					</select>
					<Input className="input" />
					<Button onClick={() => this.filterBy()}>Search </Button>
					

				</div>
				<ItemList items={this.state.items} do={this.reserve} />
			</div>

		);
	}
}

export default SearchEquipment;