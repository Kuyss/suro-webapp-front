import React from 'react';
import { Image, Item as I } from 'semantic-ui-react';

export default class HistoryItem extends React.Component {

    render() {
        return (
            <I.Group >
                <I>
                    <I.Content >
                        <I.Header as='a'>[{this.props.item.item_id}] {this.props.item.item.description}</I.Header>
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}