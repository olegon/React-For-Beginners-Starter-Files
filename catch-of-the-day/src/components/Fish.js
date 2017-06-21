import React from 'react';

import { formatPrice } from '../helpers';

export default class Fish extends React.Component {
    render () {
        const { name, price, image, desc } = this.props.details;
        
        return (
            <li className="menu-fish">
                <img src={ image } alt={ name } />
                <h3 className="fish-name">
                    { name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button>Add to Order</button>
            </li>
        );
    }
}