import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

import userActions from '../actionCreators/userActionCreator';

class Popup extends Component {
  state = { visible: true }

  componentDidMount = () => {
    setTimeout(() => {
      this.setPopup(this.props.action, this.props.type, false);
    }, 3000);
  }

  componentWillUnmount = () => {
    this.setPopup(this.props.action, this.props.type, false);
  }

  handleDismiss = () => {
    this.setState({ visible: false })
    this.setPopup(this.props.action, this.props.type, false);
  }

  setPopup = (action, type, value) => {
      if(action === "REGISTER")
        this.props.dispatch(userActions.showPopup(type, value));
      if(action === "LOGIN")
        this.props.dispatch(userActions.showPopup(type, value));
  }

  render() {
    if (this.state.visible) {
      return (
        <Message 
          onDismiss={this.handleDismiss}
          header={this.props.header}
          positive
          content={this.props.content}
        />
      )
    } else {
        return null
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapDispatchToProps
)(Popup);
