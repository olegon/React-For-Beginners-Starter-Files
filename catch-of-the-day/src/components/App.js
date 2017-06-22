import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

export default class App extends React.Component {
    constructor () {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadFishes = this.loadFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        this.state = {
            fishes: {},
            order: {}
        };
    }

    addFish (fish) {
        const fishes = {...this.state.fishes};

        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        this.setState({ fishes });
    }

    loadFishes (fishes) {
        this.setState({ fishes });
    }

    addToOrder (key) {
        const order = {...this.state.order};

        if (key in order) { order[key] += 1; }
        else { order[key] = 1; }

        this.setState({ order });
    }

    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        { Object.keys(this.state.fishes).map(key => <Fish key={ key } index={ key } addToOrder={ this.addToOrder } details={ this.state.fishes[key] } />) }
                    </ul>
                </div>
                <Order />
                <Inventory addFish={ this.addFish } loadFishes={ this.loadFishes } />
            </div>
        );
    }
}