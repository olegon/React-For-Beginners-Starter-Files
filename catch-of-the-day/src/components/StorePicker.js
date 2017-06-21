import React from 'react';
import { getFunName } from '../helpers';

export default class StorePicker extends React.Component {

    goToStore (e) {
        e.preventDefault();
        
        const storeId = this.storeInput.value;

        this.context.router.transitionTo(`/store/${storeId}`);
    }

    render () {
        return (
            <form className="store-selector" onSubmit={ this.goToStore.bind(this) }>
                { /* Isso é um comentário. */ }
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={ (input) => { this.storeInput = input } } />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
};