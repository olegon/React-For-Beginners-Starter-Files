import React, { Component } from 'react';

class StorePicker extends Component {
    constructor () {
        super();

        this.state = {
            storeName: ''
        };
    }

    render () {
        const { storeName } = this.state;

        return (
            <form className="store-selector">
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" value={storeName} />
                <button type="submit">Visit Store</button>
            </form>
        );
    }    
}

export default  StorePicker;