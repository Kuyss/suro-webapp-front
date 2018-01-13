import React, { Component } from 'react';
import { connect } from 'react-redux';
import userActions from 'actionCreators/userActionCreator';

class UsersOverview extends Component {
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