import React, { Component } from 'react';
import { connect } from 'react-redux';
import reservationActions from 'actionCreators/reservationActionCreator';
import { Button, Checkbox, Icon, Input, Loader, Table, Segment } from 'semantic-ui-react';
import './UserManagement.css';

class ReservationApprovals extends Component {

  constructor() {
    super();

    this.state = {
      showApproved: false,
      showToApprove: true,
      showDeclined: false,
      showWaitingExtension: false,
      reason: ""
    }
  }

	componentDidMount = () => {
		this.props.dispatch(reservationActions.getAllReservations(this.props.token));
    this.props.dispatch(reservationActions.getReservationsToExtend(this.props.token));
	}

	handleApproveReservation = (reservation_id) => {
		this.props.dispatch(reservationActions.approveReservation(reservation_id, this.props.token));
	}

	handleDeclineReservation = (reservation_id) => {
		this.props.dispatch(reservationActions.declineReservation(reservation_id, this.props.token));
	}

  handleDeleteReservation = (reservation_id, type) => {
    this.props.dispatch(reservationActions.adminDeleteReservation(reservation_id, type, this.props.token));
  }

  handleExtendReservation = (extend_id) => {
    this.props.dispatch(reservationActions.adminExtendReservation(extend_id, this.props.token));
  }

  handleRefuseReservation = (extend_id) => {
    this.props.dispatch(reservationActions.refuseReservation(extend_id, this.state.reason, this.props.token));
  }

  handleReturnReservation = (reservation_id) => {
    this.props.dispatch(reservationActions.returnReservation(reservation_id, this.props.token));
  }

	render() {
    if(this.props.loading) {
      return <Loader active />
    } else {
      const { toApprove, approved, declined, toExtend } = this.props;

      return(
        <div>
          <Segment>
            <h3>Select which reservations to show:</h3>
            <Checkbox className='checkboxes' toggle label='Show Waiting Approval' onClick={() => this.setState({ showToApprove: !this.state.showToApprove })} defaultChecked />
            <Checkbox className='checkboxes' toggle label='Show Approved' onClick={() => this.setState({ showApproved: !this.state.showApproved })} />
            <Checkbox className='checkboxes' toggle label='Show Declined' onClick={() => this.setState({ showDeclined: !this.state.showDeclined })} />
            <Checkbox className='checkboxes' toggle label='Show Waiting Extension' onClick={() => this.setState({ showWaitingExtension: !this.state.showWaitingExtension })}/>
          </Segment>

          {
            this.state.showToApprove &&
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
                  <Table.HeaderCell>Delete</Table.HeaderCell>
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
                        <Table.Cell textAlign='center'>
                          <Button onClick={() => this.handleDeleteReservation(r.id, "TO_APPROVE")} color='red' icon><Icon name='minus'/></Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                }
              </Table.Body>
            </Table>
            <br />
            </div>
          }
          {
            this.state.showApproved &&
            <div>
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
                    <Table.HeaderCell>Updated By</Table.HeaderCell>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Return</Table.HeaderCell>
                    <Table.HeaderCell>Decline</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
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
                          <Table.Cell>{r.status_creator ? r.status_creator.email : ""}</Table.Cell>
                          <Table.Cell>{r.user.email}</Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleReturnReservation(r.id)} color='yellow' icon><Icon name='arrow right'/></Button>
                          </Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleDeclineReservation(r.id)} color='red' icon><Icon name='minus circle'/></Button>
                          </Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleDeleteReservation(r.id, "APPROVED")} color='red' icon><Icon name='minus'/></Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                </Table.Body>
              </Table>
              <br />
            </div>
          }
            
          {
            this.state.showDeclined && 
            <div>
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
                    <Table.HeaderCell>Updated By</Table.HeaderCell>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
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
                          <Table.Cell>{r.status_creator ? r.status_creator.email : ""}</Table.Cell>
                          <Table.Cell>{r.user.email}</Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleApproveReservation(r.id)} color='green' icon><Icon name='check circle'/></Button>
                          </Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleDeleteReservation(r.id, "DECLINED")} color='red' icon><Icon name='minus'/></Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                </Table.Body>
              </Table>
              <br />
            </div>
          }

          {
            this.state.showWaitingExtension && 
            <div>
              <h2>Waiting Extension:</h2>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Created At</Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Reason</Table.HeaderCell>
                    <Table.HeaderCell>New Return Date</Table.HeaderCell>
                    <Table.HeaderCell>Reservation Id</Table.HeaderCell>
                    <Table.HeaderCell>Items</Table.HeaderCell>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>Extend</Table.HeaderCell>
                    <Table.HeaderCell>Refuse</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    toExtend.map((r, i) => {
                      return(
                        <Table.Row key={i}>
                          <Table.Cell>{r.created_at}</Table.Cell>
                          <Table.Cell>{r.id}</Table.Cell>
                          <Table.Cell>{r.reason}</Table.Cell>
                          <Table.Cell>{r.new_date_to}</Table.Cell>
                          <Table.Cell>{r.reservation_id}</Table.Cell>
                          <Table.Cell>{r.reservation.items.map(i => {return (i.item.identifier + ", ")})}</Table.Cell>
                          <Table.Cell>{r.user_id}</Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Button onClick={() => this.handleExtendReservation(r.id)} color='green' icon><Icon name='check circle'/></Button>
                          </Table.Cell>
                          <Table.Cell textAlign='center'>
                            <Input placeholder='Reason' value={this.state.reason} onChange={(e) => this.setState({ reason: e.target.value })}/>
                            <Button onClick={() => this.handleRefuseReservation(r.id)} color='red' icon><Icon name='minus'/></Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                </Table.Body>
              </Table>
              <br />
            </div>
          }
          
          
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
    toExtend: state.reservations.toExtend,
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