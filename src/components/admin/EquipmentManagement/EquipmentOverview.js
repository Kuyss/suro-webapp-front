import React, { Component } from 'react';
import { connect } from 'react-redux';
import itemActions from 'actionCreators/itemActionCreator';
import { Table } from 'semantic-ui-react';

class EquipmentOverview extends Component {

	componentDidMount = () => {
		this.props.dispatch(itemActions.getAllItems(this.props.token));
	}

	render() {
		const { items } = this.props;
		return(
			<div>
			  <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Id</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              items.map((it, i) => {
                return(
                  <Table.Row key={i}>
                    <Table.Cell>{it.id}</Table.Cell>
                    <Table.Cell>{it.created_at}</Table.Cell>
                    <Table.Cell>{it.description}</Table.Cell>
                    <Table.Cell>{it.updated_at}</Table.Cell>
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
    items: state.items.itemList
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
)(EquipmentOverview);