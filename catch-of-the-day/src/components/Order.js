import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Order extends Component {

    renderOrderItem(fishId, count) {
        const { fishes } = this.props;
        const fish = fishes[fishId];
        const isAvailable = fish && fish.status === 'available';

        if (isAvailable) {
            const price =  count * fish.price;

            return <li key={fishId}>{count} - {fish.name} - {formatPrice(price)}</li>
        }
        else {
            return <li key={fishId}>Sorry, but this fish isn't available.</li>
        }
    }

    renderOrdemTotal(fishes, order) {
        const total = Object
            .entries(order)
            .filter(([id, count]) => fishes[id] && fishes[id].status === 'available')
            .map(([id, count]) => fishes[id].price * count)
            .reduce((totalPrice, price) => totalPrice + price, 0);

        return <div>Total <strong>{formatPrice(total)}</strong></div>
    }

    render() {
        const { order, fishes } = this.props;

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {
                        Object
                        .entries(order)
                        .map(([id, count]) => this.renderOrderItem(id, count))
                    }
                </ul>
                {
                    this.renderOrdemTotal(fishes, order)
                }
            </div>
        );
    }
}

export default Order;
