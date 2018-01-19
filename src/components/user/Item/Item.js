import React from 'react';
import { Button, Item as I } from 'semantic-ui-react';
import './Item.css';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import itemActions from 'actionCreators/itemActionCreator'
import { connect } from 'react-redux';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';


class Item extends React.Component {

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
                        {this.props.item.free && (this.props.item.working === 1) && <Button color='grey' floated='right' onClick={() => this.props.do(this.props.item.id)}>Add to reservation</Button>}
                        {!this.props.item.free || (this.props.item.working !== 1) && <Button floated='right' onClick={() => this.props.sug(this.props.item.kit.name)}>See similar items</Button>}
                        {(!this.props.item.free) && <Label pointing>Item already reserved.</Label>}
                        {(!this.props.item.working) && <div class="ui pointing red basic label">Item is damaged.</div>}
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}


export default Item;