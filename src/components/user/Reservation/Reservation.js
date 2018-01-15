import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import './Reservation.css';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import ItemList from '../ItemList/ItemList';
import HistoryList from '../HistoryList/HistoryList';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

export default class Reservation extends React.Component {

    constructor(args) {
        super(args);

        this.state = {
            returnDate: {}
        }
    }

    componentWillMount() {
        var date = this.props.reservation.return_date.split('-');
        var rd = new Date(date[0], date[1] - 1, date[2]);

        this.setState({
            returnDate: rd
        });
    }


    render() {
        return (
            <div>
                {(((this.props.his) && (this.state.returnDate < Date.now())) || ((!this.props.his) && (this.state.returnDate > Date.now()))) &&

                    <Item.Group className="res">
                        <Item>
                            <Item.Content >

                                <HistoryList items={this.props.reservation.items} />
                                {(this.props.reservation.status.id !== 2) && <div>
                                    <br />
                                    <Item.Description>Start date: {this.props.reservation.start_date}</Item.Description>
                                    <Item.Description>Return date: {this.props.reservation.return_date}</Item.Description>
                                    <br /> <br /> <br /> <br />
                                    {!this.props.his && <div className="grey">

                                        <h3>New return date</h3>
                                        <div className="ui calendar" id="example1">
                                            <div className="ui input left icon">
                                                <i className="calendar icon"></i>
                                                <input type="text" placeholder="returndate" ref={(input) => {
                                                    this.end = input;
                                                }} />
                                            </div>
                                        </div>


                                        {!this.props.his && <Button floated='right' onClick={() => this.props.ext(this.props.reservation.id, this.end.value)}>Extend reservation</Button>}
                                        {!this.props.his && <Button floated='right' onClick={() => this.props.del(this.props.reservation.id)}>Delete reservation</Button>}

                                    </div>}

                                    {this.props.his && <Button floated='right' onClick={() => this.props.res(this.props.reservation.items)}>Renew reservation</Button>}
                                </div>}
                                {(this.props.reservation.status.id === 2) && <Label pointing  >Reservation was not approved by administrator.</Label>}
                            </Item.Content>
                        </Item>
                    </Item.Group>}
            </div>
        );

    }
}
