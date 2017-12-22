import React from 'react';
import Item from '../Item/Item.js';

const ItemList = ({ items }) => (
    <div>
        {
            items.map((item) => <Item item={item} />)
        }
    </div>
);

export default ItemList;