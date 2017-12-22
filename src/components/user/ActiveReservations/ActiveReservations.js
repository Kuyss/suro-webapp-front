import React from 'react';
import { List, Button, Item } from 'semantic-ui-react';
import ReservationList from '../ReservationList/ReservationList';
import './ActiveReservations.css';

class ActiveReservations extends React.Component {

	constructor(args) {
		super(args);
		this.popis = [{
			"id": 0,
			"identifier": "string",
			"description": "string",
			"picture": "string",
			"kit_id": 0,
			"type_id": 0,
			"subtype_id": 0,
			"device_type_id": 0,
			"created_at": "string",
			"updated_at": "string",
			"kit": {
				"id": 0,
				"name": 0,
				"created_at": "string",
				"updated_at": "string"
			},
			"type": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			},
			"subtype": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			},
			"device_type": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			}
		}, {
			"id": 0,
			"identifier": "string",
			"description": "string",
			"picture": "string",
			"kit_id": 0,
			"type_id": 0,
			"subtype_id": 0,
			"device_type_id": 0,
			"created_at": "string",
			"updated_at": "string",
			"kit": {
				"id": 0,
				"name": 0,
				"created_at": "string",
				"updated_at": "string"
			},
			"type": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			},
			"subtype": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			},
			"device_type": {
				"id": 0,
				"label": 0,
				"description": "string",
				"created_at": "string",
				"updated_at": "string"
			}
		}];
	}

	render() {
		return (
			<div className="sve">
				<ReservationList reservations={this.popis} />
			</div>
		);
	}
}

export default ActiveReservations;