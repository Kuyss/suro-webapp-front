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
            returnDate: {},
            needsReturning: false
        }
    }

    componentWillMount() {
        var date = this.props.reservation.return_date.split('-');
        var rd = new Date(date[0], date[1] - 1, date[2]);


        var today = new Date();
        var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
        var afterTomorrow = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
        var afterafter = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

        this.setState({
            returnDate: rd
        });


        if ((rd.getDate() == afterafter.getDate() && rd.getMonth() == afterafter.getMonth() && rd.getFullYear() == afterafter.getFullYear())
            || (rd.getDate() == afterTomorrow.getDate() && rd.getMonth() == afterTomorrow.getMonth() && rd.getFullYear() == afterTomorrow.getFullYear())
            || (rd.getDate() == tomorrow.getDate() && rd.getMonth() == tomorrow.getMonth() && rd.getFullYear() == tomorrow.getFullYear())
            || (rd.getDate() == today.getDate() && rd.getMonth() == today.getMonth() && rd.getFullYear() == today.getFullYear())) {
            if (!this.props.his) {
                this.setState({
                    needsReturning: true
                });
            }
        }
    }


    render() {
        return (
            <div id="all" style={{ "margin": 20 }}>
                {(((this.props.his) && (this.state.returnDate < Date.now())) || ((!this.props.his) && (this.state.returnDate > Date.now()))) &&

                    <Item.Group className="res">
                        <Item>
                            <Item.Content >

                                <HistoryList items={this.props.reservation.items} />
                                {/* <p>{this.props.reservation.id}</p> */}
                                <br />
                                <Item.Description>Start date: {this.props.reservation.start_date}</Item.Description>
                                <Item.Description>Return date: {this.props.reservation.return_date}</Item.Description>
                                <br /> <br />
                                {this.state.needsReturning && (this.props.reservation.status.id !== 5 && this.props.reservation.status.id !== 1) && <div class="ui pointing red  label">You need to return this item soon!</div>}
                                <br /> <br />
                                {(this.props.reservation.status.id === 2) && <div>
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
                                        <h3>Reason (optional)</h3>
                                        <div className="ui " id="example2">
                                            <div className="ui input left icon">
                                                <input type="text" placeholder="reason" ref={(input) => {
                                                    this.reason = input;
                                                }} />
                                            </div>
                                        </div>


                                        {!this.props.his && <Button color='grey' floated='right' onClick={() => this.props.ext(this.props.reservation.id, this.end.value, this.reason.value)}>Extend reservation</Button>}
                                        {!this.props.his && <Button floated='right' onClick={() => this.props.del(this.props.reservation.id)}>Delete reservation</Button>}

                                    </div>}

                                </div>}
                                {!this.props.his && (this.props.reservation.status.id == 1) && <Button floated='right' onClick={() => this.props.del(this.props.reservation.id)}>Delete reservation</Button>}

                                {(!this.props.his) && (this.props.reservation.status.id === 1) && <Label pointing  >Reservation is not yet approved by administrator.</Label>}
                                {(!this.props.his) && (this.props.reservation.status.id === 3) && <Label pointing  >Administrator disapproved this reservation.</Label>}
                                {(!this.props.his) && (this.props.reservation.status.id === 5) && <Label pointing  >Reservation was canceled.</Label>}
                                {this.props.his &&
                                    <div>
                                        {(this.props.reservation.status.id !== 2) && (!this.props.his) && <div><br />
                                            <Item.Description>Start date: {this.props.reservation.start_date}</Item.Description>
                                            <Item.Description>Return date: {this.props.reservation.return_date}</Item.Description>
                                            <br /> <br /> <br /> <br />
                                        </div>}
                                        <Button color='grey' floated='right' onClick={() => this.props.res(this.props.reservation.items)}>Select</Button>
                                    </div>}
                            </Item.Content>
                        </Item>
                    </Item.Group>}
            </div>
        );

    }
}
