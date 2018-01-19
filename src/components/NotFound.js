import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export default class NotFound extends Component {
	render() {
		return(
			<Container style={{"paddingTop": "50px"}} textAlign='center'>
				<Header as='h2'>Error 404 - page not found!</Header>
			</Container>
		);
	}
}