import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
    storeNameRef = React.createRef();

    handleSubmit = (event) => {
        event.preventDefault();

        const storeName = this.storeNameRef.current.value;

        const { history } = this.props;

        history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.handleSubmit}>
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" ref={this.storeNameRef} defaultValue={getFunName()} />
                <button type="submit">Visit Store</button>
            </form>
        );
    }    
}

export default  StorePicker;