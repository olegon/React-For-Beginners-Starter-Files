import React from 'react';

import { formatPrice } from '../helpers';

export default class Fish extends React.Component {
    render () {
        const { index } = this.props;
        const { name, price, status, image, desc } = this.props.details;
        const isAvailable = status === 'available';
        const buttonText = isAvailable ? 'Add to Order' : 'Sold out!';
        
        return (
            <li className="menu-fish">
                <img src={ image } alt={ name } />
                <h3 className="fish-name">
                    { name }
                    <span className="price">{ formatPrice(price) }</span>
                </h3>
                <p>{ desc }</p>
                <button disabled={ !isAvailable } onClick={ _ => this.props.addToOrder(index) }>{ buttonText }</button>
            </li>
        );
    }
}