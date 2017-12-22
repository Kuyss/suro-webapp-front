import React from 'react';
import { Search, Dropdown, Grid, Item, Button } from 'semantic-ui-react';
import './SearchEquipment.css';
import ItemList from '../ItemList/ItemList'; 

class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.opt = [{ text: 'Id', value: 'Id' },
		{ text: 'Name', value: 'Name' },
		{ text: 'Type', value: 'Type' }];
		this.popis = [
			{
				"id": 1,
				"identifier": "ADD1",
				"description": "AT91SAM3X8E, Arduino Due, DEV Board",
				"picture": null,
				"kit_id": 1,
				"type_id": 1,
				"subtype_id": 1,
				"device_type_id": 1,
				"created_at": "2017-12-19 15:21:43",
				"updated_at": "2017-12-19 15:21:43",
				"kit": null,
				"subtype": null,
				"type": null,
				"device_type": null
			},
			{
				"id": 2,
				"identifier": "ABTSS1",
				"description": "Arduino Tinkerkit Sensor Shield",
				"picture": null,
				"kit_id": 1,
				"type_id": 2,
				"subtype_id": 2,
				"device_type_id": 1,
				"created_at": "2017-12-19 15:22:07",
				"updated_at": "2017-12-19 15:22:07",
				"kit": null,
				"subtype": null,
				"type": null,
				"device_type": null
			},
			{
				"id": 3,
				"identifier": "WDB665",
				"description": "Waspmote Battery 6600 mAh",
				"picture": null,
				"kit_id": 4,
				"type_id": 2,
				"subtype_id": 3,
				"device_type_id": 2,
				"created_at": "2017-12-19 15:22:34",
				"updated_at": "2017-12-19 15:22:34",
				"kit": null,
				"subtype": null,
				"type": null,
				"device_type": null
			}
		];
	}

	render() {
		return (
			<div>
				<br />
				<Dropdown className="dropdown" placeholder="Search by:" selection options={this.opt} />
				<Search className="search" />
				<ItemList items={this.popis} />
			</div>

		);
	}
}

export default SearchEquipment;