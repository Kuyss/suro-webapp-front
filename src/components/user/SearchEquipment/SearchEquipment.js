import React from 'react';
import { Search, Dropdown, Grid, Item, Button } from 'semantic-ui-react';
import './SearchEquipment.css';

class SearchEquipment extends React.Component {

	constructor(args) {
		super(args);
		this.opt = [{ text: 'Id', value: 'Id' },
		{ text: 'Name', value: 'Name' },
		{ text: 'Type', value: 'Type' }];
	}

	render() {
		return (
			<div>
				<br />
				<Dropdown className="dropdown" placeholder="Search by:" selection options={this.opt} />
				<Search className="search" />
				<Item.Group relaxed>
					<Item>

						<Item.Content verticalAlign='middle'>
							<Item.Header>Content A</Item.Header>
							<Item.Description>Nes</Item.Description>
							<Item.Extra>
								<Button floated='right'>
									Reserve now
					  </Button>
							</Item.Extra>
						</Item.Content>
					</Item>

					<Item>

						<Item.Content verticalAlign='middle'>
							<Item.Header>Content B</Item.Header>
							<Item.Description>Nes</Item.Description>
							<Item.Extra>
								<Button floated='right'>
									Reserve now
					  </Button>
							</Item.Extra>
						</Item.Content>
					</Item>
				</Item.Group>


			</div>

		);
	}
}

export default SearchEquipment;