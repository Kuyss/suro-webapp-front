import React from 'react';
import { Button, Item as I } from 'semantic-ui-react';
import './Item.css';

class Item extends React.Component {

    render() {
        return (
            <I.Group className="itemm">
                <I>
                    <I.Content >
                        <I.Header as='a'>{this.props.item.description}</I.Header>
                        <I.Meta>{this.props.item.type.description}</I.Meta>
                        <I.Description>
                            {this.props.item.kit.name}
                        </I.Description>
                        <Button floated='right' onClick={() => this.props.do(this.props.item.id)}>Reserve item</Button>
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}


export default Item;