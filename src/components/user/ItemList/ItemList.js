import React from 'react';
import Item from '../Item/Item.js';

class ItemList extends React.Component {


    render() {
        return (
            <div>
                {
                    this.props.items.map((item) => <Item item={item} do={this.props.do} />)
                }
            </div>);
    }
}

export default ItemList;