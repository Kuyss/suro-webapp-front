import React from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import './SearchEquipment.css';

class SearchEquipment extends React.Component {

	render() {
		return (
			<div>
				SEARCH EQUIPMENT
				<br />
				<Dropdown className="dropdown" placeholder="Search by:" selection options={[{ text: 'id', value: 'id' }, { text: 'name', value: 'name' }, { text: 'type', value: 'type' }]} />
				<Search className="search" />
			</div>

		);
	}
}

export default SearchEquipment;