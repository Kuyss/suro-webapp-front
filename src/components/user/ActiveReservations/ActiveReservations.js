import React from 'react';
import { List, Button, Item } from 'semantic-ui-react';
import './ActiveReservations.css';

class ActiveReservations extends React.Component {
	render() {
		return (
			<div className="sve">
				<List divided relaxed>
					<List.Item>
						<Item>
							<Item.Header as='a'>Prva aktivna rezervacija</Item.Header>
							<Item.Meta>10.10.2010.</Item.Meta>
							<Item.Description>
							</Item.Description>
						</Item>
						<List.Content floated='right'>
							<Button>Extend reservation</Button>
						</List.Content>
					</List.Item>
					<List.Item>
						<Item>
							<Item.Header as='a'>Druga aktivna rezervacija</Item.Header>
							<Item.Meta>10.10.2010.</Item.Meta>
							<Item.Description>
							</Item.Description>
						</Item>
						<List.Content floated='right'>
							<Button>Extend reservation</Button>
						</List.Content>
					</List.Item>
					<List.Item>
						<Item>
							<Item.Header as='a'>Treca aktivna rezervacija</Item.Header>
							<Item.Meta>10.10.2010.</Item.Meta>
							<Item.Description>
							</Item.Description>
						</Item>
						<List.Content floated='right'>
							<Button>Extend reservation</Button>
						</List.Content>
					</List.Item>
				</List>
			</div>
		);
	}
}

export default ActiveReservations;