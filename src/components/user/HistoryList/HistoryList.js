import React from 'react';
import HistoryItem from './HistoryItem';

export default class ReservationList extends React.Component {

    render() {
        return (<div>
            {
                this.props.items.map((item) => <HistoryItem item={item} />)
            }
        </div>);
    }

}