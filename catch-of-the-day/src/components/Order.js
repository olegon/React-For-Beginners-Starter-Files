import React from 'react';

import { formatPrice } from '../helpers.js'

export default class Order extends React.Component {
    totalPrice() {
        const { fishes, order } = this.props;

        const total = Object.keys(order).reduce((total, key) => {
            const count = order[key];
            const fish = fishes[key];

            if (fish.status === 'available') {
                return total + count * fish.price;   
            }
            else {
                return total;
            }            
        }, 0);

        return total;
    }
    
    renderOrder (key) {
        const { fishes, order } = this.props;
        const count = order[key];
        const fish = fishes[key];
        const fishName = fish ? fish.name : 'fish';

        if (!fish || fish.status !== 'available') {
            return (
                <li key={ key }>Sorry, { fishName } no longer available!</li>
            );
        }
        else {
            return (
                <li key={ key }>
                    <span>{count}lbs {fishName}</span>
                    <span className="price">{ formatPrice(count * fish.price) }</span>
                </li>
            );
        }
    }

    render() {
        const { order } = this.props;
        const totalPrice = this.totalPrice();

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    { Object.keys(order).map(key => this.renderOrder(key)) }
                    <li className="total">
                        <strong>Total: </strong> { formatPrice(totalPrice) }
                    </li>
                </ul>                
            </div>
        );
    }
}