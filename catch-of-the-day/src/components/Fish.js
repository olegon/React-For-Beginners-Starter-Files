import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Fish extends Component {
    render() {
        const { details: fish } = this.props;

        return (
            <li className="menu-fish">
                <img src={fish.image} alt={fish.name} />
                <h3 className="fish-name">
                    {fish.name}
                    <span className="price">{formatPrice(fish.price)}</span>
                </h3>
                <p>{fish.desc}</p>
                <button>Add to Cart</button>
            </li>
        );
    }
}

export default Fish;
