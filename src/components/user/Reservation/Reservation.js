import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import './Reservation.css';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';

const Reservation = ({ reservation }) => (
    <Item.Group className="res">
        <Item>
            <Item.Content >
                <Image src={reservation.items[0].item.picture} size='small'/>
                <Item.Header as='a'>Item: {reservation.items[0].item.description}</Item.Header>
                <Item.Description>Start date: {reservation.start_date}</Item.Description>
                <Item.Description>Return date: {reservation.return_date}</Item.Description>
                <Button floated='right'>Extend reservation</Button>
            </Item.Content>
        </Item>
    </Item.Group>
);

export default Reservation;