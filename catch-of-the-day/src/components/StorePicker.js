import React from 'react';
import { getFunName } from '../helpers';

export default class StorePicker extends React.Component {
    render() {
        return (
            <form className="store-selector">
                { /* Isso é um comentário. */ }
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}