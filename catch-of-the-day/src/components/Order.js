import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends Component {
    static propTypes = {
        order: PropTypes.object.isRequired,
        fishes: PropTypes.object.isRequired,
        removeFromOrder: PropTypes.func.isRequired,
    }

    renderOrderItem(fishId, count) {
        const { fishes } = this.props;
        const fish = fishes[fishId];
        
        if (fish == null) return null; // Renders nothing

        const isAvailable = fish.status === 'available';

        if (isAvailable) {
            const price =  count * fish.price;

            return (<CSSTransition classNames="order" key={fishId} timeout={{ enter: 250, exit: 250 }}>
                <li key={fishId}>{count} - {fish.name} - {formatPrice(price)} <button onClick={() => this.props.removeFromOrder(fishId)}>&times;</button></li>
            </CSSTransition>)
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
                <TransitionGroup component="ul" className="order">
                    {
                        Object
                        .entries(order)
                        .map(([id, count]) => this.renderOrderItem(id, count))
                    }
                </TransitionGroup>
                {
                    this.renderOrdemTotal(fishes, order)
                }
            </div>
        );
    }
}

export default Order;
