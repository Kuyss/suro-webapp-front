import React from 'react';
import { List, Button, Item } from 'semantic-ui-react';
import './Reservation.css';

const Reservation = ({ reservation }) => (
    <Item.Group className="res">
        <Item>
            <Item.Content >
                <Item.Header as='a'>{reservation.identifier}</Item.Header>
                {console.log(reservation.description)}
                <Item.Meta>{reservation.id}</Item.Meta>
                <Item.Description>
                    {reservation.id}
                </Item.Description>
                <Button floated='right'>Extend reservation</Button>
            </Item.Content>
        </Item>
    </Item.Group>
);

export default Reservation;