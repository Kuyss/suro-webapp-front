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
                        <I.Header as='a'>{this.props.item.description}</I.Header>
                        <I.Meta>{this.props.item.type.description}</I.Meta>
                        <I.Description>
                            {this.props.item.kit.name}
                        </I.Description>
                        {(!this.props.item.free)&&<Button floated='right' onClick={() => this.props.do(this.props.item.id)}>Add to reservation</Button>}
                        {(this.props.item.free)&&<Label pointing>Item already reserved.</Label>}
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}


export default Item;