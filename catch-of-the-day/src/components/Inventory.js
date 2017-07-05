import React from 'react';

import AddFishForm from './AddFishForm';
import fishes from '../sample-fishes';

export default class Inventory extends React.Component {
    loadSamples (e) {
        this.props.loadFishes(fishes);
    }

    handleChange (e, key) {
        const fish = this.props.fishes[key];

        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        
        this.props.updateFish(key, updatedFish);
    }

    renderInventory (key) {
        const fish = this.props.fishes[key];
        const { name, price, status, desc, image } = fish;

        return (
            <div className="fish-edit" key={ key }>
                <input type="text" name="name" placeholder="Fish name" value={ name } onChange={ (e) => this.handleChange(e, key) } />
                <input type="text" name="price" placeholder="Fish price" value={ price } onChange={ (e) => this.handleChange(e, key) } />
                <select name="status" placeholder="Fish status" value={ status } onChange={ (e) => this.handleChange(e, key) } >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea name="desc" placeholder="Fish desc" value={ desc } onChange={ (e) => this.handleChange(e, key) }></textarea>
                <input type="text" name="image" placeholder="Fish image" value={ image } onChange={ (e) => this.handleChange(e, key) } />
            </div>
        );
    }

    render () {
        return (
            <div>
                <h2>Inventory</h2>
                { Object.keys(this.props.fishes).map(key => this.renderInventory(key)) }
                <AddFishForm addFish={ this.props.addFish } />
                <button onClick={ e => this.loadSamples(e) }>Load samples!</button>
            </div>   
        );
    }
}