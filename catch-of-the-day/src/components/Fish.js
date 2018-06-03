import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }),
        addToOrder: PropTypes.func.isRequired
    }

    handleClick = () => {
        this.props.addToOrder(this.props.fishId)
    }

    render() {
        const { details } = this.props;
        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add to Card' : 'Sold Out!';

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{buttonText}</button>
            </li>
        );
    }
}

export default Fish;
