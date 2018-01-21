import React from 'react';
import { Button, Item as I } from 'semantic-ui-react';
import './Item.css';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import itemActions from 'actionCreators/itemActionCreator'
import { connect } from 'react-redux';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import reservationActions from 'actionCreators/reservationActionCreator'
import reservationActionCreator from '../../../actionCreators/reservationActionCreator';
import NotFound from 'components/NotFound';
import { ROLES } from 'util/constants';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';



class Item extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            isAvailable: false,
            checked: false
        }
    }

    check(id) {
        this.props.dispatch(itemActions.getItemStatus(this.props.token, id));
        console.log(this.props.itemStatus);
       this.setState({
           isAvailable: this.props.itemStatus,
           checked: true
       });
    }

    render() {
        return (
            <I.Group className="itemm">
                <I>
                    <I.Content >
                        <Image src={this.props.item.picture} size='small' />
                        <I.Header >{this.props.item.description}</I.Header>
                        <I.Meta>{this.props.item.type.description}</I.Meta>
                        <I.Description>
                            {this.props.item.kit.name}
                        </I.Description>
                        {!this.state.checked && <Button color='grey' floated='right' onClick={() => this.check(this.props.item.id)}>Check availability</Button>}
                        {this.state.checked && (this.state.isAvailable) && (this.props.item.working === 1) && <div><Label pointing>Item is free.</Label><Button color='grey' floated='right' onClick={() => this.props.do(this.props.item.id)}>Add to reservation</Button></div>}
                        {this.state.checked && ((!this.state.isAvailable) || (this.props.item.working !== 1)) && <Button floated='right' onClick={() => this.props.sug(this.props.item.kit.name)}>See similar items</Button>}
                        {this.state.checked && (!this.state.isAvailable) && <Label pointing>Item already reserved.</Label>}
                        {(!this.props.item.working) && <div class="ui pointing red basic label">Item is damaged.</div>}
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        itemStatus: state.items.status,
        token: state.users.token
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
)(Item);