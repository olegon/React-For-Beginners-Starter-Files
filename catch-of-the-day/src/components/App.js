import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import base from '../base';

class App extends React.Component {
    constructor () {
        super();

        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeFishFromOrder = this.removeFishFromOrder.bind(this);
        this.loadFishes = this.loadFishes.bind(this);
        this.addToOrder = this.addToOrder.bind(this);

        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount () {
        const storeId = this.props.params.storeId;

        this.ref = base.syncState(`${storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        
        const orderJson = localStorage.getItem(`order-${storeId}`);
        if (orderJson) {
            const order = JSON.parse(orderJson);
            console.log(order);
            this.setState({ order });
        }
    }

    componentWillUnmount () {
        base.removeBindind(this.ref);
    }

    componentWillUpdate (nextProps, nextState) {
        const storeId = this.props.params.storeId;
        const orderJson = JSON.stringify(nextState.order);

        localStorage.setItem(`order-${storeId}`, orderJson);
    }

    addFish (fish) {
        const fishes = {...this.state.fishes};

        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;

        this.setState({ fishes });
    }

    updateFish (key, updatedFish) {
        const fishes = {...this.state.fishes};

        fishes[key] = updatedFish;

        this.setState({ fishes });
    }

    removeFish (key) {
        const fishes = {...this.state.fishes};

        // delete fishes[key];
        fishes[key] = null; // para atualizar o Firebase!

        this.setState({ fishes });
    }

    removeFishFromOrder (key) {
        const order = {...this.state.order};

        delete order[key];

        this.setState({ order });
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
        const { fishes, order } = this.state;

        return (
            <div className="catch-of-the-day">
               <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        { Object.keys(fishes).map(key => <Fish key={ key } index={ key } addToOrder={ this.addToOrder } details={ fishes[key] } />) }
                    </ul>
                </div> 
                <Order
                    fishes={ fishes }
                    order={ order }
                    removeFishFromOrder={ this.removeFishFromOrder } />
                <Inventory
                    addFish={ this.addFish }
                    loadFishes={ this.loadFishes }
                    fishes={ this.state.fishes }
                    updateFish={ this.updateFish }
                    removeFish={ this.removeFish } />
            </div>
        );
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default App;