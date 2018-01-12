import React, { Component } from 'react';
import { connect } from 'react-redux';
import userActions from 'actionCreators/userActionCreator';

class UsersOverview extends Component {

  componentDidMount = () => {
    this.props.dispatch(userActions.loadAllUsers(this.props.token));
  }

	render() {
		return(
			<div>
				users overview
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    users: state.users.userList
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
)(UsersOverview);