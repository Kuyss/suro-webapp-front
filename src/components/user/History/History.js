import React from 'react';
import { Item } from 'semantic-ui-react';


class History extends React.Component {
	render() {
		return (
			<div>
				<Item.Group>
					<Item>
						<Item.Content>
							<Item.Header as='a'>Prva stara rezervacija</Item.Header>
							<Item.Meta>10.10.2010.</Item.Meta>
							<Item.Description>
							</Item.Description>
						</Item.Content>
					</Item>

					<Item>
						<Item.Content>
							<Item.Header as='a'>Druga stara rez</Item.Header>
							<Item.Meta>11.11.2011.</Item.Meta>
							<Item.Description>
							</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</div>
		);
	}
}

export default History;