import React from 'react';
import { List, Button, Item as I } from 'semantic-ui-react';
import './Item.css';

const Item = ({ item }) => (
    <I.Group className="itemm">
        <I>
            <I.Content >
                <I.Header  as='a'>{item.description}</I.Header>
                <I.Meta>{item.kit_id}</I.Meta>
                <I.Description>
                    {item.identifier}
                </I.Description>
                <Button floated='right'>Reserve item</Button>
            </I.Content>
        </I>
    </I.Group>
);

export default Item;