import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { formatPrice } from '../helpers.js'

class Order extends React.Component {
    totalPrice() {
        const { fishes, order } = this.props;

        const total = Object.keys(order).reduce((total, key) => {
            const count = order[key];
            const fish = fishes[key];

            if (fish && fish.status === 'available') {
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
                    <span>
                        <CSSTransitionGroup
                            component="span"
                            className="count"
                            transitionName="count"
                            transitionEnterTimeout={250}
                            transitionLeaveTimeout={250}
                        >
                            <span key={count}>{count}</span>
                        </CSSTransitionGroup>
                        
                    lbs {fishName}
                    </span>
                    <span className="price">{ formatPrice(count * fish.price) }</span>
                    <button onClick={ _ => this.props.removeFishFromOrder(key) } >&times;</button>
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
                <CSSTransitionGroup
                    className="order"
                    component="ul"
                    transitionName="order"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500} >
                    { Object.keys(order).map(key => this.renderOrder(key)) }
                    <li className="total">
                        <strong>Total: </strong> { formatPrice(totalPrice) }
                    </li>
                </CSSTransitionGroup>                
            </div>
        );
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeFishFromOrder: React.PropTypes.func.isRequired
};

export default Order;