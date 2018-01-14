import React, { Component } from 'react';
import { connect } from 'react-redux';
import reservationActions from 'actionCreators/reservationActionCreator';
import { Button, Icon, Table } from 'semantic-ui-react';

class ReservationApprovals extends Component {

	componentDidMount = () => {
		this.props.dispatch(reservationActions.getAllReservations(this.props.token));
	}

	handleApproveReservation = (reservation_id) => {
		this.props.dispatch(reservationActions.approveReservation(reservation_id, this.props.token));
	}

	handleDeclineReservation = (reservation_id) => {
		this.props.dispatch(reservationActions.declineReservation(reservation_id, this.props.token));
	}

	render() {
		const { reservations } = this.props;
		return(
			<div>
			  <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Created At</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Items</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>Return Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Decline</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              reservations.map((r, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell>{r.created_at}</Table.Cell>
                    <Table.Cell>{r.id}</Table.Cell>
                    <Table.Cell>{r.items.map(i => {return (i.item.identifier + ", ")})}</Table.Cell>
                    <Table.Cell>{r.start_date}</Table.Cell>
                    <Table.Cell>{r.return_date}</Table.Cell>
                    <Table.Cell>{r.status.name}</Table.Cell>
                    <Table.Cell>{r.updated_at}</Table.Cell>
                    <Table.Cell>{r.user.email}</Table.Cell>
                    <Table.Cell textAlign='center'>
                    	<Button onClick={() => this.handleApproveReservation(r.id)} color='green' icon><Icon name='check circle'/></Button>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                    	<Button onClick={() => this.handleDeclineReservation(r.id)} color='red' icon><Icon name='minus circle'/></Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    reservations: state.reservations.reservationList
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationApprovals);