import React, { Component } from 'react';
import { connect } from 'react-redux';
import reservationActions from 'actionCreators/reservationActionCreator';
import { Button, Icon, Loader, Table } from 'semantic-ui-react';

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

  handleReturnReservation = (reservation_id) => {
    this.props.dispatch(reservationActions.returnReservation(reservation_id, this.props.token));
  }

	render() {
    if(this.props.loading) {
      return <Loader active />
    } else {
      const { toApprove, approved, declined } = this.props;

      return(
        <div>
          <h2>To Approve:</h2>
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
                toApprove.map((r, i) => {
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
          <br />
          <h2>Approved Reservations:</h2>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Items</Table.HeaderCell>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>Return Date</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Created At</Table.HeaderCell>
                <Table.HeaderCell>Updated At</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Return</Table.HeaderCell>
                <Table.HeaderCell>Decline</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                approved.map((r, i) => {
                  return(
                    <Table.Row key={i}>
                      <Table.Cell>{r.id}</Table.Cell>
                      <Table.Cell>{r.items.map(i => {return (i.item.identifier + ", ")})}</Table.Cell>
                      <Table.Cell>{r.start_date}</Table.Cell>
                      <Table.Cell>{r.return_date}</Table.Cell>
                      <Table.Cell>{r.status.name}</Table.Cell>
                      <Table.Cell>{r.created_at}</Table.Cell>
                      <Table.Cell>{r.updated_at}</Table.Cell>
                      <Table.Cell>{r.user.email}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button onClick={() => this.handleReturnReservation(r.id)} color='yellow' icon><Icon name='arrow right'/></Button>
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
          <br />
          <h2>Declined Reservations:</h2>
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
                declined.map((r, i) => {
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
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    toApprove: state.reservations.toApprove,
    approved: state.reservations.approved,
    declined: state.reservations.declined,
    loading: state.reservations.reservationsLoading
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