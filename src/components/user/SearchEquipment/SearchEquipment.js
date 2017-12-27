import React from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import './SearchEquipment.css';
import ItemList from '../ItemList/ItemList';
import { getItems } from '../../../services/item';
import { read } from '../../../services/storage';
import { postReservation } from '../../../services/reservation';

class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.opt = [{ text: 'Id', value: 'Id' },
		{ text: 'Name', value: 'Name' },
		{ text: 'Type', value: 'Type' }];
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
		postReservation(read('token'), id, 'testdate', 'testdate');
	}

	render() {
		return (
			<div>
				<br />
				<Dropdown className="dropdown" placeholder="Search by:" selection options={this.opt} />
				<Search className="search" />
				<ItemList items={this.state.items} do={this.reserve} />
			</div>

		);
	}
}

export default SearchEquipment;