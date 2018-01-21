import React from 'react';
import { Image, Item as I } from 'semantic-ui-react';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

export default class HistoryItem extends React.Component {

    render() {
        return (
            <I.Group >
                <I>
                    <I.Content >
                        <I.Header><Label><Icon name='hashtag' />{this.props.item.item_id}</Label>  {this.props.item.item.description}</I.Header>
                    </I.Content>
                </I>
            </I.Group>
        );
    }
}