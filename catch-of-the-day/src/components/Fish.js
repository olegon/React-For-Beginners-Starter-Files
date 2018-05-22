import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Fish extends Component {
    handleClick = () => {
        this.props.addToOrder(this.props.fishId)
    }

    render() {
        const { details: fish } = this.props;
        const isAvailable = fish.status === 'available';
        const buttonText = isAvailable ? 'Add to Card' : 'Sold Out!';

        return (
            <li className="menu-fish">
                <img src={fish.image} alt={fish.name} />
                <h3 className="fish-name">
                    {fish.name}
                    <span className="price">{formatPrice(fish.price)}</span>
                </h3>
                <p>{fish.desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{buttonText}</button>
            </li>
        );
    }
}

export default Fish;
